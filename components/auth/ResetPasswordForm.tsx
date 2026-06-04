"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "@/lib/firebase";

function ResetPasswordFormContent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validCode, setValidCode] = useState<boolean | null>(null);
  
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then(() => setValidCode(true))
        .catch(() => {
          setValidCode(false);
          setError("Tautan reset password tidak valid atau sudah kedaluwarsa.");
        });
    } else {
      setValidCode(false);
      setError("Kode otorisasi (oobCode) tidak ditemukan.");
    }
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password minimal harus 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    if (!oobCode) return;

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Gagal mengatur ulang password.");
    } finally {
      setLoading(false);
    }
  };

  if (validCode === null) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mb-4"></div>
        <p className="text-white/80 text-sm">Memverifikasi tautan...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle2 size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Password Berhasil Diubah!</h2>
        <p className="text-neutral-200 text-sm mb-8 leading-relaxed">
          Akun Anda sekarang telah dilindungi dengan password baru. Silakan masuk kembali.
        </p>
        <Link
          href="/signin"
          className="w-full py-3 rounded-full bg-white hover:bg-slate-100 text-[#1e3a8a] text-sm font-bold transition-colors flex items-center justify-center shadow-lg"
        >
          Lanjut ke Halaman Sign-In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center mb-8 md:mb-10 group">
        <Image src="/images/logo-2.png" alt="VocaTrack Logo" width={400} height={120} className="w-48 md:w-64 h-auto object-contain transition-transform duration-300 group-hover:scale-105" priority />
      </Link>

      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-3">Buat Password Baru</h2>
        <p className="text-neutral-200 text-sm">
          Masukkan password baru yang kuat untuk mengamankan akun VocaTrack Anda.
        </p>
      </div>

      {error && (
        <div className="w-full bg-red-500/20 border border-red-500 text-white text-xs px-4 py-2 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      {validCode && (
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password baru"
                className="w-full px-5 py-3 rounded-full bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm pr-12"
                required
                minLength={8}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Konfirmasi password baru"
                className="w-full px-5 py-3 rounded-full bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm pr-12"
                required
                minLength={8}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none">
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#1e3a8a] hover:bg-[#172554] disabled:bg-[#1e3a8a]/50 text-white text-sm font-bold transition-colors shadow-md"
            >
              {loading ? "Menyimpan..." : "Simpan Password Baru"}
            </button>
          </div>
        </form>
      )}

      {!validCode && (
        <div className="mt-4">
          <Link href="/forgot-password" className="text-white hover:underline text-sm font-semibold">
            Minta Tautan Reset Baru
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<div className="w-full flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div></div>}>
      <ResetPasswordFormContent />
    </Suspense>
  );
}
