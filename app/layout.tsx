import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import { AuthProvider } from "@/context/AuthContext";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VocaTrack — Peta Skill untuk Masa Depan Kariermu",
  description:
    "Platform navigasi karier interaktif berbasis skill-tree untuk siswa SMK. Temukan jurusan, kuasai skill, dan raih profesi impianmu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${lexend.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">
        <AuthProvider>
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
