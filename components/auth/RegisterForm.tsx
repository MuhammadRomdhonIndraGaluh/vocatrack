"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile, sendEmailVerification, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { saveUserToFirestore, handleGoogleUserFirestore } from "@/lib/userService";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Basic Validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // 1. Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Update display name di Authentication
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // Simpan data user ke Firestore
      await saveUserToFirestore(
        userCredential.user.uid,
        fullName,
        email
      );

      // Kirim email verifikasi
      await sendEmailVerification(userCredential.user);

      // Logout pengguna karena belum verifikasi
      await signOut(auth);

      setSuccessMessage("Registrasi berhasil. Silakan cek email Anda untuk melakukan verifikasi akun sebelum login.");
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      
      // Simpan/Update data user Google ke Firestore
      await handleGoogleUserFirestore(userCredential.user);

      router.push("/");
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      
      if (err.code === 'auth/operation-not-allowed') {
        setError("Login dengan Google belum diaktifkan di Firebase Console.");
      } else {
        setError(err.message || "Gagal masuk dengan Google.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center mb-8 md:mb-12 group">
        <Image
          src="/images/logo-2.png"
          alt="VocaTrack Logo"
          width={400}
          height={120}
          className="w-48 md:w-64 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </Link>

      <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>

      {error && (
        <div className="w-full bg-red-500/20 border border-red-500 text-white text-xs px-4 py-3 rounded-xl mb-4 text-center">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="w-full bg-green-500/20 border border-green-500 text-green-100 text-xs md:text-sm px-4 py-3 rounded-xl mb-4 text-center leading-relaxed">
          {successMessage}
        </div>
      )}

      <form className="w-full space-y-4" onSubmit={handleRegister}>
        {/* Full Name Input */}
        <div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="full name"
            className="w-full px-5 py-3 rounded-full bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email address"
            className="w-full px-5 py-3 rounded-full bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full px-5 py-3 rounded-full bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm pr-12"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
              className="w-full px-5 py-3 rounded-full bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm pr-12"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#1e3a8a] hover:bg-[#172554] disabled:bg-[#1e3a8a]/50 text-white text-sm font-semibold transition-colors shadow-md"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
          
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 rounded-full bg-white hover:bg-gray-50 disabled:bg-gray-200 text-neutral-700 text-sm font-semibold transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
        </div>
      </form>

      <div className="mt-6 text-xs text-white/80">
        Already have an account?{" "}
        <Link href="/signin" className="text-[#FFD15B] font-semibold hover:underline">
          Sign-In
        </Link>
      </div>
    </div>
  );
}
