"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 md:py-32 bg-gradient-to-b from-white to-blue-100 overflow-hidden font-sans">
      {/* Elegant Minimalist Elements: Subtle Grid & Shapes (Bottom Only) */}
      <div className="absolute inset-x-0 bottom-0 top-1/4 pointer-events-none z-0">
        <svg className="absolute w-full h-full opacity-90" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle swooshes and tech lines in the bottom half */}
          <path d="M-10% 80% C 20% 60%, 60% 100%, 110% 70%" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="8 12" opacity="0.7" />
          <path d="M-10% 90% C 30% 110%, 70% 70%, 110% 95%" fill="none" stroke="#60a5fa" strokeWidth="0.75" opacity="0.6" />
          
          {/* Decorative small circles */}
          <circle cx="85%" cy="75%" r="60" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
          <circle cx="85%" cy="75%" r="80" fill="none" stroke="#93c5fd" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.6" />
          <circle cx="15%" cy="85%" r="40" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.4" />
          
          {/* Floating plus marks */}
          <path d="M 20% 75% L 22% 75% M 21% 74% L 21% 76%" fill="none" stroke="#64748b" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
          <path d="M 75% 55% L 77% 55% M 76% 54% L 76% 56%" fill="none" stroke="#64748b" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        </svg>
      </div>
      
      <div className="container-main relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          
          {/* Left: Illustration */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center mt-8 md:mt-32"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl aspect-square rounded-[2.5rem] flex items-center justify-center">
              <Image
                src="/images/gambar-2.png"
                alt="Tentang VocaTrack"
                width={600}
                height={600}
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            className="w-full md:w-1/2 lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-neutral-800 leading-tight">
              Kenapa Sih Harus Belajar{" "}
              <br className="hidden sm:block" />
              <span className="text-primary-500">Di VocaTrack?</span>
            </h2>

            <div className="mt-6 space-y-4 text-neutral-500 text-sm sm:text-base leading-relaxed text-justify">
              <p>
                Banyak siswa SMK masih mengalami kebingungan dalam
                menentukan arah karier karena belum memahami hubungan antara
                jurusan yang dipilih, keterampilan yang harus dikuasai, serta
                kebutuhan industri di dunia kerja nyata.
              </p>
              <p>
                VocaTrack hadir sebagai platform navigasi karier berbasis skill-tree
                yang membantu siswa memahami hubungan antara jurusan, skill,
                dan peluang karier secara visual dan terarah.
              </p>
              <p>
                Melalui interaksi materi pembelajaran, sistem rekomendasi, serta
                visualisasi skill roadmap, VocaTrack membantu siswa menemukan potensi
                terbaiknya agar siap menghadapi dunia industri dengan lebih percaya diri.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
