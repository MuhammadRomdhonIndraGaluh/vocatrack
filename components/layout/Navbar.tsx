"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User as UserIcon, LogOut, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Study", href: "#study" },
  { label: "Contact", href: "#contact", external: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external) {
      e.preventDefault();
      window.open("https://wa.me/6289519444728", "_blank");
      return;
    }

    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/${href}`;
      }
    }

    setIsMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMobileOpen
          ? "bg-blue-500 shadow-lg"
          : isScrolled
          ? "bg-primary-500/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center">
              <Image 
                src="/images/logo-1.png" 
                alt="VocaTrack Logo" 
                width={120} 
                height={36} 
                className="h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.external)}
                className={`relative text-sm font-medium transition-all duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Login Button / User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {!loading && !user && (
              <Link
                href="/signin"
                className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-white border-2 border-white rounded-full transition-all duration-200 hover:bg-white hover:text-primary-500"
              >
                Login
              </Link>
            )}
            {!loading && user && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center overflow-hidden">
                    {user.photoURL ? (
                      <Image src={user.photoURL} alt="Avatar" width={24} height={24} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon size={14} className="text-white" />
                    )}
                  </div>
                  <span className="truncate max-w-[100px]">{user.displayName || user.email?.split("@")[0] || "User"}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 overflow-hidden border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                    </div>
                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                      <UserIcon size={16} /> Pengaturan Akun
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white p-2"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-[72px] left-0 right-0 bg-blue-500 shadow-2xl transition-all duration-300 border-t border-white/10 ${
          isMobileOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container-main py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.external)}
              className={`text-base font-medium py-2 transition-colors ${
                activeSection === link.href.replace("#", "")
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          {!loading && !user && (
            <Link
              href="/signin"
              className="inline-flex items-center justify-center px-6 py-2.5 mt-2 text-sm font-semibold text-primary-500 bg-white rounded-full transition-all duration-200 hover:bg-white/90"
              onClick={() => setIsMobileOpen(false)}
            >
              Login
            </Link>
          )}
          {!loading && user && (
            <div className="mt-2 pt-4 border-t border-white/20 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center overflow-hidden">
                  {user.photoURL ? (
                    <Image src={user.photoURL} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={20} className="text-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{user.displayName || "User"}</p>
                  <p className="text-xs text-white/70 truncate max-w-[200px]">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <Link
                  href="/profile"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <UserIcon size={18} /> Pengaturan Akun
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 mt-2 text-sm font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
