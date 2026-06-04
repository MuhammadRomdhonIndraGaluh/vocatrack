"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfessionInfo from "@/components/roadmap/ProfessionInfo";
import CareerProgress from "@/components/roadmap/CareerProgress";
import SkillTree from "@/components/roadmap/SkillTree";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { majors } from "@/lib/data/majors";

function RoadmapContent() {
  const searchParams = useSearchParams();
  const majorId = searchParams.get("major") || "rpl";
  const profession = searchParams.get("profession") || "Web Developer";
  
  const majorData = majors.find(m => m.id === majorId || m.title.toLowerCase() === majorId.toLowerCase());
  const majorFullName = majorData ? majorData.desc : majorId.toUpperCase();

  return (
    <div className="flex-1 flex flex-col pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full gap-6 md:gap-8 z-10 relative">
      {/* Section 1: Info Profesi */}
      <ProfessionInfo major={majorFullName} profession={profession} />

      {/* Section 2: Progress Karier */}
      <CareerProgress profession={profession} major={majorId} />

      {/* Section 3: Roadmap Skill Tree */}
      <SkillTree profession={profession} major={majorId} />
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col relative overflow-hidden font-sans bg-gradient-to-b from-blue-500 via-blue-100 to-white">
          
          {/* Elegant & Visible Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            
            {/* Soft Glowing Orbs */}
            <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-blue-300/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-blue-300/20 rounded-full blur-[100px]" />
            
            {/* Rich & Elegant Geometric Accents using Mask for perfect Gradient */}
            <svg className="absolute w-full h-full opacity-90" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="elementGradient" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>

                <pattern id="roadmap-dot-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="white" opacity="0.5" />
                </pattern>

                <mask id="geometricMask">
                  <rect width="100%" height="100%" fill="url(#roadmap-dot-grid)" />
                  <line x1="0" y1="15%" x2="100%" y2="15%" stroke="white" strokeWidth="1.5" strokeDasharray="12 12" opacity="0.6" />
                  <line x1="0" y1="85%" x2="100%" y2="85%" stroke="white" strokeWidth="1.5" strokeDasharray="12 12" opacity="0.6" />
                  <line x1="15%" y1="0" x2="15%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="6 8" opacity="0.5" />
                  <line x1="85%" y1="0" x2="85%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="6 8" opacity="0.5" />
                  <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="20 20" opacity="0.4" />
                  <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="20 20" opacity="0.4" />
                  <path d="M -10% 20% C 30% -10%, 70% 40%, 110% 10%" fill="none" stroke="white" strokeWidth="2" opacity="0.9" />
                  <path d="M -10% 40% C 40% 20%, 60% 80%, 110% 50%" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 6" opacity="0.7" />
                  <path d="M -10% 80% C 40% 110%, 60% 50%, 110% 90%" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.8" />
                  <circle cx="15%" cy="75%" r="80" fill="none" stroke="white" strokeWidth="1" opacity="0.6" />
                  <circle cx="15%" cy="75%" r="120" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.6" />
                  <circle cx="90%" cy="25%" r="100" fill="none" stroke="white" strokeWidth="1" opacity="0.6" />
                  <circle cx="90%" cy="25%" r="140" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.6" />

                  {/* Tech/Study inspired connecting nodes */}
                  <circle cx="10%" cy="30%" r="4" fill="white" />
                  <circle cx="25%" cy="15%" r="6" fill="none" stroke="white" strokeWidth="2" />
                  <circle cx="35%" cy="35%" r="3" fill="white" opacity="0.8" />
                  <path d="M 10% 30% L 25% 15% L 35% 35%" fill="none" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
                  
                  <circle cx="85%" cy="70%" r="5" fill="white" />
                  <circle cx="70%" cy="85%" r="8" fill="none" stroke="white" strokeWidth="2" />
                  <circle cx="92%" cy="90%" r="3" fill="white" />
                  <path d="M 85% 70% L 70% 85% M 85% 70% L 92% 90%" fill="none" stroke="white" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Floating Accents */}
                  <path d="M 50% 10% L 52% 10% M 51% 9% L 51% 11%" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 80% 40% L 82% 40% M 81% 39% L 81% 41%" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="45%" cy="85%" r="2" fill="white" />
                  <circle cx="65%" cy="20%" r="2" fill="white" />
                </mask>
              </defs>

              {/* This rectangle fills the screen with the gradient, but is only visible where the mask is drawn */}
              <rect width="100%" height="100%" fill="url(#elementGradient)" mask="url(#geometricMask)" />
            </svg>
          </div>
          
          <Suspense fallback={<div className="flex-1 flex items-center justify-center text-blue-900 min-h-[50vh] font-bold">Loading Roadmap...</div>}>
            <RoadmapContent />
          </Suspense>
        </main>
        <Footer />
      </>
    </ProtectedRoute>
  );
}
