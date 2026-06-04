import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary-500 text-white py-12 md:py-16">
      <div className="container-main">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4 text-center md:text-left">
          
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start max-w-xs">
            <Link href="/" className="flex items-center group mb-2">
              <Image 
                src="/images/logo-1.png" 
                alt="VocaTrack Logo" 
                width={125} 
                height={34} 
                className="h-[30px] md:h-[34px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-white/80 text-sm leading-snug">
              Peta Skill untuk Masa<br />Depan Kariermu.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-2">
              <Link href="#home" className="text-sm font-medium text-white/90 hover:text-white hover:underline underline-offset-4 transition-all">
                Home
              </Link>
              <Link href="#about" className="text-sm font-medium text-white/90 hover:text-white hover:underline underline-offset-4 transition-all">
                About
              </Link>
              <Link href="#study" className="text-sm font-medium text-white/90 hover:text-white hover:underline underline-offset-4 transition-all">
                Study
              </Link>
              <a href="https://wa.me/6289519444728" target="_blank" rel="noreferrer" className="text-sm font-medium text-white/90 hover:text-white hover:underline underline-offset-4 transition-all">
                Contact
              </a>
            </div>
          </div>

          {/* Social Media Column */}
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm font-medium text-white mb-4">Follow Us In :</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/vocatrack" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-transform hover:scale-110" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://www.instagram.com/galuh.ind/" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-transform hover:scale-110" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.youtube.com/@galuhkun7905" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-transform hover:scale-110" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="https://facebook.com/vocatrack" target="_blank" rel="noreferrer" className="text-white/90 hover:text-white transition-transform hover:scale-110" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
