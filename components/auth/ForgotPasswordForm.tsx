"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email wajib diisi");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Masukkan alamat email yang valid");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      console.error("Reset Password Error:", err);
      if (err.code === 'auth/user-not-found') {
        setError("Alamat email tidak terdaftar di sistem kami.");
      } else {
        setError(err.message || "Gagal mengirim link reset password. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle2 size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Email Terkirim</h2>
        <p className="text-neutral-200 text-sm mb-8 leading-relaxed">
          Jika email yang Anda masukkan terdaftar di VocaTrack, kami akan mengirimkan tautan untuk mengatur ulang password Anda.
        </p>
        <Link
          href="/signin"
          className="w-full py-3 rounded-full border-2 border-white/20 hover:bg-white/10 text-white text-sm font-semibold transition-colors flex items-center justify-center"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center mb-8 md:mb-10 group">
        <Image
          src="/images/logo-2.png"
          alt="VocaTrack Logo"
          width={400}
          height={120}
          className="w-48 md:w-64 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </Link>

      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-3">Forgot Password?</h2>
        <p className="text-neutral-200 text-sm">
          Masukkan alamat email yang terdaftar pada akun VocaTrack. Kami akan mengirimkan tautan untuk mengatur ulang password Anda.
        </p>
      </div>

      {error && (
        <div className="w-full bg-red-500/20 border border-red-500 text-white text-xs px-4 py-2 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        {/* Email Input */}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-5 py-3 rounded-full bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />
        </div>

        {/* Buttons */}
        <div className="pt-4 space-y-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#1e3a8a] hover:bg-[#172554] disabled:bg-[#1e3a8a]/50 text-white text-sm font-semibold transition-colors shadow-md"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </form>

      <div className="mt-8 text-sm text-white/80">
        <Link href="/signin" className="font-semibold hover:text-white transition-colors">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
