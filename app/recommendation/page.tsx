"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Trophy, Star, Target, CheckCircle2, AlertCircle, TrendingUp, 
  BookOpen, Medal, Code, Layout, Smartphone, ChevronRight, ChevronLeft, Zap, Play, Lock
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { calculateRecommendation, RecommendationResult } from "@/lib/recommendationService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { majors } from "@/lib/data/majors";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CareerRecommendationPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [data, setData] = useState<RecommendationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [materialProgress, setMaterialProgress] = useState(0);
  const [quizProgress, setQuizProgress] = useState(0);
  const [majorName, setMajorName] = useState("");
  const [activeMajor, setActiveMajor] = useState("");
  const [isComputing, setIsComputing] = useState(true);

  useEffect(() => {
    const initRec = async () => {
      if (!user) return;
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const urlMajor = urlParams.get('major');
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const profileMajor = userDoc.exists() && userDoc.data().jurusan ? userDoc.data().jurusan : "rpl";
        
        // Prioritaskan major dari URL (yang sedang dieksplorasi), 
        // jika tidak ada baru gunakan jurusan dari profil
        const majorId = urlMajor || profileMajor;
        setActiveMajor(majorId);
        
        const majorInfo = majors.find(m => m.id === majorId);
        setMajorName(majorInfo ? majorInfo.desc : majorId);

        const result = await calculateRecommendation(user.uid, majorId, userDoc.data());
        
        if ('error' in result) {
          setErrorMsg(result.error);
          setMaterialProgress(result.materialProgress);
          setQuizProgress(result.quizProgress);
        } else {
          setData(result);
        }
      } catch (err) {
        console.error("Failed to init recommendation:", err);
        setErrorMsg("Terjadi kesalahan saat memproses data.");
      } finally {
        setIsComputing(false);
      }
    };

    if (user) {
      initRec();
    }
  }, [user]);

  if (isComputing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-slate-50">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
          <div className="relative w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-blue-500 font-bold animate-pulse text-lg">Menganalisis Potensi Karier...</p>
      </div>
    );
  }

  if (errorMsg || !data) {
    return (
      <ProtectedRoute>
        <>
          <Navbar />
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-50 to-white p-6 pt-24 font-sans">
          
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-[5%] left-[5%] w-[40%] h-[40%] bg-amber-300/20 rounded-full blur-[120px] -translate-x-1/4" />
            <div className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px] translate-x-1/4" />
            
            <svg className="absolute w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="rec-blocked-dot" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#3b82f6" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#rec-blocked-dot)" />
              <path d="M -10% 30% C 30% 10%, 70% 60%, 110% 40%" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.4" />
              <circle cx="80%" cy="25%" r="120" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <circle cx="15%" cy="75%" r="80" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.2" />
            </svg>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-10 md:p-12 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(37,99,235,0.15)] max-w-lg w-full text-center border border-white/50 relative z-10">
            
            {/* BACK BUTTON */}
            <div className="absolute top-6 left-6">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-1 text-xs md:text-sm text-white bg-blue-400 hover:bg-blue-500 transition-colors px-3 py-1.5 rounded-full font-medium shadow-sm w-fit"
              >
                <ChevronLeft size={16} />
                Kembali
              </button>
            </div>
            
            {/* Elegant Icon Container */}
            <div className="relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 bg-amber-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="w-full h-full bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center text-white shadow-lg relative z-10 border-4 border-white">
                <Lock size={48} strokeWidth={2.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-amber-100 z-20">
                <AlertCircle size={24} className="text-amber-500" />
              </div>
            </div>
            
            <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight drop-shadow-sm">Akses Belum Terbuka</h2>
            
            <p className="text-slate-600 mb-8 leading-relaxed font-medium">
              {errorMsg}
            </p>
            
            {/* Dual Progress Bars */}
            <div className="bg-slate-50 border border-slate-100 p-5 md:p-6 rounded-[1.5rem] mb-8 shadow-inner flex flex-col gap-4 text-left">
              {/* Material Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-600 tracking-wide">Progress Materi (Min. 50%)</span>
                  <span className={`text-lg font-black ${materialProgress >= 50 ? 'text-green-500' : 'text-amber-500'}`}>{materialProgress}%</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${materialProgress >= 50 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'}`} 
                    style={{ width: `${materialProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
              
              {/* Quiz Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-600 tracking-wide">Progress Kuis (Min. 50%)</span>
                  <span className={`text-lg font-black ${quizProgress >= 50 ? 'text-green-500' : 'text-amber-500'}`}>{quizProgress}%</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${quizProgress >= 50 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'}`} 
                    style={{ width: `${quizProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <Link 
              href={`/explore?major=${activeMajor}`} 
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 group"
            >
              Lanjutkan Belajar <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </main>
        <Footer />
        </>
      </ProtectedRoute>
    );
  }

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
              <pattern id="rec-dot-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#3b82f6" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rec-dot-grid)" />
            <path d="M -10% 40% C 40% 20%, 60% 80%, 110% 50%" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
            <circle cx="85%" cy="20%" r="100" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto w-full z-10 relative flex flex-col gap-6 md:gap-8">
          
          {/* BACK BUTTON */}
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-1 text-xs md:text-sm text-white bg-blue-400 hover:bg-blue-500 transition-colors px-3 py-1.5 rounded-full font-medium shadow-sm w-fit"
          >
            <ChevronLeft size={16} />
            Kembali
          </button>
          
          {/* HEADER SECTION */}
          <div className="text-center w-full max-w-3xl mx-auto flex flex-col gap-4 mb-4">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold w-fit mx-auto shadow-sm border border-amber-200 uppercase tracking-wider mb-2">
              <Trophy size={16} />
              Hasil Analisis Potensi Karier
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight drop-shadow-sm">
              Temukan Karier yang <span className="text-blue-500">Cocok Untukmu</span>
            </h1>
            
            <p className="text-neutral-600 font-medium text-sm md:text-base leading-relaxed px-4">
              Halo <span className="font-bold text-blue-500">{user?.displayName || "Siswa"}</span> dari jurusan <span className="font-bold">{majorName}</span>! 
              Berdasarkan evaluasi nilai kuis yang telah kamu kerjakan, berikut rekomendasi karier terbaik untukmu.
            </p>

            {!data.isAccurate ? (
              <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm p-4 rounded-2xl flex gap-3 text-left shadow-sm max-w-2xl mx-auto mt-2">
                <AlertCircle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                <p>
                  <strong>Perhatian:</strong> Recommendation ini dibuat berdasarkan data yang saat ini tersedia. 
                  Anda belum menyelesaikan seluruh materi (Materi: {data.materialProgress}%, Kuis: {data.quizProgress}%), 
                  sehingga hasil recommendation masih dapat berubah dan mungkin belum sepenuhnya akurat.
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-2xl flex gap-3 text-left shadow-sm max-w-2xl mx-auto mt-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-green-500 mt-0.5" />
                <p>
                  <strong>Data Lengkap:</strong> Seluruh materi dan quiz telah diselesaikan. Recommendation ini menggunakan data pembelajaran yang lengkap.
                </p>
              </div>
            )}
          </div>

          {/* MAIN RESULT SECTION (TOP 1) */}
          <div className="w-full bg-white rounded-3xl p-6 md:p-10 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.15)] border border-blue-100 relative overflow-hidden group">
            {/* Dekorasi Card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="md:w-3/5 text-center md:text-left z-10">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-500 px-3 py-1 rounded-full text-xs font-bold border border-blue-100 mb-4">
                  <Star className="w-3.5 h-3.5 fill-blue-500" /> Top Match
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 mb-4 drop-shadow-sm">
                  {data.topCareer}
                </h2>
                
                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 font-medium">
                  Performa kuis kamu menunjukkan tingkat kecocokan yang sangat tinggi dengan tuntutan profesi ini.
                </p>
                
                {(() => {
                  const factors = data.factorsPerCareer?.[data.topCareer];
                  let explanation = "Rekomendasi ini didasarkan pada hasil belajarmu.";
                  let sortedFactors: [string, number][] = [];

                  if (factors && Object.keys(factors).length > 0) {
                    sortedFactors = Object.entries(factors).sort((a, b) => b[1] - a[1]);
                    const topCategories = sortedFactors.slice(0, 3).map(f => f[0]);
                    
                    const categoryText = topCategories.length === 1 
                      ? topCategories[0] 
                      : topCategories.slice(0, -1).join(", ") + " dan " + topCategories[topCategories.length - 1];

                    explanation = `Hasil quiz menunjukkan performa yang kuat pada kategori ${categoryText}. Kombinasi kemampuan tersebut memiliki keterkaitan yang tinggi dengan profesi ${data.topCareer} sehingga profesi ini menjadi salah satu rekomendasi utama.`;
                  }

                  return (
                    <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-800 mb-1">Analisis Hasil Anda:</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {explanation}
                          </p>
                        </div>
                      </div>

                      {sortedFactors.length > 0 && (
                        <div className="bg-white rounded-xl p-4 border border-blue-100/50">
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Faktor Pendukung Terkuat</h5>
                          <div className="flex flex-wrap gap-2">
                            {sortedFactors.slice(0, 3).map(([cat, score], i) => (
                              <div key={i} className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-sm text-slate-700 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                {cat} <span className="font-bold text-blue-500">({score})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
                <button 
                  onClick={() => router.push(`/roadmap?profession=${encodeURIComponent(data.topCareer)}`)}
                  className="mt-6 bg-blue-500 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-md shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 w-full md:w-auto justify-center"
                >
                  Lihat Roadmap Profesi <ChevronRight size={18} />
                </button>
              </div>
              
              <div className="md:w-2/5 flex flex-col items-center justify-center z-10 mt-6 md:mt-0">
                <div className="relative">
                  {/* Outer glow/ring */}
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-20 scale-110 animate-pulse"></div>
                  
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-8 border-blue-50 flex flex-col items-center justify-center bg-white shadow-xl relative z-10">
                    <span className="text-5xl md:text-7xl font-black text-blue-500 tracking-tighter">
                      {data.scores[data.topCareer] || 0}<span className="text-3xl md:text-4xl text-blue-400">%</span>
                    </span>
                    <span className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Kecocokan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OTHER MATCHES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {[data.secondCareer, data.thirdCareer].map((career, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex items-center gap-6 group cursor-pointer" onClick={() => router.push(`/roadmap?profession=${encodeURIComponent(career)}`)}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-all shadow-sm ${idx === 0 ? "bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100" : "bg-teal-50 text-teal-500 group-hover:bg-teal-100"}`}>
                  <Layout className="w-8 h-8" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3">{career}</h3>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                    <div className={`h-2 rounded-full transition-colors ${idx === 0 ? "bg-indigo-500" : "bg-teal-500"}`} style={{ width: `${data.scores[career] || 0}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-500">Kecocokan Profile</span>
                    <span className="text-slate-700">{data.scores[career] || 0}%</span>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 mb-8">
            <button 
              onClick={() => router.push(`/roadmap?profession=${encodeURIComponent(data.topCareer)}`)}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Play size={18} /> Lanjutkan Belajar
            </button>
            <Link 
              href={`/explore?major=${activeMajor}`}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3.5 px-8 rounded-full shadow-sm transition-all text-center"
            >
              Jelajahi Karier Lain
            </Link>
          </div>

        </div>
      </main>
      <Footer />
      </>
    </ProtectedRoute>
  );
}
