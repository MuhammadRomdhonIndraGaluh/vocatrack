"use client";

import { useState } from "react";
import { MonitorPlay, FileText, Download, ArrowLeft, CheckSquare, PlayCircle, Link as LinkIcon } from "lucide-react";
import { MaterialContent } from "@/lib/data/materiData";
import { useProgress } from "@/components/providers/ProgressProvider";
import Link from "next/link";

interface MaterialListProps {
  materials: MaterialContent[];
  parentTopic: string;
  professionParam: string;
}

export default function MaterialList({ materials, parentTopic, professionParam }: MaterialListProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialContent | null>(null);
  const { isCompleted, toggleItem } = useProgress();

  const getIcon = (type: string) => {
    switch (type) {
      case "video": return <PlayCircle size={28} className="text-red-500" />;
      case "pdf": return <FileText size={28} className="text-blue-500" />;
      default: return <LinkIcon size={28} className="text-blue-500" />;
    }
  };

  const handleToggle = (e: React.MouseEvent, materialGlobalId: string) => {
    e.stopPropagation();
    
    // Toggle status item ini (akan mengembalikan status kebalikan)
    const newStatus = !isCompleted(materialGlobalId);
    toggleItem(materialGlobalId, newStatus);
    
    // Sinkronisasi dengan Parent (Roadmap Topic)
    // ID parent di ProgressProvider adalah `roadmap-${professionParam}-${parentTopic}`
    const parentId = `roadmap-${professionParam}-${parentTopic}`;
    
    // Periksa status semua saudara kandungnya (termasuk dirinya sendiri dengan status yang baru)
    let allCompleted = true;
    for (const m of materials) {
      if (m.id === materialGlobalId) {
        if (!newStatus) allCompleted = false;
      } else {
        if (!isCompleted(m.id)) allCompleted = false;
      }
    }
    
    // Update status parent
    toggleItem(parentId, allCompleted);
  };

  return (
    <div className="w-full flex flex-col gap-4 relative z-10">
      {materials.map((materi) => {
        const materialGlobalId = materi.id; // Karena di data kita sudah unik (misal materi-html-1)
        const isMaterialCompleted = isCompleted(materialGlobalId);
        
        return (
        <div 
          key={materi.id}
          className={`bg-white rounded-2xl p-5 md:p-6 shadow-sm border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${
            isMaterialCompleted ? 'border-amber-400 bg-amber-50 shadow-amber-100' : 'border-blue-100 hover:border-blue-300 hover:shadow-md'
          }`}
        >
          {/* KIRI & TENGAH: Icon + Info */}
          <div className="flex items-start md:items-center gap-4 md:gap-5 w-full">
            <div className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform ${
              isMaterialCompleted ? 'bg-amber-400 text-blue-900' : 'bg-blue-50'
            }`}>
              {isMaterialCompleted ? <CheckSquare size={24} /> : getIcon(materi.type)}
            </div>
            
            <div className="flex-1">
              <a href={materi.url} target="_blank" rel="noopener noreferrer" className="block text-base md:text-lg font-bold text-neutral-800 mb-2 hover:text-blue-500 hover:underline transition-colors">
                {materi.title}
              </a>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] md:text-xs text-neutral-500 font-medium">
                {materi.type === "video" && materi.duration && (
                  <div className="flex items-center gap-1.5">
                    <MonitorPlay size={14} className="text-red-400" />
                    Video ({materi.duration})
                  </div>
                )}
                {materi.type === "pdf" && materi.pages && (
                  <div className="flex items-center gap-1.5">
                    <FileText size={14} className="text-blue-400" />
                    Dokumen PDF ({materi.pages} Halaman)
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* KANAN: Button Unduh & Status */}
          <div className="w-full sm:w-auto flex flex-row sm:flex-col justify-end sm:items-end gap-3 shrink-0 mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-slate-100">
            <button 
              onClick={(e) => handleToggle(e, materialGlobalId)}
              className={`flex items-center gap-2 text-xs md:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-sm w-full sm:w-auto justify-center ${
                isMaterialCompleted 
                  ? 'bg-amber-400 text-blue-900 hover:bg-amber-500' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <CheckSquare size={16} /> 
              {isMaterialCompleted ? 'Selesai' : 'Tandai Selesai'}
            </button>
          </div>
        </div>
        );
      })}

      {materials.length === 0 && (
        <div className="bg-white p-8 rounded-2xl text-center border border-slate-100 shadow-sm">
          <p className="text-slate-500 font-medium">Materi untuk topik ini sedang dalam tahap pengembangan.</p>
        </div>
      )}
    </div>
  );
}
