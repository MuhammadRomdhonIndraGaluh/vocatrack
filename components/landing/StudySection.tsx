"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Search, 
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { majors } from "@/lib/data/majors";
import { careerData } from "@/lib/data/professions";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function StudySection() {
  const { user } = useAuth();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [popupStep, setPopupStep] = useState(1);
  const [professionSearch, setProfessionSearch] = useState("");
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setItemsPerPage(mobile ? 6 : 12);
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentMajorData = useMemo(() => {
    return majors.find(m => m.id === selectedMajor) || null;
  }, [selectedMajor]);

  const filteredProfessions = useMemo(() => {
    const rawProfessions = selectedMajor && careerData[selectedMajor] 
      ? careerData[selectedMajor] 
      : careerData["default"] || [];
    return rawProfessions.filter(p => p.toLowerCase().includes(professionSearch.toLowerCase()));
  }, [professionSearch, selectedMajor]);

  // Filter majors based on search query
  const filteredMajors = useMemo(() => {
    return majors.filter((major) => 
      major.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      major.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Reset pagination to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredMajors.length / itemsPerPage) || 1;

  // Slice majors for current page
  const paginatedMajors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMajors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMajors, currentPage, itemsPerPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleMajorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setSelectedMajor(id);
    setPopupStep(1);
    setProfessionSearch("");
    setSelectedProfession(null);
  };

  const handleCloseModal = () => {
    setSelectedMajor(null);
    setTimeout(() => {
      setPopupStep(1);
      setProfessionSearch("");
      setSelectedProfession(null);
    }, 300);
  };

  return (
    <section id="study" className="relative py-16 md:py-24 bg-gradient-to-b from-blue-50/50 via-blue-100/80 to-blue-200 overflow-hidden font-sans">
      {/* Elegant & Visible Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Glowing Orbs for subtle color injections */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-300/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-blue-400/40 rounded-full blur-[120px]" />
        
        {/* Rich & Elegant Geometric Accents */}
        <svg className="absolute w-full h-full opacity-80 translate-y-6 md:translate-y-10" xmlns="http://www.w3.org/2000/svg">
          {/* Dot Grid Pattern for technical feel */}
          <pattern id="dot-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#3b82f6" opacity="0.15" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />

          {/* Straight Tech Lines */}
          <line x1="0" y1="15%" x2="100%" y2="15%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="12 12" opacity="0.15" />
          <line x1="0" y1="85%" x2="100%" y2="85%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="12 12" opacity="0.15" />
          <line x1="15%" y1="0" x2="15%" y2="100%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="6 8" opacity="0.15" />
          <line x1="85%" y1="0" x2="85%" y2="100%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="6 8" opacity="0.15" />

          {/* Diagonal Tracking Lines */}
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="20 20" opacity="0.1" />
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="20 20" opacity="0.1" />

          {/* Elegant intersecting curves */}
          <path d="M -10% 20% C 30% -10%, 70% 40%, 110% 10%" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.2" />
          <path d="M -10% 40% C 40% 20%, 60% 80%, 110% 50%" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 6" opacity="0.15" />
          <path d="M -10% 80% C 40% 110%, 60% 50%, 110% 90%" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.15" />
          
          {/* Large decorative circles (Rings) */}
          <circle cx="15%" cy="75%" r="80" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.15" />
          <circle cx="15%" cy="75%" r="120" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.15" />
          <circle cx="90%" cy="25%" r="100" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.15" />
          <circle cx="90%" cy="25%" r="140" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.15" />

          {/* Tech/Study inspired connecting nodes */}
          {/* Network 1 (Left) */}
          <circle cx="10%" cy="30%" r="4" fill="#3b82f6" opacity="0.25" />
          <circle cx="25%" cy="15%" r="6" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.25" />
          <circle cx="35%" cy="35%" r="3" fill="#3b82f6" opacity="0.2" />
          <path d="M 10% 30% L 25% 15% L 35% 35%" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />
          
          {/* Network 2 (Right) */}
          <circle cx="85%" cy="70%" r="5" fill="#3b82f6" opacity="0.25" />
          <circle cx="70%" cy="85%" r="8" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.25" />
          <circle cx="92%" cy="90%" r="3" fill="#3b82f6" opacity="0.25" />
          <path d="M 85% 70% L 70% 85% M 85% 70% L 92% 90%" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />

          {/* Floating Accents */}
          <path d="M 50% 10% L 52% 10% M 51% 9% L 51% 11%" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
          <path d="M 80% 40% L 82% 40% M 81% 39% L 81% 41%" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
          <circle cx="45%" cy="85%" r="2" fill="#3b82f6" opacity="0.25" />
          <circle cx="65%" cy="20%" r="2" fill="#3b82f6" opacity="0.25" />
        </svg>
      </div>

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 leading-tight">
            Pilih <span className="text-blue-500">Jurusanmu</span>, Tentukan Arah <span className="text-blue-500">Kariermu</span>
          </h2>
          <p className="mt-4 text-neutral-700 text-sm sm:text-base">
            Temukan jurusan yang sesuai denganmu dan lihat peluang karier, skill yang dibutuhkan, serta jalur belajar yang harus kamu tempuh.
          </p>

          {/* Search Box */}
          <div className="mt-6 md:mt-8 relative max-w-xl mx-auto flex items-center bg-white rounded-full shadow-md p-1.5 pl-3 sm:pl-4 border border-white/40">
            <Search size={18} className="text-blue-500 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isMobile ? "Cari jurusan..." : "Cari jurusan yang kamu minati..."}
              className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm focus:outline-none text-neutral-700 placeholder-neutral-400 truncate"
            />
            <button className="bg-blue-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-600 transition-colors shrink-0 ml-1">
              Search
            </button>
          </div>
        </div>

        {/* Majors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto content-start">
          {paginatedMajors.length > 0 ? (
            paginatedMajors.map((major) => (
            <a
              key={major.id}
              href={`/jurusan/${major.id}`}
              onClick={(e) => handleMajorClick(e, major.id)}
              className="group flex items-center px-5 py-4 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-blue-100 cursor-pointer"
            >
              <div className="text-blue-500 mr-4 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-300">
                <major.icon size={26} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-neutral-800 leading-none group-hover:text-blue-500 transition-colors duration-300">
                  {major.title}
                </h3>
                <p className="text-[11px] text-neutral-500 mt-1 leading-none">
                  {major.desc}
                </p>
              </div>
            </a>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12 text-neutral-500">
              Tidak ada jurusan yang cocok dengan pencarianmu.
            </div>
          )}
        </div>

        {/* Pagination Arrows */}
        {totalPages > 1 && (
          <div className="mt-[60px] flex justify-center items-center gap-3">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm border border-transparent hover:border-blue-100 ${
                currentPage === 1 
                  ? "bg-white/60 text-blue-300 cursor-not-allowed border-transparent" 
                  : "bg-white text-blue-500 hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-sm font-medium text-white/90 px-2">
              Page {currentPage} of {totalPages}
            </div>
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm border border-transparent hover:border-blue-100 ${
                currentPage === totalPages 
                  ? "bg-white/60 text-blue-300 cursor-not-allowed border-transparent" 
                  : "bg-white text-blue-500 hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Career Target Popup Modal */}
      <AnimatePresence>
        {selectedMajor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={handleCloseModal}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 text-neutral-400 hover:text-neutral-600 transition-colors p-2"
                aria-label="Close modal"
              >
                <X size={24} strokeWidth={2.5} />
              </button>

              {/* Header */}
              <div className="pt-8 pb-4 px-6 text-center">
                <h3 className="text-xl md:text-2xl font-extrabold text-blue-500 mb-1">
                  SATU LANGKAH LAGI!
                </h3>
                <p className="text-sm md:text-base text-neutral-600 font-medium">
                  Apakah kamu sudah punya target karier impianmu?
                </p>
              </div>

              {/* Options Grid / Step Content */}
              <div className="px-6 pb-8 pt-2">
                {popupStep === 1 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {/* Option 1: Sudah Punya Target */}
                    <div 
                      className="group relative flex flex-col items-center bg-white border border-blue-200 hover:border-blue-500 rounded-2xl p-4 md:p-5 cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1"
                      onClick={() => setPopupStep(2)}
                    >
                      <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden bg-blue-50/50">
                        <div className="absolute inset-0 translate-y-6 scale-[1.25]">
                          <Image
                            src="/images/popup-1.png"
                            alt="Sudah Punya Target"
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        {/* White Fade Effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
                      </div>
                      <div className="w-full bg-blue-500 text-white text-center py-2 md:py-2.5 rounded-lg font-bold text-sm md:text-base mb-3 group-hover:bg-blue-500 transition-colors">
                        Sudah Punya Target!
                      </div>
                      <p className="text-[11px] md:text-xs text-neutral-600 text-center leading-relaxed px-1">
                        Saya sudah tahu ingin bekerja sebagai apa, bantu saya buatkan jalurnya.
                      </p>
                    </div>

                    {/* Option 2: Eksplorasi & Temukan */}
                    <div 
                      className="group relative flex flex-col items-center bg-white border border-blue-200 hover:border-blue-500 rounded-2xl p-4 md:p-5 cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1"
                      onClick={async () => {
                        if (user) {
                          try {
                            await updateDoc(doc(db, "users", user.uid), { jurusan: selectedMajor });
                          } catch (e) {
                            console.error("Gagal menyimpan jurusan", e);
                          }
                        }
                        router.push(`/explore?major=${selectedMajor}`);
                      }}
                    >
                      <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden bg-blue-50/50">
                        <div className="absolute inset-0 translate-y-6 scale-[1.15]">
                          <Image
                            src="/images/popup-2.png"
                            alt="Eksplorasi & Temukan"
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        {/* White Fade Effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
                      </div>
                      <div className="w-full bg-blue-500 text-white text-center py-2 md:py-2.5 rounded-lg font-bold text-sm md:text-base mb-3 group-hover:bg-blue-500 transition-colors">
                        Eksplorasi & Temukan
                      </div>
                      <p className="text-[11px] md:text-xs text-neutral-600 text-center leading-relaxed px-1">
                        Saya masih bingung. Biarkan AI VocaTrack menganalisis potensiku seiring aku belajar.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-full">
                    {/* Left Column: Static Option 1 Card */}
                    <div className="relative flex flex-col items-center bg-white border border-blue-200 rounded-2xl p-4 md:p-5">
                      <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden bg-blue-50/50">
                        <div className="absolute inset-0 translate-y-6 scale-[1.25]">
                          <Image
                            src="/images/popup-1.png"
                            alt="Sudah Punya Target"
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
                      </div>
                      <div className="w-full bg-blue-500 text-white text-center py-2 md:py-2.5 rounded-lg font-bold text-sm md:text-base mb-3">
                        Sudah Punya Target!
                      </div>
                      <p className="text-[11px] md:text-xs text-neutral-600 text-center leading-relaxed px-1">
                        Saya sudah tahu ingin bekerja sebagai apa, bantu saya buatkan jalurnya.
                      </p>
                    </div>

                    {/* Right Column: Profession Selection */}
                    <div className="flex flex-col h-full">
                      {/* Major Badge */}
                      <div className="self-center md:self-start bg-blue-500 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm inline-flex items-center shrink-0">
                        {currentMajorData ? currentMajorData.title : 'JURUSAN'}
                      </div>

                      {/* Search Bar */}
                      <div className="relative mb-4 shrink-0">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                        <input
                          type="text"
                          value={professionSearch}
                          onChange={(e) => setProfessionSearch(e.target.value)}
                          placeholder="Cari profesi..."
                          className="w-full bg-white border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-full pl-9 pr-4 py-2 text-sm text-neutral-700 placeholder-neutral-400 transition-all outline-none"
                        />
                      </div>

                      {/* Scrollable Profession List */}
                      <div className="relative flex-1 min-h-[200px]">
                        <div className="absolute inset-0 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-2">
                          {filteredProfessions.length > 0 ? (
                            filteredProfessions.map((profession, index) => (
                              <button
                                key={index}
                                onClick={async () => {
                                  setSelectedProfession(profession);
                                  if (user) {
                                    try {
                                      await updateDoc(doc(db, "users", user.uid), { jurusan: selectedMajor });
                                    } catch (e) {
                                      console.error("Gagal menyimpan jurusan", e);
                                    }
                                  }
                                  router.push(`/roadmap?major=${selectedMajor}&profession=${encodeURIComponent(profession)}`);
                                }}
                                className={`w-full text-left px-4 py-2.5 rounded-xl border transition-all text-sm font-medium shrink-0 ${
                                  selectedProfession === profession
                                    ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                                    : "bg-white border-blue-100 text-blue-500 hover:border-blue-300 hover:bg-blue-50/50"
                                }`}
                              >
                                {profession}
                              </button>
                            ))
                          ) : (
                            <div className="text-center py-8 text-neutral-400 text-sm">
                              Profesi tidak ditemukan
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
