import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import StudySection from "@/components/landing/StudySection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <StudySection />
      </main>
      <Footer />
    </>
  );
}
