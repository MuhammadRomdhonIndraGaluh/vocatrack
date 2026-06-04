"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/images/login-1.png",
    title: "Navigasi Karier Jadi Lebih Interaktif",
    description: "Temukan hubungan antara pelajaran di kelas dan kebutuhan industri melalui jalur skill-tree yang adaptif dan terarah.",
  },
  {
    image: "/images/login-2.png",
    title: "Bangun Portofolio Sejak Dini",
    description: "Kumpulkan sertifikasi dan selesaikan tantangan project nyata untuk membangun portofolio yang dilirik oleh para perekrut.",
  },
  {
    image: "/images/login-3.png",
    title: "Pilih Jalur Sesuai Minat",
    description: "Sistem cerdas kami akan merekomendasikan jalur karier terbaik berdasarkan minat dan bakat unik yang kamu miliki.",
  },
  {
    image: "/images/login-4.png",
    title: "Materi Relevan & Terstruktur",
    description: "Belajar dengan kurikulum yang dirancang khusus bersama pakar industri untuk memastikan kamu mempelajari skill yang benar-benar dibutuhkan.",
  },
  {
    image: "/images/login-5.png",
    title: "Siap Terjun Ke Dunia Kerja",
    description: "Jembatani gap antara sekolah dan industri. Persiapkan dirimu menjadi talenta muda profesional yang siap bersaing secara global.",
  },
];

export default function AuthSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-8 lg:px-16 overflow-hidden">
      
      {/* Decorative Zigzag lines (simulated with CSS/SVG) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path d="M-100 200 L150 50 L350 250 L600 50 L850 300" stroke="white" strokeWidth="2" fill="none" />
          <path d="M-100 400 L150 250 L350 450 L600 250 L850 500" stroke="white" strokeWidth="2" fill="none" />
          <path d="M-100 600 L150 450 L350 650 L600 450 L850 700" stroke="white" strokeWidth="2" fill="none" />
          <path d="M-100 800 L150 650 L350 850 L600 650 L850 900" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[340px] md:max-w-[380px] mx-auto mt-8 md:mt-0 flex flex-col">
        {/* Image Container with Custom Glow and Fade */}
        <div className="relative w-full aspect-square -mb-6 md:-mb-10 z-10">
          {/* Background Blue Circle Accent */}
          <div className="absolute inset-[12%] bg-[#4CA3FF] rounded-full blur-[2px] opacity-70 z-0" />
          
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              {/* Wrapper div to apply Tailwind transforms without Framer Motion interference */}
              <div 
                className={`relative w-full h-full transition-transform duration-300 ${
                  currentIndex === 3 
                    ? "translate-y-8 md:translate-y-12 scale-105 md:scale-100 origin-bottom" 
                    : "translate-y-2 md:translate-y-4 scale-100 origin-center"
                }`}
              >
                <Image
                  src={slides[currentIndex].image}
                  alt="Illustration"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 340px, 380px"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Soft Fade Effect at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#4185F4] via-[#4185F4]/70 to-transparent z-20 pointer-events-none" />
        </div>

        {/* Text Area (Fixed height to prevent layout shift) */}
        <div className="relative h-[120px] md:h-[140px] lg:h-[130px] w-full z-30">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <h1 className={`font-extrabold text-[#FFD15B] mb-2 md:mb-3 leading-[1.2] text-left ${
                currentIndex === 3 
                  ? "text-[20px] md:text-[24px] tracking-tight whitespace-nowrap" 
                  : "text-[22px] md:text-[26px]"
              }`}>
                {slides[currentIndex].title}
              </h1>
              <p className="text-white/95 text-xs md:text-sm leading-relaxed text-justify">
                {slides[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Pagination */}
        <div className="flex items-center gap-2 mt-2 relative z-30 justify-start">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-4 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
