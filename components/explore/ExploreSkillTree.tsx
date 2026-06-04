"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExploreRoadmap, ExploreSkill } from "@/lib/data/exploreRoadmaps";
import { useProgress } from "@/components/providers/ProgressProvider";
import { getMaterialForTopic } from "@/lib/data/materiData";

interface ExploreSkillTreeProps {
  roadmap: ExploreRoadmap;
  majorId: string;
  completedItems: Set<string>;
}

interface SelectedNode {
  id: string;
  label: string;
  tag: string;
}

export default function ExploreSkillTree({ roadmap, majorId, completedItems }: ExploreSkillTreeProps) {
  const [selectedSkill, setSelectedSkill] = useState<SelectedNode | null>(null);
  const router = useRouter();
  const { toggleItem, toggleMultipleItems } = useProgress();

  const toggleNodeCompletion = (id: string, label: string) => {
    const newStatus = !completedItems.has(id);
    
    // Siapkan payload untuk mengupdate parent dan semua children
    const itemsToToggle: Record<string, boolean> = {};
    itemsToToggle[id] = newStatus;
    
    const topicData = getMaterialForTopic(label);
    topicData.contents.forEach(m => {
      itemsToToggle[m.id] = newStatus;
    });
    
    toggleMultipleItems(itemsToToggle);
    setSelectedSkill(null); // Tutup modal setelah ditandai
  };

  // --- REUSABLE NODE COMPONENTS ---

  const renderNode = (skill: ExploreSkill, idPrefix: string) => {
    const nodeId = `explore-${majorId}-${idPrefix}-${skill.label.replace(/\s+/g, '-').toLowerCase()}`;
    const isCompleted = completedItems.has(nodeId);

    return (
      <div
        key={nodeId}
        onClick={() => setSelectedSkill({ id: nodeId, label: skill.label, tag: skill.tag })}
        className={`border-2 border-white px-3 md:px-5 rounded-xl text-[10px] sm:text-xs md:text-sm font-bold w-fit min-w-[120px] max-w-[180px] text-center transition-all cursor-pointer hover:-translate-y-1 relative z-20 whitespace-normal leading-tight flex items-center justify-center h-[48px] md:h-[56px] min-h-[48px] md:min-h-[56px] ${isCompleted
          ? "bg-amber-400 text-blue-900 shadow-md shadow-amber-400/30"
          : "bg-[#3B82F6] hover:bg-[#2563EB] text-white"
          }`}
      >
        {skill.label}
        {isCompleted && (
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

  const QuizNode = ({ categoryId, label }: { categoryId: string, label: string }) => {
    // Cek status dummy dari progress (bisa diintegrasikan ke sistem nilai nanti)
    const quizId = `quiz-${categoryId.replace(/\s+/g, '-').toLowerCase()}`;
    const isCompleted = completedItems.has(quizId);

    return (
      <div
        onClick={() => router.push(`/quiz/${encodeURIComponent(categoryId)}?major=${majorId}`)}
        className={`px-5 py-3 md:px-6 md:py-3.5 rounded-xl text-xs md:text-sm font-semibold text-center tracking-wide w-fit cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative z-30 flex items-center justify-center gap-2.5 border-2 border-white ${
          isCompleted
            ? "bg-amber-600 text-white"
            : "bg-amber-500 hover:bg-amber-600 text-white"
        }`}
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-white/20 text-white">
          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </span>
        Evaluasi {label}
        {isCompleted && (
          <div className="absolute -top-1.5 -right-1.5 bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        )}
      </div>
    );
  };

  // --- SPINE CONNECTORS ---
  const SpineUp = () => (
    <div className="absolute bottom-1/2 left-1/2 w-[3px] h-[2000px] bg-blue-400 -translate-x-1/2 z-0"></div>
  );
  const SpineDown = () => (
    <div className="absolute top-1/2 left-1/2 w-[3px] h-[2000px] bg-blue-400 -translate-x-1/2 z-0"></div>
  );

  // --- ORTHOGONAL BRANCH COMPONENTS ---

  const LeftBranch = ({ skills }: { skills: ExploreSkill[] }) => {
    if (!skills || skills.length === 0) return null;
    return (
      <div className="flex flex-col gap-5 relative w-full items-end pr-8">
        <div className="absolute right-0 top-1/2 w-8 h-[3px] bg-blue-400 translate-x-full -translate-y-1/2 z-0"></div>
        {skills.length > 1 && (
          <div className="absolute right-0 top-[28px] bottom-[28px] w-[3px] bg-blue-400 z-0 rounded-full"></div>
        )}
        {skills.map((skill, i) => (
          <div key={i} className="relative flex items-center justify-end w-full">
            <div className="absolute right-[-2rem] top-1/2 w-8 h-[3px] bg-blue-400 -translate-y-1/2 z-0"></div>
            {renderNode(skill, 'l')}
          </div>
        ))}
      </div>
    );
  };

  const RightBranch = ({ skills }: { skills: ExploreSkill[] }) => {
    if (!skills || skills.length === 0) return null;
    return (
      <div className="flex flex-col gap-5 relative w-full items-start pl-8">
        <div className="absolute left-0 top-1/2 w-8 h-[3px] bg-blue-400 -translate-x-full -translate-y-1/2 z-0"></div>
        {skills.length > 1 && (
          <div className="absolute left-0 top-[28px] bottom-[28px] w-[3px] bg-blue-400 z-0 rounded-full"></div>
        )}
        {skills.map((skill, i) => (
          <div key={i} className="relative flex items-center justify-start w-full">
            <div className="absolute left-[-2rem] top-1/2 w-8 h-[3px] bg-blue-400 -translate-y-1/2 z-0"></div>
            {renderNode(skill, 'r')}
          </div>
        ))}
      </div>
    );
  };

  const DownBranch = ({ skills }: { skills: ExploreSkill[] }) => {
    if (!skills || skills.length === 0) return null;
    return (
      <div className="flex flex-col gap-6 items-center w-full relative z-10">
        {/* Vertical Spine that connects up to CategoryNode and stops at the last node's center */}
        <div className="absolute left-1/2 top-[-2000px] bottom-[28px] w-[3px] bg-blue-400 -translate-x-1/2 z-0"></div>

        {skills.map((skill, i) => (
          <div key={i} className="relative z-20 w-fit">
            {renderNode(skill, 'd')}
          </div>
        ))}
      </div>
    );
  };

  const Trunk = () => (
    <div className="w-[3px] h-12 bg-blue-400 z-0"></div>
  );

  return (
    <div className="bg-transparent w-full relative z-10 font-sans pb-32 overflow-x-auto custom-scrollbar text-center">

      <div className="inline-flex flex-col items-center relative z-10 px-4 md:px-8 py-12 text-left min-w-max">

        <div className="flex flex-col items-center w-full relative overflow-hidden pb-4">
          <div className="relative mt-4">
            <SpineDown />
            <RootNode label={roadmap.title} />
          </div>
        </div>

        <Trunk />

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
                <div className="flex justify-center w-full pb-6">
                  <DownBranch skills={level.downBranch} />
                </div>
              )}

              {/* Spine to Quiz */}
              <div className="relative flex justify-center w-full pb-8 pt-4">
                <div className="absolute top-0 bottom-1/2 w-[3px] bg-blue-400 -z-10"></div>
                <QuizNode categoryId={level.category} label={level.category} />
              </div>

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
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-200 text-left">
            <h3 className="text-xl md:text-2xl font-black text-blue-900 mb-2">{selectedSkill.label}</h3>

            <p className="text-neutral-600 text-sm leading-relaxed mb-6 font-medium">
              Eksplorasi materi <span className="font-bold text-blue-500">{selectedSkill.label}</span> untuk mengenali apakah Anda memiliki minat dan bakat di bidang ini.
            </p>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 mb-8">
              <h4 className="text-xs font-bold text-blue-800 mb-2 uppercase tracking-wider">Aksi Tersedia</h4>
              <p className="text-sm text-neutral-600">
                Tandai materi ini sebagai "Telah Dipelajari" untuk memberikan poin minat pada sistem kecerdasan buatan kami.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  router.push(`/materi?topic=${encodeURIComponent(selectedSkill.label)}&profession=${encodeURIComponent("Eksplorasi Jurusan")}`);
                }}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md hover:shadow-lg text-sm"
              >
                Mulai Belajar (Lihat Materi)
              </button>

              <button
                onClick={() => toggleNodeCompletion(selectedSkill.id, selectedSkill.label)}
                className={`w-full font-bold py-3.5 rounded-xl transition-colors shadow-sm text-sm ${completedItems.has(selectedSkill.id)
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-amber-400 hover:bg-amber-500 text-blue-900"
                  }`}
              >
                {completedItems.has(selectedSkill.id) ? "Batal Tandai Selesai" : "✔ Tandai Telah Dipelajari"}
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
