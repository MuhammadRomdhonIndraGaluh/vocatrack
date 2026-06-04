"use client";

import { useState } from "react";
import { roadmaps } from "@/lib/data/roadmaps";

interface SkillNode {
  id: string;
  label: string;
  desc?: string;
}

import { useRouter } from "next/navigation";
import { useProgress } from "@/components/providers/ProgressProvider";
import { getMaterialForTopic } from "@/lib/data/materiData";

export default function SkillTree({ profession, major }: { profession: string, major: string }) {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const router = useRouter();
  const { isCompleted, toggleMultipleItems } = useProgress();

  // --- REUSABLE NODE COMPONENTS ---

  const Node = ({ label, id, desc }: { label: string, id: string, desc?: string }) => {
    const completed = isCompleted(`roadmap-${profession}-${label}`);
    return (
      <div
        onClick={() => setSelectedSkill({ id, label, desc })}
        className={`border-2 border-white px-5 rounded-xl text-xs md:text-sm font-bold w-fit min-w-[140px] max-w-[200px] text-center transition-all cursor-pointer hover:-translate-y-1 relative z-20 whitespace-normal leading-tight flex items-center justify-center h-[56px] min-h-[56px] ${completed
            ? "bg-amber-400 text-blue-900 shadow-md shadow-amber-400/30"
            : "bg-[#3B82F6] hover:bg-[#2563EB] text-white"
          }`}
      >
        {label}
        {completed && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] border-2 border-white z-30">
            ✓
          </div>
        )}
      </div>
    );
  };

  const CategoryNode = ({ label }: { label: string }) => (
    <div className="bg-[#2563EB] text-white font-black px-8 py-3.5 rounded-2xl relative z-30 border-2 border-white text-sm md:text-base text-center tracking-wider uppercase w-fit min-w-[220px]">
      {label}
    </div>
  );

  const RootNode = ({ label }: { label: string }) => (
    <div className="bg-[#2563EB] text-white font-black text-xl md:text-2xl px-12 py-5 rounded-3xl border-4 border-white text-center tracking-widest uppercase relative z-30 w-fit">
      {label}
    </div>
  );

  // --- SPINE CONNECTORS ---
  // Vertical lines shooting from center nodes. CLIPPED by overflow-hidden on their wrapper.
  const SpineUp = () => (
    <div className="absolute bottom-1/2 left-1/2 w-[3px] h-[2000px] bg-blue-400 -translate-x-1/2 z-0"></div>
  );
  const SpineDown = () => (
    <div className="absolute top-1/2 left-1/2 w-[3px] h-[2000px] bg-blue-400 -translate-x-1/2 z-0"></div>
  );

  // --- ORTHOGONAL BRANCH COMPONENTS ---

  const LeftBranch = ({ skills }: { skills: string[] }) => {
    if (!skills || skills.length === 0) return null;
    return (
      <div className="flex flex-col gap-5 relative w-full items-end pr-8">
        {/* Connector from spine to center category */}
        <div className="absolute right-0 top-1/2 w-8 h-[3px] bg-blue-400 translate-x-full -translate-y-1/2 z-0"></div>

        {/* Vertical Spine */}
        {skills.length > 1 && (
          <div className="absolute right-0 top-[28px] bottom-[28px] w-[3px] bg-blue-400 z-0 rounded-full"></div>
        )}

        {skills.map((label, i) => (
          <div key={i} className="relative flex items-center justify-end w-full">
            {/* Horizontal Branch to node */}
            <div className="absolute right-[-2rem] top-1/2 w-8 h-[3px] bg-blue-400 -translate-y-1/2 z-0"></div>
            <Node id={`l-${label}-${i}`} label={label} />
          </div>
        ))}
      </div>
    );
  };

  const RightBranch = ({ skills }: { skills: string[] }) => {
    if (!skills || skills.length === 0) return null;
    return (
      <div className="flex flex-col gap-5 relative w-full items-start pl-8">
        {/* Connector from center category to spine */}
        <div className="absolute left-0 top-1/2 w-8 h-[3px] bg-blue-400 -translate-x-full -translate-y-1/2 z-0"></div>

        {/* Vertical Spine */}
        {skills.length > 1 && (
          <div className="absolute left-0 top-[28px] bottom-[28px] w-[3px] bg-blue-400 z-0 rounded-full"></div>
        )}

        {skills.map((label, i) => (
          <div key={i} className="relative flex items-center justify-start w-full">
            {/* Horizontal Branch to node */}
            <div className="absolute left-[-2rem] top-1/2 w-8 h-[3px] bg-blue-400 -translate-y-1/2 z-0"></div>
            <Node id={`r-${label}-${i}`} label={label} />
          </div>
        ))}
      </div>
    );
  };

  const DownBranch = ({ skills }: { skills: string[] }) => {
    if (!skills || skills.length === 0) return null;
    return (
      <div className="flex flex-col gap-6 items-center w-full relative z-10">
        {/* Vertical Spine that connects up to CategoryNode and stops at the last node's center */}
        <div className="absolute left-1/2 top-[-2000px] bottom-[28px] w-[3px] bg-blue-400 -translate-x-1/2 z-0"></div>

        {skills.map((label, i) => (
          <div key={i} className="relative z-20 w-fit">
            <Node id={`d-${label}-${i}`} label={label} />
          </div>
        ))}
      </div>
    );
  };

  const Trunk = () => (
    <div className="w-[3px] h-12 bg-blue-400 z-0"></div>
  );

  const roadmap = roadmaps[profession];

  if (!roadmap) {
    return (
      <div className="bg-transparent w-full relative z-10 font-sans pb-32 flex justify-center items-center min-h-[500px]">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 shadow-xl text-center max-w-md mx-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Segera Hadir!</h2>
          <p className="text-neutral-600">Roadmap lengkap untuk profesi <span className="font-bold text-blue-500">{profession}</span> sedang dalam tahap penyusunan oleh pakar industri kami.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent w-full relative z-10 font-sans pb-32 overflow-x-auto custom-scrollbar text-center">

      {/* Container utama dengan auto-width agar terpusat */}
      <div className="inline-flex flex-col items-center relative z-10 px-4 md:px-8 py-12 text-left min-w-max">

        {/* ==================== ROOT ==================== */}
        <div className="flex flex-col items-center w-full relative overflow-hidden pb-4">
          <div className="relative mt-4">
            <SpineDown />
            <RootNode label={roadmap.title} />
          </div>
        </div>

        <Trunk />

        {/* ==================== LEVELS ==================== */}
        {roadmap.levels.map((level, idx) => {
          const isLast = idx === roadmap.levels.length - 1;

          return (
            <div key={idx} className="flex flex-col items-center w-full relative overflow-hidden">
              <div className="flex w-full justify-center items-center gap-8 relative pt-8 pb-4">

                <div className="flex-1 flex justify-end">
                  {level.leftBranch && <LeftBranch skills={level.leftBranch} />}
                </div>

                <div className="flex-shrink-0 relative flex justify-center">
                  <SpineUp />
                  <CategoryNode label={level.category} />
                  {!isLast && <SpineDown />}
                </div>

                <div className="flex-1 flex justify-start">
                  {level.rightBranch && <RightBranch skills={level.rightBranch} />}
                </div>

              </div>

              {level.downBranch && (
                <div className="flex justify-center w-full pb-8">
                  <DownBranch skills={level.downBranch} />
                </div>
              )}

              {!isLast && <Trunk />}
            </div>
          );
        })}

      </div>

      {/* ==================== SKILL DETAIL MODAL ==================== */}
      {selectedSkill && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-blue-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedSkill(null)}
          ></div>
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl md:text-2xl font-black text-blue-900 mb-2">{selectedSkill.label}</h3>

            <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-medium">
              Pelajari materi {selectedSkill.label} secara mendalam untuk melengkapi kerangka kompetensi Anda sebagai {roadmap.title} Profesional.
            </p>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 mb-8">
              <h4 className="text-xs font-bold text-blue-800 mb-3 uppercase tracking-wider">Fokus Pembelajaran</h4>
              <ul className="text-sm text-neutral-700 space-y-2 list-disc pl-4 font-medium">
                <li>Pemahaman Konsep & Fundamental</li>
                <li>Latihan & Studi Kasus Langsung</li>
                <li>Implementasi pada Proyek Nyata</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  router.push(`/materi?topic=${encodeURIComponent(selectedSkill.label)}&profession=${encodeURIComponent(profession)}&major=${encodeURIComponent(major)}`);
                }}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md hover:shadow-lg text-sm"
              >
                Mulai Belajar (Lihat Materi)
              </button>

              <button
                onClick={() => {
                  const parentId = `roadmap-${profession}-${selectedSkill.label}`;
                  const currentStatus = isCompleted(parentId);
                  const newStatus = !currentStatus;
                  
                  // Siapkan payload untuk mengupdate parent dan semua children sekaligus
                  const itemsToToggle: Record<string, boolean> = {};
                  itemsToToggle[parentId] = newStatus;
                  
                  const topicData = getMaterialForTopic(selectedSkill.label);
                  topicData.contents.forEach(m => {
                    itemsToToggle[m.id] = newStatus;
                  });
                  
                  toggleMultipleItems(itemsToToggle);
                  setSelectedSkill(null);
                }}
                className={`w-full font-bold py-3.5 rounded-xl transition-colors shadow-sm text-sm ${isCompleted(`roadmap-${profession}-${selectedSkill.label}`)
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-amber-400 hover:bg-amber-500 text-blue-900"
                  }`}
              >
                {isCompleted(`roadmap-${profession}-${selectedSkill.label}`) ? "Batal Tandai Selesai" : "✔ Tandai Telah Dipelajari"}
              </button>

              <button
                onClick={() => setSelectedSkill(null)}
                className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold py-3.5 rounded-xl transition-colors text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
