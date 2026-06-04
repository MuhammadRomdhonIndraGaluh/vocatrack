"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, HelpCircle, Clock, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { saveQuizResult, getQuizResults } from "@/lib/quizService";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { getQuizForCategory, QuizQuestion } from "@/lib/data/quizData";

// Mock generator removed in favor of real data

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const categoryName = typeof params.categoryId === 'string' ? decodeURIComponent(params.categoryId) : "";
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [activeMajor, setActiveMajor] = useState("");
  const [activeProfession, setActiveProfession] = useState("");

  // Authentication & Loading state
  const { user, loading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // Simpan major ID dan profession dari URL terlebih dahulu
    const urlParams = new URLSearchParams(window.location.search);
    const urlMajor = urlParams.get('major');
    const urlProfession = urlParams.get('profession');
    
    if (urlMajor) {
      setActiveMajor(urlMajor);
    }
    if (urlProfession) {
      setActiveProfession(urlProfession);
    }

    // Generate soal saat komponen dimount (50 jika dari profesi, 20 jika dari eksplorasi)
    const categoryData = getQuizForCategory(categoryName, urlProfession ? 50 : 20);
    setQuestions(categoryData.questions);
  }, [categoryName]);

  // Fetch previous result if exists
  useEffect(() => {
    const fetchInitialResult = async () => {
      if (user && categoryName) {
        try {
          const results = await getQuizResults(user.uid);
          if (results && results[categoryName] !== undefined) {
            setScore(results[categoryName]);
            setIsSubmitted(true);
          }
        } catch (error) {
          console.error("Error fetching quiz result:", error);
        }
      }
      setIsFetching(false);
    };

    if (!loading) {
      fetchInitialResult();
    }
  }, [user, loading, categoryName]);

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      return;
    }

    setIsSaving(true);
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        correct += 1;
      }
    });
    
    const finalScore = Math.round((correct / questions.length) * 100);
    
    try {
      await saveQuizResult(user.uid, categoryName, finalScore);
      setScore(finalScore);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to save result:", error);
      alert("Gagal menyimpan hasil quiz. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setAnswers({});
    setIsSubmitted(false);
  };

  if (questions.length === 0 || loading || isFetching) {
    return <div className="min-h-screen flex items-center justify-center bg-blue-50 text-blue-900 font-bold">Memuat Soal...</div>;
  }

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col relative overflow-hidden font-sans bg-gradient-to-br from-blue-500 via-blue-50 to-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Dekorasi Background Geometris */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-300/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-amber-200/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto w-full z-10 relative flex flex-col gap-6 md:gap-8">
          
          {/* HEADER SECTION */}
          {!isSubmitted && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm border border-blue-100 mb-2">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-1 text-xs md:text-sm text-white bg-blue-400 hover:bg-blue-500 transition-colors px-3 py-1.5 rounded-full mb-6 font-medium shadow-sm w-fit"
              >
                <ChevronLeft size={16} />
                Kembali
              </button>

              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-sm border border-blue-200 uppercase tracking-wider mb-4">
                Evaluasi Cabang Skill
              </div>
              
              <h1 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight mb-4">
                Quiz {categoryName}
              </h1>
              
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                Uji pemahamanmu terhadap materi yang telah dipelajari pada jalur {categoryName}. Hasil kuis ini akan digunakan sebagai dasar rekomendasi karier.
              </p>

            </div>
          )}

          {/* AREA SOAL / HASIL */}
          {isSubmitted ? (
            // ==================== HASIL QUIZ ====================
            <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-blue-100 text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-md">
                <CheckCircle2 size={48} strokeWidth={2} />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">Evaluasi Selesai!</h2>
              <p className="text-slate-500 mb-8 font-medium">Kategori: {categoryName}</p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 w-full max-w-sm mb-8">
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Skor Akhir</div>
                <div className="text-6xl font-black text-blue-500 mb-2">{score} <span className="text-2xl text-slate-400">/ 100</span></div>
              </div>

              <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-6 text-left w-full mb-8">
                <h4 className="font-bold text-blue-900 mb-2">Analisis Singkat:</h4>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {score >= 80 
                    ? `Luar biasa! Kamu menunjukkan pemahaman yang sangat kuat pada bidang ${categoryName}. Penguasaan ini akan menjadi modal yang sangat baik untuk rekomendasi karier utamamu.`
                    : score >= 60
                    ? `Cukup baik. Kamu memiliki pemahaman dasar yang lumayan di bidang ${categoryName}, namun masih ada beberapa konsep yang perlu diperkuat lagi ke depannya.`
                    : `Jangan menyerah. Pemahamanmu pada bidang ${categoryName} masih perlu banyak diasah. Pertimbangkan untuk mereview kembali materi-materi dasar.`
                  }
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleRetake}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-8 rounded-full transition-all"
                >
                  Ulangi Quiz
                </button>
                <button 
                  onClick={() => {
                    if (activeProfession && activeMajor) {
                      router.push(`/roadmap?major=${encodeURIComponent(activeMajor)}&profession=${encodeURIComponent(activeProfession)}`);
                    } else if (activeMajor) {
                      router.push(`/explore?major=${encodeURIComponent(activeMajor)}`);
                    } else {
                      router.push('/explore');
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-full shadow-md shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
                >
                  {activeProfession ? "Kembali ke Roadmap" : "Kembali ke Eksplorasi"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start w-full">
              {/* ==================== FORM SOAL ==================== */}
              <div className="flex-1 w-full bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50/50">
              
              {/* Progress Indicator */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-slate-500">Soal {currentIndex + 1} dari {questions.length}</span>
                <span className="text-sm font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                  Terjawab: {answeredCount}/{questions.length}
                </span>
              </div>
              
              {/* Question */}
              <div className="mb-8">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed">
                  {currentQuestion.text}
                </h3>
              </div>
              
              {/* Options */}
              <div className="space-y-3 mb-10">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = answers[currentIndex] === idx;
                  const labels = ["A", "B", "C", "D"];
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left border-2 transition-all ${
                        isSelected 
                          ? "border-blue-500 bg-blue-50 shadow-sm" 
                          : "border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                        isSelected ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {labels[idx]}
                      </div>
                      <span className={`text-sm md:text-base font-medium ${isSelected ? "text-blue-900" : "text-slate-700"}`}>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 text-slate-500 font-bold px-4 py-2 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} /> Prev
                </button>
                
                {currentIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={answeredCount < questions.length || isSaving}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-blue-900 font-bold px-8 py-3 rounded-xl hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all"
                  >
                    {isSaving ? "Menyimpan..." : (
                      <>Submit Quiz <CheckCircle2 size={20} /></>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-blue-100 text-blue-700 font-bold px-6 py-2.5 rounded-xl hover:bg-blue-200 transition-colors"
                  >
                    Next <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* ==================== PANEL NAVIGASI SOAL ==================== */}
            <div className="w-full lg:w-[320px] shrink-0 bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-50/50 lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-bold text-slate-800">Daftar Soal</h3>
                <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                  {questions.length}
                </span>
              </div>
              
              <details className="lg:hidden group mb-4">
                <summary className="cursor-pointer text-sm font-bold text-blue-500 bg-blue-50 px-4 py-3 rounded-xl flex justify-between items-center list-none">
                  Tampilkan Navigasi Soal
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 max-h-60 overflow-y-auto pr-2 p-1 custom-scrollbar">
                  {/* Grid Navigasi (Mobile) */}
                  <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 pb-1">
                    {questions.map((_, idx) => {
                      const isAnswered = answers[idx] !== undefined;
                      const isCurrent = currentIndex === idx;
                      return (
                        <button
                          key={`nav-m-${idx}`}
                          onClick={() => setCurrentIndex(idx)}
                          className={`w-full aspect-square rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                            isCurrent ? "ring-2 ring-blue-500 border-blue-500 bg-blue-500 text-white shadow-md" :
                            isAnswered ? "bg-blue-50 border-2 border-blue-200 text-blue-700 hover:bg-blue-100" :
                            "bg-white border-2 border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-500"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </details>

              <div className="hidden lg:block max-h-[60vh] overflow-y-auto pr-2 p-1 custom-scrollbar">
                {/* Grid Navigasi (Desktop) */}
                <div className="grid grid-cols-5 gap-2 pb-1">
                  {questions.map((_, idx) => {
                    const isAnswered = answers[idx] !== undefined;
                    const isCurrent = currentIndex === idx;
                    return (
                      <button
                        key={`nav-d-${idx}`}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-full aspect-square rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                          isCurrent ? "ring-2 ring-blue-500 border-blue-500 bg-blue-500 text-white shadow-md" :
                          isAnswered ? "bg-blue-50 border-2 border-blue-200 text-blue-700 hover:bg-blue-100" :
                          "bg-white border-2 border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-500"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3 text-xs md:text-sm text-slate-600 font-medium">
                  <div className="w-4 h-4 shrink-0 rounded-full bg-white border-2 border-slate-200"></div> Belum dijawab
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm text-slate-600 font-medium">
                  <div className="w-4 h-4 shrink-0 rounded-full bg-blue-50 border-2 border-blue-300"></div> Sudah dijawab
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm text-slate-600 font-medium">
                  <div className="w-4 h-4 shrink-0 rounded-full bg-blue-500 border-2 border-blue-500"></div> Posisi saat ini
                </div>
              </div>
            </div>
            
          </div>
          )}

        </div>
      </main>
      <Footer />
      </>
    </ProtectedRoute>
  );
}
