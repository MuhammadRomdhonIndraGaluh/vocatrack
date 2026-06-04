"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MaterialList from "@/components/materi/MaterialList";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo, useState, useEffect } from "react";
import { getMaterialForTopic } from "@/lib/data/materiData";
import { ChevronLeft } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useProgress } from "@/components/providers/ProgressProvider";

function MateriContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic") || "Materi Umum";
  const professionParam = searchParams.get("profession") || "Umum";
  const majorParam = searchParams.get("major") || "";
  const { completedItems } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memastikan data konsisten selama satu sesi menggunakan useMemo
  const topicData = useMemo(() => getMaterialForTopic(topicParam), [topicParam]);
  const materials = topicData.contents;

  // Kalkulasi progress berdasarkan completedItems dari provider
  const materialIds = materials.map(m => m.id);
  const completedMaterialCount = mounted ? materialIds.filter(id => completedItems.has(id)).length : 0;
  const progressPercent = materialIds.length > 0 ? Math.round((completedMaterialCount / materialIds.length) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full gap-8 z-10 relative font-sans">
      
      {/* BACK BUTTON */}
      <div className="w-full flex justify-start mb-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs md:text-sm text-white bg-blue-400 hover:bg-blue-500 transition-colors px-3 py-1.5 rounded-full font-medium shadow-sm w-fit"
        >
          <ChevronLeft size={16} />
          Kembali
        </button>
      </div>

      {/* HEADER SECTION */}
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
        <div className="text-center w-full flex flex-col gap-4">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold w-fit mx-auto shadow-sm border border-blue-200 uppercase tracking-wider mb-2">
            {professionParam} • {topicParam}
          </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight drop-shadow-sm">
          Daftar <span className="text-blue-500">Materi</span> Pembelajaran
        </h1>
        
        <p className="text-neutral-600 font-medium text-sm md:text-base leading-relaxed px-4">
          Pelajari materi yang sesuai dengan jurusanmu dan tingkatkan skill untuk mencapai karier yang kamu inginkan.
        </p>
        </div>
      </div>

      {/* PROGRESS BAR (STANDARDIZED) */}
      <div className="w-full bg-white/60 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-sm border border-blue-100 mb-2">
        <div className="flex justify-between items-end w-full mb-3">
          <span className="text-sm md:text-base font-bold text-slate-700">Progress Pembelajaran</span>
          <span className="text-lg md:text-xl font-black text-blue-500">{progressPercent}%</span>
        </div>
        <div className="w-full bg-gradient-to-r from-blue-100/80 to-white border border-blue-200/60 rounded-full h-3.5 md:h-4 overflow-hidden shadow-[inset_0_2px_4px_rgba(37,99,235,0.1)] mb-3">
          <div 
            className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
        <div className="text-xs md:text-sm font-medium text-slate-500">
          {completedMaterialCount} dari {materialIds.length} materi selesai
        </div>
      </div>

      {/* LIST MATERI */}
      <MaterialList materials={materials} parentTopic={topicData.topicTitle} professionParam={professionParam} majorParam={majorParam} />

    </div>
  );
}

export default function MateriPage() {
  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-50 to-white">
        
        {/* Dekorasi Background Geometris */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Blur Orbs */}
          <div className="absolute top-[5%] right-[-5%] w-[40%] h-[40%] bg-blue-300/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px]" />
          
          {/* SVG Geometris */}
          <svg className="absolute w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="materi-dot-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#3b82f6" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#materi-dot-grid)" />
            
            {/* Abstrak Lines */}
            <path d="M 0 20% C 30% 10%, 70% 30%, 100% 15%" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="10 10" opacity="0.35" />
            <path d="M -10% 60% C 40% 40%, 60% 80%, 110% 50%" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
            <path d="M 20% 100% C 30% 70%, 80% 90%, 100% 60%" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.3" />
            
            {/* Abstrak Polygons */}
            <circle cx="85%" cy="25%" r="80" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.35" />
            <circle cx="85%" cy="25%" r="120" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
            <rect x="10%" y="70%" width="150" height="150" fill="none" stroke="#93c5fd" strokeWidth="1.5" transform="rotate(45 150 700)" opacity="0.3" />
          </svg>
        </div>
        
        <Suspense fallback={<div className="flex-1 flex items-center justify-center text-blue-900 min-h-[50vh] font-bold">Memuat Materi...</div>}>
          <MateriContent />
        </Suspense>
      </main>
      <Footer />
      </>
    </ProtectedRoute>
  );
}
