"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full flex flex-col items-center overflow-hidden bg-gradient-to-b from-blue-300/90 via-blue-400 to-blue-500 pb-10 md:pb-0"
    >
      {/* Elegant & Visible Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Glowing Orbs (Kept for depth, slightly brighter) */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[50%] bg-blue-100/40 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[60%] bg-white/30 rounded-full blur-[120px]" />
        
        {/* Visible Geometric Accents */}
        <svg className="absolute w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
          {/* Elegant curved dashed lines */}
          <path d="M-100 200 Q 400 350, 800 150 T 1800 250" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="8 8" />
          <path d="M-100 500 Q 500 400, 1000 650 T 1900 550" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
          
          {/* Delicate Rings */}
          <circle cx="12%" cy="25%" r="45" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="12%" cy="25%" r="65" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="3 3" />
          
          <circle cx="88%" cy="55%" r="70" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="88%" cy="55%" r="100" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
          
          {/* Floating plus signs / crosses */}
          <path d="M 25% 15% L 27% 15% M 26% 14% L 26% 16%" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M 75% 25% L 77% 25% M 76% 24% L 76% 26%" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Content */}
      <div className="container-main relative z-10 flex flex-col items-center text-center pt-[5.25rem] md:pt-[5.25rem] lg:pt-[6rem]">

        {/* Heading & Text (Animated) */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-tight max-w-2xl">
            Temukan Jalur Karier dari Jurusanmu
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/90 max-w-xl leading-relaxed">
            VocaTrack membantumu memahami peluang karier, skill yang dibutuhkan,
            dan langkah belajar berdasarkan jurusan yang kamu pilih.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-8">
            <a
              href="#study"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-blue-500 text-sm font-semibold rounded-full shadow-lg transition-all duration-200 hover:bg-white/95 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Pilih Jurusan Sekarang
            </a>
            <button className="inline-flex items-center gap-2 px-7 py-3 border-2 border-white/80 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:bg-white/10 hover:border-white hover:scale-[1.02] active:scale-[0.98]">
              <Play size={16} fill="white" />
              Tonton Tutorial
            </button>
          </div>
        </motion.div>
      </div>

      {/* Hero Illustration & Clouds Transition (Static, Enlarger) */}
      <motion.div
        className="relative w-full flex-1 flex flex-col justify-end -mt-4 md:-mt-8 max-w-[1920px] mx-auto z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >
        <div className="w-full h-full flex items-end justify-center">
          <Image
            src="/images/gambar-1.png"
            alt="Ilustrasi Siswa dan Transisi Awan VocaTrack"
            width={1920}
            height={800}
            className="w-full h-auto min-w-[800px] object-cover md:object-contain object-bottom"
            priority
          />
        </div>
      </motion.div>

      {/* Persegi panjang putih di paling bawah untuk meratakan dasar awan secara presisi */}
      <div className="absolute bottom-0 left-0 right-0 h-[128px] md:h-[15vw] lg:h-[11.7vw] bg-white z-20" />
    </section>
  );
}
