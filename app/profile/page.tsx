"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { User, Mail, Shield, LogOut, Key, Settings, Image as ImageIcon, AtSign, Loader2, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth, db } from "@/lib/firebase";
import { signOut, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AccountSettingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form State
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setDisplayName(user.displayName || "");
      
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.name && !user.displayName) {
             setDisplayName(data.name);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    setMessage({ text: "", type: "" });
    
    try {
      // 1. Update Firebase Auth Profile
      await updateProfile(user, { displayName });
      
      // 2. Update Firestore User Document
      await updateDoc(doc(db, "users", user.uid), {
        name: displayName,
      });
      
      setMessage({ text: "Profil berhasil diperbarui!", type: "success" });
    } catch (error: any) {
      setMessage({ text: "Gagal memperbarui profil. " + error.message, type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;
    
    setIsSaving(true);
    setMessage({ text: "", type: "" });
    
    try {
      await sendPasswordResetEmail(auth, user.email);
      setMessage({ text: "Tautan untuk mengubah password telah dikirim ke email Anda. Silakan cek inbox atau folder spam.", type: "success" });
    } catch (error: any) {
      setMessage({ text: "Gagal mengirim email verifikasi. " + error.message, type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col relative overflow-hidden font-sans bg-gradient-to-br from-blue-500 via-blue-50 to-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          
          {/* Dekorasi Background Geometris */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-300/40 rounded-full blur-[100px]" />
            <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-amber-200/20 rounded-full blur-[120px]" />
            
            <svg className="absolute w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="profile-dot-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#3b82f6" opacity="0.15" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#profile-dot-grid)" />
              <path d="M -10% 40% C 40% 20%, 60% 80%, 110% 50%" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
              <circle cx="85%" cy="20%" r="100" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>

          <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col gap-6">
            
            {/* BACK BUTTON */}
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-1 text-xs md:text-sm text-white bg-blue-400 hover:bg-blue-500 transition-colors px-3 py-1.5 rounded-full font-medium shadow-sm w-fit"
            >
              <ChevronLeft size={16} />
              Kembali
            </button>

            <div className="flex flex-col md:flex-row gap-8 w-full">
              {/* LEFT SIDEBAR - Account Summary & Nav */}
              <div className="w-full md:w-1/3 flex flex-col gap-6">
                
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 text-center flex flex-col items-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-50 border border-slate-200 mb-4 flex items-center justify-center overflow-hidden">
                    {user?.photoURL ? (
                      <Image src={user.photoURL} alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-slate-300" />
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-800 mb-1">{user?.displayName || "Pengguna VocaTrack"}</h2>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-4">
                    <Mail size={14} /> {user?.email}
                  </div>
                  
                  <div className="w-full border-t border-slate-100 mt-4 pt-4">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-xl transition-colors"
                    >
                      <LogOut size={18} /> Keluar dari Akun
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200 hidden md:block">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-xl font-bold">
                    <Settings size={18} /> Pengaturan Akun
                  </div>
                  <div className="flex items-center gap-3 p-3 text-slate-500 font-medium hover:bg-slate-50 rounded-xl transition-colors cursor-not-allowed opacity-50 mt-1">
                    <Shield size={18} /> Privasi & Keamanan
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN - Forms */}
              <div className="w-full md:w-2/3 flex flex-col gap-6">
                
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <h1 className="text-2xl font-black text-slate-800 mb-2">Pengaturan Akun</h1>
                  <p className="text-slate-500 mb-8">Kelola informasi identitas profil dan kredensial akun Anda di sini.</p>

                  {message.text && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                      {message.type === 'success' ? <Shield size={18} /> : <Settings size={18} />} {message.text}
                    </div>
                  )}

                  {isLoading ? (
                    <div className="py-12 flex justify-center text-blue-500 animate-spin">
                      <Loader2 size={32} />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-10">
                      
                      {/* FORM IDENTITAS */}
                      <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5">
                        <h3 className="font-bold text-slate-700 border-b border-slate-100 pb-3 flex items-center gap-2">
                          <User size={18} className="text-blue-500" /> Identitas Profil
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-5">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-600">Nama Lengkap</label>
                            <div className="relative">
                              <input 
                                type="text" 
                                value={displayName} 
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Masukkan nama lengkap"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all pl-10"
                              />
                              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 opacity-50 cursor-not-allowed">
                          <label className="text-sm font-bold text-slate-600">Alamat Email (Tidak dapat diubah)</label>
                          <div className="relative">
                            <input 
                              type="email" 
                              value={user?.email || ""} 
                              disabled
                              className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 outline-none pl-10 text-slate-500 cursor-not-allowed"
                            />
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          </div>
                        </div>
                        
                        <button 
                          type="submit" 
                          disabled={isSaving}
                          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all w-fit disabled:opacity-50 flex items-center gap-2"
                        >
                          {isSaving ? <Loader2 size={18} className="animate-spin" /> : null}
                          Simpan Identitas
                        </button>
                      </form>

                      {/* FORM PASSWORD */}
                      <form onSubmit={handleUpdatePassword} className="flex flex-col gap-5">
                        <h3 className="font-bold text-slate-700 border-b border-slate-100 pb-3 flex items-center gap-2">
                          <Key size={18} className="text-amber-500" /> Ubah Password
                        </h3>
                        
                        <p className="text-sm text-slate-500">
                          Sistem akan mengirimkan tautan keamanan ke email Anda untuk mengubah password.
                        </p>
                        
                        <button 
                          type="submit" 
                          disabled={isSaving}
                          className="mt-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-8 rounded-xl transition-all w-fit disabled:opacity-50 flex items-center gap-2"
                        >
                          {isSaving ? <Loader2 size={18} className="animate-spin" /> : null}
                          Kirim Link Ubah Password
                        </button>
                      </form>

                    </div>
                  )}
                </div>
              </div>
              
            </div>
          </div>
        </main>
        <Footer />
      </>
    </ProtectedRoute>
  );
}
