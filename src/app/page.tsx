import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { FrameworksBand } from "@/components/frameworks-band";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { MotionProvider } from "@/components/motion-provider";
import { ProblemSection } from "@/components/problem-section";
import { ReportSection } from "@/components/report-section";
import { StatBanner } from "@/components/stat-banner";

export default function Home() {
  return (
    <>
      <MotionProvider />
      <Header />
      <main>
        <Hero />
        <FrameworksBand />
        <ProblemSection />
        <HowItWorks />
        <ReportSection />
        <StatBanner />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
