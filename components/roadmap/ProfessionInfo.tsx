"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { roadmaps } from "@/lib/data/roadmaps";

interface ProfessionInfoProps {
  major: string;
  profession: string;
}

const professionDescriptions: Record<string, string> = {
  "Web Developer": "Roadmap ini membantu Anda menguasai pengembangan situs web secara menyeluruh, mulai dari dasar antarmuka dengan HTML/CSS, logika interaktif JavaScript, hingga pengelolaan server dan database modern di sisi backend.",
  "Network Engineer": "Roadmap ini akan memandu Anda memahami infrastruktur jaringan komputer, meliputi konfigurasi router dan switch, pengelolaan topologi, subnetting, hingga penerapan sistem keamanan siber pada skala enterprise.",
  "UI/UX Designer": "Roadmap ini membantu Anda memahami proses perancangan antarmuka dan pengalaman pengguna mulai dari user research, wireframing, prototyping, hingga usability testing yang digunakan dalam pengembangan produk digital modern.",
  "Teknisi Kendaraan": "Roadmap ini menyajikan panduan komprehensif terkait teknik otomotif kendaraan ringan, mulai dari overhoul mesin, kelistrikan kendaraan, hingga sasis dan sistem pemindah tenaga.",
  "Teknisi Otomasi Industri": "Roadmap ini memfokuskan Anda pada kompetensi perakitan dan pemrograman PLC, pneumatik/hidrolik, sistem kontrol elektromekanik, dan implementasi teknologi SCADA di lingkungan industri manufaktur.",
  "Teknisi Listrik Industri": "Roadmap ini disusun untuk membekali Anda dengan keahlian perancangan, instalasi, dan pemeliharaan sistem tenaga listrik industri, termasuk instalasi penerangan, pengendalian motor listrik, hingga panel kontrol.",
  "Fashion Designer": "Roadmap ini membimbing Anda menguasai seluruh alur perancangan busana, mulai dari sketsa mode, pembuatan pola (pattern making), teknik menjahit presisi, hingga pengetahuan tentang tekstil dan bisnis fesyen.",
  "Chef": "Roadmap ini memandu Anda menapaki karir kuliner profesional, meliputi dasar sanitasi dapur, teknik pemotongan dan pengolahan hidangan panas, hingga seni penyajian kuliner Nusantara dan Kontinental.",
  "Drafter Bangunan": "Roadmap ini mengajarkan Anda keterampilan merancang dan menggambar konstruksi bangunan secara presisi menggunakan software CAD dan pemodelan 3D, lengkap dengan perhitungan Rencana Anggaran Biaya (RAB).",
  "Animator": "Roadmap ini mencakup keterampilan menyeluruh dalam produksi animasi, mulai dari konsep storyboard, pembuatan elemen 2D dan 3D, rigging, keyframing, hingga rendering dan penyusunan portofolio kreatif.",
  "Akuntan": "Roadmap ini memberikan pemahaman mendalam tentang siklus akuntansi perusahaan dagang dan jasa, rekonsiliasi bank, penghitungan pajak, hingga pengoperasian perangkat lunak akuntansi modern.",
  "Hotel Front Office Staff": "Roadmap ini melatih Anda menjadi garda terdepan industri perhotelan dengan keterampilan penanganan reservasi, standar pelayanan tamu yang prima, komunikasi lintas bahasa, dan penggunaan sistem manajemen hotel."
};

export default function ProfessionInfo({ major, profession }: ProfessionInfoProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract dynamic skills based on the profession roadmap
  const roadmapData = roadmaps[profession];
  let skills: string[] = [];

  if (roadmapData && roadmapData.levels) {
    const extractedSkills = new Set<string>();
    roadmapData.levels.forEach(level => {
      // Adding top-level skills from branches
      if (level.leftBranch) level.leftBranch.forEach(skill => extractedSkills.add(skill));
      if (level.rightBranch) level.rightBranch.forEach(skill => extractedSkills.add(skill));
      if (level.downBranch) level.downBranch.forEach(skill => extractedSkills.add(skill));
    });
    skills = Array.from(extractedSkills).slice(0, 10); // Batasi maksimal 10 skill
  }

  // Fallback if somehow there are no skills
  if (skills.length === 0) {
    skills = ["Problem Solving", "Komunikasi", "Analisis Data", "Kerja Tim"];
  }

  const description = professionDescriptions[profession] || `Berikut adalah kurikulum dan daftar keahlian yang akan Anda pelajari pada rute profesi ${profession}.`;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl w-full relative z-10">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-1 text-xs md:text-sm text-white bg-blue-400 hover:bg-blue-500 transition-colors px-3 py-1.5 rounded-full mb-6 font-medium shadow-sm w-fit"
      >
        <ChevronLeft size={16} />
        Kembali
      </button>

      {/* Header Badges */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
        <span className="bg-blue-500 text-white font-bold px-4 py-1.5 rounded-full text-lg md:text-xl uppercase shadow-sm">
          {major}
        </span>
        <span className="bg-amber-400 text-white font-bold px-4 py-1.5 rounded-full text-lg md:text-xl shadow-sm">
          ROADMAP PROFESI
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-black text-neutral-800 mb-3 uppercase tracking-tight">
        {profession}
      </h2>

      {/* Description */}
      <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
        {description}
      </p>

      {/* Divider */}
      <hr className="border-blue-100 mb-6" />

      {/* Skills Section - Visible ONLY when expanded */}
      {isExpanded && (
        <div className="mb-2">
          <h3 className="text-sm md:text-base font-bold text-neutral-800 mb-4">Skill yang Akan Didapatkan:</h3>
          <div className="flex flex-wrap gap-2 md:gap-3 content-start">
            {skills.map((skill, i) => (
              <span key={i} className="bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs md:text-sm shadow-sm hover:-translate-y-0.5 transition-transform cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* See More Toggle */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs md:text-sm text-blue-500 bg-blue-50 hover:bg-blue-100 transition-colors px-4 py-1.5 rounded-full font-bold"
        >
          {isExpanded ? "See Less" : "See More"}
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </div>
  );
}
