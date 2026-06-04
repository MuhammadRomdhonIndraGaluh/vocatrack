import { Metadata } from "next";
import AuthSlider from "@/components/auth/AuthSlider";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In - VocaTrack",
  description: "Masuk ke akun VocaTrack Anda untuk mulai merencanakan karier.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-blue-400 via-blue-500 to-blue-500 overflow-hidden relative">
      
      {/* Decorative Grid/Lines for Left Panel (Optional global background) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="zigzag" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 100 L50 0 L100 100" stroke="white" strokeWidth="1" fill="none" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#zigzag)" />
        </svg>
      </div>

      {/* Left Panel - Slider */}
      <section className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative flex items-center justify-center p-4 lg:p-8 z-10">
        <AuthSlider />
      </section>

      {/* Kanan: Form (Pindah ke kiri di mobile) */}
      <section className="w-full md:w-1/2 bg-blue-500/95 backdrop-blur-md md:rounded-l-[3rem] shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.1)] relative flex items-center justify-center p-8 md:p-12 lg:p-24 overflow-hidden z-20">
        
        {/* Topographic Background Pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="topography" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M0 60 Q 30 30, 60 60 T 120 60 M0 120 Q 30 90, 60 120 T 120 120 M0 0 Q 30 -30, 60 0 T 120 0" fill="none" stroke="white" strokeWidth="1" opacity="0.6"/>
                <path d="M0 30 Q 30 0, 60 30 T 120 30 M0 90 Q 30 60, 60 90 T 120 90" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#topography)" />
          </svg>
        </div>

        <div className="relative z-10 w-full">
          <LoginForm />
        </div>
      </section>
      
    </main>
  );
}
