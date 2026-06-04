import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { User } from "firebase/auth";

/**
 * Menyimpan data user baru ke Firestore (digunakan saat pendaftaran manual)
 */
export const saveUserToFirestore = async (
  uid: string,
  nama: string,
  email: string,
  photoURL: string | null = null,
  provider: string = "email"
) => {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      uid,
      nama,
      email,
      photoURL,
      provider,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving user to Firestore:", error);
    throw error;
  }
};

/**
 * Menangani data user dari Google Sign-In
 * Mengecek apakah user sudah ada, jika belum buat baru, jika sudah update lastLogin
 */
export const handleGoogleUserFirestore = async (user: User) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // User sudah terdaftar, hanya perbarui waktu login terakhir
      await updateDoc(userRef, {
        lastLogin: serverTimestamp(),
      });
    } else {
      // User baru dari Google, simpan datanya ke Firestore
      await setDoc(userRef, {
        uid: user.uid,
        nama: user.displayName || "Google User",
        email: user.email || "",
        photoURL: user.photoURL || null,
        provider: "google",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error handling Google user in Firestore:", error);
    throw error;
  }
};

/**
 * Memperbarui field lastLogin saat user login menggunakan Email/Password
 */
export const updateLastLogin = async (uid: string) => {
  try {
    const userRef = doc(db, "users", uid);
    // updateDoc tidak akan membuat document baru jika belum ada
    await updateDoc(userRef, {
      lastLogin: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating lastLogin:", error);
    throw error;
  }
};
