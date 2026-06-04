"use client";

import { CheckCircle, ChevronRight } from "lucide-react";
import { useProgress } from "@/components/providers/ProgressProvider";
import { roadmaps } from "@/lib/data/roadmaps";
import Link from "next/link";
import { calculateProgress } from "@/lib/progressService";

export default function CareerProgress({ profession, major }: { profession: string, major: string }) {
  const { completedItems } = useProgress();

  const roadmapData = Object.values(roadmaps).find(r => r.title === profession);
  let totalNodes = 0;
  if (roadmapData) {
    totalNodes = roadmapData.levels.reduce((acc, level) => {
      const left = level.leftBranch?.length || 0;
      const right = level.rightBranch?.length || 0;
      const down = level.downBranch?.length || 0;
      return acc + left + right + down;
    }, 0);
  }

  const completedCount = Array.from(completedItems).filter(id => id.startsWith(`roadmap-${profession}-`)).length;
  const progressPercent = calculateProgress(completedCount, totalNodes);

  return (
    <div className="bg-blue-500/40 backdrop-blur-sm border border-blue-400/50 rounded-3xl p-6 md:p-8 shadow-lg w-full text-white relative z-10">
      <h2 className="text-sm md:text-base font-bold text-blue-100 uppercase tracking-wider mb-6">
        MENUJU {profession.toUpperCase()}
      </h2>

      {/* Standardized Progress Area */}
      <div className="mb-8 bg-blue-900/20 p-4 md:p-5 rounded-2xl border border-blue-500/20">
        <div className="flex justify-between items-end w-full mb-3">
          <span className="text-sm md:text-base font-bold text-white">Progress Pembelajaran</span>
          <span className="text-lg md:text-xl font-black text-white">{progressPercent}%</span>
        </div>
        <div className="w-full bg-blue-900/50 rounded-full h-3.5 md:h-4 overflow-hidden shadow-inner mb-3">
          <div 
            className="bg-gradient-to-r from-blue-400 to-blue-300 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
        <div className="text-xs md:text-sm font-medium text-blue-200">
          {completedCount} dari {totalNodes} materi selesai
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="flex items-center gap-3 bg-blue-800/40 rounded-xl px-4 py-3 border border-blue-500/30">
          <div className="bg-green-500/20 p-2 rounded-lg text-green-400 shrink-0">
            <CheckCircle size={24} />
          </div>
          <div>
            <div className="font-bold text-sm md:text-base">Materi Diselesaikan</div>
            <div className="text-xs text-blue-200">{completedCount} dari {totalNodes} materi</div>
          </div>
        </div>
      </div>

      <Link 
        href={`/quiz/${encodeURIComponent(profession)}?major=${encodeURIComponent(major)}&profession=${encodeURIComponent(profession)}`}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-blue-900 font-bold py-3 px-6 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Uji Kompetensi: {profession} <ChevronRight size={18} />
      </Link>
    </div>
  );
}
