import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface ProgressData {
  roadmapProfesi: Record<string, boolean>;
  roadmapEksplorasi: Record<string, boolean>;
  updatedAt?: any;
}

/**
 * Mengubah struktur flat Set di React (contoh: 'roadmap-Front-End-HTML') 
 * menjadi struktur bersarang (nested) untuk Firestore.
 */
const convertSetToNestedObject = (items: Set<string>): ProgressData => {
  const data: ProgressData = {
    roadmapProfesi: {},
    roadmapEksplorasi: {},
  };

  items.forEach((item) => {
    if (item.startsWith("roadmap-")) {
      const key = item.replace("roadmap-", "");
      data.roadmapProfesi[key] = true;
    } else if (item.startsWith("explore-")) {
      const key = item.replace("explore-", "");
      data.roadmapEksplorasi[key] = true;
    } else {
      // Jika formatnya tidak dikenali, asumsikan masuk ke eksplorasi
      data.roadmapEksplorasi[item] = true;
    }
  });

  return data;
};

/**
 * Mengubah struktur bersarang dari Firestore kembali menjadi flat array 
 * untuk digunakan oleh UI React.
 */
const convertNestedObjectToFlatArray = (data: ProgressData): string[] => {
  const flatArray: string[] = [];

  if (data.roadmapProfesi) {
    Object.keys(data.roadmapProfesi).forEach((key) => {
      if (data.roadmapProfesi[key]) {
        flatArray.push(`roadmap-${key}`);
      }
    });
  }

  if (data.roadmapEksplorasi) {
    Object.keys(data.roadmapEksplorasi).forEach((key) => {
      if (data.roadmapEksplorasi[key]) {
        // Hanya tambahkan prefix explore- jika belum ada (untuk kompatibilitas)
        if (!key.startsWith("explore-")) {
          flatArray.push(`explore-${key}`);
        } else {
          flatArray.push(key);
        }
      }
    });
  }

  return flatArray;
};

/**
 * Menyimpan data progress pengguna ke Firestore
 */
export const saveProgress = async (uid: string, completedItems: Set<string>) => {
  try {
    const dataToSave = convertSetToNestedObject(completedItems);
    dataToSave.updatedAt = serverTimestamp();

    const progressRef = doc(db, "progress", uid);
    // Kita menimpa seluruh dokumen agar item yang di-uncheck (dihapus dari Set) 
    // juga benar-benar hilang dari Firestore, bukan di-merge
    await setDoc(progressRef, dataToSave);
  } catch (error) {
    console.error("Error saving progress to Firestore:", error);
    throw error;
  }
};

/**
 * Mengambil data progress pengguna dari Firestore
 */
export const getProgress = async (uid: string): Promise<string[]> => {
  try {
    const progressRef = doc(db, "progress", uid);
    const docSnap = await getDoc(progressRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as ProgressData;
      return convertNestedObjectToFlatArray(data);
    }
    
    // Kembalikan array kosong jika document belum ada (user baru)
    return [];
  } catch (error) {
    console.error("Error getting progress from Firestore:", error);
    throw error;
  }
};

/**
 * Fungsi utilitas untuk menghitung persentase dari progress (berguna untuk Progress Bar)
 */
export const calculateProgress = (completedNodesCount: number, totalNodes: number): number => {
  if (totalNodes === 0) return 0;
  return Math.round((completedNodesCount / totalNodes) * 100);
};
