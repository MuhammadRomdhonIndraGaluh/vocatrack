"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { exploreRoadmaps } from "@/lib/data/exploreRoadmaps";

interface ExploreInfoProps {
  major: string;
  majorId: string;
}

const exploreDescriptions: Record<string, string> = {
  "rpl": "Eksplorasi ini akan memperkenalkan Anda pada berbagai pilar rekayasa perangkat lunak. Anda akan meraba berbagai teknologi mulai dari pemrograman web, aplikasi mobile, pengelolaan database, hingga jaminan kualitas (QA) sebelum memutuskan spesialisasi karir Anda.",
  "tkj": "Eksplorasi ini memberikan gambaran komprehensif tentang dunia teknik komputer dan jaringan. Anda akan mempelajari dasar-dasar infrastruktur jaringan, administrasi server, dan sistem keamanan siber sebagai fondasi sebelum mendalami spesialisasi IT Support atau Network Engineer.",
  "dkv": "Eksplorasi ini mengajak Anda menjelajahi berbagai bentuk desain komunikasi visual. Melalui seni grafis, ilustrasi, UI/UX, hingga videografi dan animasi, Anda dapat mengenali keahlian visual yang paling sesuai dengan passion kreatif Anda.",
  "tei": "Eksplorasi ini membawa Anda mengenal teknologi otomasi industri modern. Anda akan melihat langsung bagaimana sistem kelistrikan, robotika, dan mikrokontroler (IoT) diintegrasikan untuk menjalankan proses produksi di pabrik pintar.",
  "titl": "Eksplorasi ini dirancang agar Anda memahami lanskap instalasi tenaga listrik. Mulai dari sistem penerangan domestik hingga perakitan panel distribusi dan perawatan motor industri, eksplorasi ini akan memantapkan langkah Anda menuju spesialisasi teknisi listrik.",
  "tkr": "Eksplorasi ini memberikan pemahaman luas di bidang otomotif kendaraan ringan. Anda akan bereksperimen dengan manajemen mesin, sistem kelistrikan pintar mobil, dan analisis sasis guna menentukan fokus keahlian mekanik Anda ke depannya.",
  "tabus": "Eksplorasi ini membuka wawasan Anda tentang lanskap industri fesyen. Anda berkesempatan menjajaki ilmu desain mode, pola, teknik menjahit tingkat lanjut, hingga penataan gaya (styling) untuk menemukan jalur karir terbaik di dunia tata busana.",
  "tabog": "Eksplorasi ini dirancang agar Anda dapat mengenali dinamika dapur profesional. Dari seni membuat hidangan utama (hot kitchen), aneka roti dan kue (pastry), hingga manajemen restoran, eksplorasi ini akan mempertajam insting kuliner Anda.",
  "animasi": "Eksplorasi ini memfasilitasi Anda untuk mencoba seluruh tahapan pembuatan animasi. Anda dapat menguji minat Anda dalam pembuatan aset 2D, pemodelan 3D, efek visual (VFX), dan penulisan cerita (storyboarding) sebelum menjadi spesialis animasi.",
  "akuntansi": "Eksplorasi ini akan memperluas pandangan Anda mengenai pengelolaan keuangan dan perpajakan. Melalui simulasi pembukuan komersial, audit dasar, dan komputer akuntansi, Anda akan menemukan jalur spesialisasi akuntansi yang paling tepat.",
  "perhotelan": "Eksplorasi ini memperkenalkan dinamika operasional industri layanan perhotelan. Mulai dari manajemen tata graha (housekeeping), layanan makanan, hingga operasional front office, Anda akan diajak menyelami standar tinggi di balik bisnis hospitality."
};

export default function ExploreInfo({ major, majorId }: ExploreInfoProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract dynamic skills based on the explore roadmap
  const roadmapData = exploreRoadmaps[majorId];
  let skills: string[] = [];

  if (roadmapData && roadmapData.levels) {
    const extractedSkills = new Set<string>();
    roadmapData.levels.forEach(level => {
      if (level.leftBranch) level.leftBranch.forEach(skill => extractedSkills.add(skill.label));
      if (level.rightBranch) level.rightBranch.forEach(skill => extractedSkills.add(skill.label));
      if (level.downBranch) level.downBranch.forEach(skill => extractedSkills.add(skill.label));
    });
    skills = Array.from(extractedSkills).slice(0, 10); // Batasi maksimal 10 skill
  }

  // Fallback
  if (skills.length === 0) {
    skills = ["Eksplorasi Konsep", "Analisis Minat", "Pemecahan Masalah", "Pengenalan Karir"];
  }

  const description = exploreDescriptions[majorId] || `Berikut adalah kurikulum dan daftar keahlian yang akan Anda eksplorasi. Jelajahi berbagai bidang, tandai materi yang Anda pelajari, dan temukan profesi terbaik yang paling sesuai dengan minat Anda!`;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl w-full relative z-10">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-1 text-xs md:text-sm text-white bg-blue-400 hover:bg-blue-500 transition-colors px-3 py-1.5 rounded-full mb-6 font-medium shadow-sm w-fit"
      >
        <ChevronLeft size={16} />
        Kembali
      </button>

      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
        <span className="bg-blue-500 text-white font-bold px-4 py-1.5 rounded-full text-lg md:text-xl uppercase shadow-sm">
          {major}
        </span>
        <span className="bg-amber-400 text-white font-bold px-4 py-1.5 rounded-full text-lg md:text-xl shadow-sm">
          ROADMAP EKSPLORASI
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-black text-neutral-800 mb-3 uppercase tracking-tight">
        Eksplorasi Jurusan
      </h2>

      <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-medium mb-6">
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
