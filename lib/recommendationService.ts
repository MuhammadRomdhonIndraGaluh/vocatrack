import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { exploreRoadmaps } from "@/lib/data/exploreRoadmaps";

export interface RecommendationResult {
  topCareer: string;
  secondCareer: string;
  thirdCareer: string;
  scores: Record<string, number>; // e.g. { "Web Developer": 85, ... }
  matchPercentages: Record<string, number>; // e.g. { "web": 85 }
  isAccurate: boolean; // true if both material and quiz are 100%
  materialProgress: number; // 0-100
  quizProgress: number; // 0-100
  factorsPerCareer?: Record<string, Record<string, number>>; // Stores quiz scores used for each career
  generatedAt: any;
}

/**
 * Menganalisis progress dan quiz user untuk menghasilkan rekomendasi.
 */
export const calculateRecommendation = async (
  uid: string,
  majorId: string,
  userDocData: any // Data dari users/{uid} untuk profil dasar
): Promise<RecommendationResult | { error: string, materialProgress: number, quizProgress: number }> => {
  const roadmap = exploreRoadmaps[majorId];
  if (!roadmap) {
    return { error: "Roadmap tidak ditemukan", materialProgress: 0, quizProgress: 0 };
  }

  // 1. Ambil data Progress dan Quiz
  const progressDoc = await getDoc(doc(db, "progress", uid));
  const quizDoc = await getDoc(doc(db, "quizResults", uid));

  const progressData = progressDoc.exists() ? progressDoc.data() : { roadmapEksplorasi: {} };
  const quizData = quizDoc.exists() ? quizDoc.data() : {};

  // 2. Kumpulkan semua node dari roadmap berdasarkan tag
  const nodesByTag: Record<string, { total: number; completed: number }> = {};
  let totalNodes = 0;
  let completedNodes = 0;

  // Inisialisasi struktur dari roadmap.recommendations
  Object.keys(roadmap.recommendations).forEach((tag) => {
    nodesByTag[tag] = { total: 0, completed: 0 };
  });

  roadmap.levels.forEach((level) => {
    const processBranch = (branch: any[] | undefined, idPrefix: string) => {
      if (!branch) return;
      branch.forEach((skill) => {
        if (!nodesByTag[skill.tag]) {
          nodesByTag[skill.tag] = { total: 0, completed: 0 };
        }
        nodesByTag[skill.tag].total += 1;
        totalNodes += 1;

        // ID yang tersimpan di progressData.roadmapEksplorasi
        const nodeId = `${majorId}-${idPrefix}-${skill.label.toLowerCase().replace(/\s+/g, '-')}`;

        if (progressData.roadmapEksplorasi && progressData.roadmapEksplorasi[nodeId]) {
          nodesByTag[skill.tag].completed += 1;
          completedNodes += 1;
        }
      });
    };

    processBranch(level.leftBranch, 'l');
    processBranch(level.rightBranch, 'r');
    processBranch(level.downBranch, 'd');
  });

  // 3. Hitung persentase materi (Material Progress) maksimal 100%
  const materialProgress = totalNodes === 0 ? 0 : Math.min(Math.round((completedNodes / totalNodes) * 100), 100);

  // 4. Kalkulasi Final Score Per Karier dan Pengumpulan Kategori
  // Mapping eksplisit untuk kebutuhan testing berdasarkan input pengguna
  const explicitTestMappings: Record<string, string[]> = {
    "web": ["Frontend", "Backend", "Database"],
    "net": ["Networking", "Security", "Infrastructure"],
    "ui": ["UI/UX", "Design"],
  };

  const tagToCategories: Record<string, Set<string>> = {};

  Object.keys(roadmap.recommendations).forEach((tag) => {
    tagToCategories[tag] = new Set<string>();
    
    // Masukkan explicit test mappings jika ada
    if (explicitTestMappings[tag]) {
      explicitTestMappings[tag].forEach(cat => tagToCategories[tag].add(cat));
    }
  });

  // Ekstrak kategori dinamis dari roadmap
  roadmap.levels.forEach((level) => {
    const categoryName = level.category;
    
    const extractTags = (branch?: any[]) => {
      branch?.forEach(skill => {
        if (tagToCategories[skill.tag]) {
          tagToCategories[skill.tag].add(categoryName);
        }
      });
    };

    extractTags(level.leftBranch);
    extractTags(level.rightBranch);
    extractTags(level.downBranch);
  });

  // Hitung Quiz Progress berdasarkan total kategori unik yang relevan untuk rekomendasi ini
  const totalRelevantCategories = new Set<string>();
  Object.values(tagToCategories).forEach(cats => {
    cats.forEach(c => totalRelevantCategories.add(c));
  });

  let completedQuizCategories = 0;
  totalRelevantCategories.forEach(cat => {
    if (quizData[cat] !== undefined) {
      completedQuizCategories += 1;
    }
  });

  const quizProgress = totalRelevantCategories.size === 0 ? 0 : Math.min(Math.round((completedQuizCategories / totalRelevantCategories.size) * 100), 100);

  // 5. Validasi Aturan Bisnis (Harus memenuhi kedua syarat)
  if (materialProgress < 50 || quizProgress < 50) {
    return {
      error: `Untuk membuka rekomendasi, kamu harus menyelesaikan minimal 50% materi dan 50% kuis.`,
      materialProgress,
      quizProgress
    };
  }

  const isAccurate = materialProgress >= 100 && quizProgress >= 100;

  const careerScores: { tag: string; title: string; score: number; factors: Record<string, number> }[] = [];
  const matchPercentages: Record<string, number> = {};
  const scoresMap: Record<string, number> = {};
  const factorsMap: Record<string, Record<string, number>> = {};

  Object.keys(roadmap.recommendations).forEach((tag) => {
    const careerTitle = roadmap.recommendations[tag];
    const categoriesForTag = tagToCategories[tag];
    
    let totalScore = 0;
    let count = 0;
    const factors: Record<string, number> = {};

    categoriesForTag.forEach((cat) => {
      if (quizData[cat] !== undefined) {
        totalScore += quizData[cat];
        count += 1;
        factors[cat] = quizData[cat];
      }
    });

    // Kalkulasi final: 100% dari skor kuis (Progress tidak lagi mempengaruhi finalScore)
    const finalScore = count > 0 ? totalScore / count : 0;

    careerScores.push({
      tag,
      title: careerTitle,
      score: Math.round(finalScore),
      factors
    });

    matchPercentages[tag] = Math.round(finalScore);
    scoresMap[careerTitle] = Math.round(finalScore);
    factorsMap[careerTitle] = factors;
  });

  // 6. Urutkan dari terbesar ke terkecil
  careerScores.sort((a, b) => b.score - a.score);

  const top3 = careerScores.slice(0, 3);

  const result: RecommendationResult = {
    topCareer: top3[0]?.title || "-",
    secondCareer: top3[1]?.title || "-",
    thirdCareer: top3[2]?.title || "-",
    scores: scoresMap,
    matchPercentages,
    isAccurate,
    materialProgress,
    quizProgress,
    factorsPerCareer: factorsMap,
    generatedAt: serverTimestamp(),
  };

  // 7. Simpan ke Firestore
  await setDoc(doc(db, "recommendations", uid), result);

  return result;
};

/**
 * Mengambil rekomendasi yang sudah tersimpan
 */
export const getRecommendation = async (uid: string) => {
  if (!uid) return null;
  const docSnap = await getDoc(doc(db, "recommendations", uid));
  if (docSnap.exists()) {
    return docSnap.data() as RecommendationResult;
  }
  return null;
};
