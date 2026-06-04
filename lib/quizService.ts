import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * Menyimpan skor quiz user ke Firestore
 * Karena kita ingin menimpa/menyimpan hanya untuk satu kategori spesifik
 * dan tidak menghapus histori kategori lain, kita gunakan merge: true.
 *
 * @param uid User ID
 * @param categoryId Kategori quiz (misal: "frontend", "backend")
 * @param score Skor quiz yang diperoleh (0 - 100)
 */
export const saveQuizResult = async (uid: string, categoryId: string, score: number) => {
  if (!uid) throw new Error("User must be logged in to save quiz results");

  try {
    const quizRef = doc(db, "quizResults", uid);
    
    // Gunakan objek dinamis dengan bracket notation untuk nama field (categoryId)
    const dataToSave = {
      [categoryId]: score,
      updatedAt: serverTimestamp(),
    };

    // Menggunakan merge: true agar field lain (misal user sudah mengerjakan 'backend'
    // lalu sekarang mengerjakan 'frontend') tidak hilang.
    await setDoc(quizRef, dataToSave, { merge: true });
    
    return true;
  } catch (error) {
    console.error("Error saving quiz result to Firestore:", error);
    throw error;
  }
};

/**
 * Mengambil histori nilai quiz untuk semua kategori
 *
 * @param uid User ID
 * @returns Objek record berisi { kategori: skor } atau null jika belum pernah
 */
export const getQuizResults = async (uid: string): Promise<Record<string, any> | null> => {
  if (!uid) return null;

  try {
    const quizRef = doc(db, "quizResults", uid);
    const docSnap = await getDoc(quizRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    
    return null;
  } catch (error) {
    console.error("Error getting quiz results from Firestore:", error);
    return null;
  }
};
