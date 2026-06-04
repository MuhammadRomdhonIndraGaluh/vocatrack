import { Network, Target, BookOpen } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Skill Tree Interaktif",
    description:
      "Visualisasi skill secara bertahap sesuai kebutuhan industri agar belajar lebih terarah.",
  },
  {
    icon: Target,
    title: "Rekomendasi Personal",
    description:
      "Sistem rekomendasi jurusan dan karier berdasarkan minat, kompetensi, dan tujuanmu.",
  },
  {
    icon: BookOpen,
    title: "Materi Terstruktur",
    description:
      "Materi pembelajaran disusun secara sistematis dan relevan dengan dunia kerja.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-blue-100 to-white relative overflow-hidden font-sans">
      {/* Dekorasi Background Geometris (Subtle) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Grid Geometris */}
        <svg className="absolute w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="feature-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="0.5"/>
            </pattern>
            {/* Linear gradient mask to fade out the grid at the bottom */}
            <linearGradient id="fade-bottom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="black" />
              <stop offset="60%" stopColor="black" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#feature-grid)" mask="url(#fade-bottom)" />
          {/* Elemen Floating */}
          <circle cx="10%" cy="20%" r="6" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.5" />
          <circle cx="90%" cy="80%" r="4" fill="#64748b" opacity="0.3" />
          <path d="M 85% 15% L 87% 15% M 86% 14% L 86% 16%" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>

      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-800 leading-tight">
            <span className="text-blue-500">Fitur</span> Utama Apa Aja Sih Yang Ada <span className="text-blue-500">Di Voca Track?</span>
          </h2>
          <p className="mt-4 text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto">
            VocaTrack punya fitur-fitur yang bantu kamu belajar lebih terarah dan memahami karier yang cocok buat kamu.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-6xl mx-auto px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-6">
                <feature.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-blue-500 mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
