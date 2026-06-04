"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if authentication is complete and user is not logged in
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  // Tampilkan loading screen elegan selama Firebase memeriksa auth
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
          <div className="relative w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-slate-500 font-medium animate-pulse">Memeriksa Autentikasi...</p>
      </div>
    );
  }

  // Jika tidak loading dan user tidak ada, jangan render anak komponen sama sekali (mencegah flicker)
  // Tunggu sampai useEffect di atas memicu redirect.
  if (!user) {
    return null;
  }

  // Jika user valid, tampilkan halamannya
  return <>{children}</>;
}
