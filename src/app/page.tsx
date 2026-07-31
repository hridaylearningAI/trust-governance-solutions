import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { FrameworkExplorer } from "@/components/framework-explorer";
import { FrameworksBand } from "@/components/frameworks-band";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { IntegrationsMarquee } from "@/components/integrations-marquee";
import { InteractiveCalculator } from "@/components/interactive-calculator";
import { IntroGate } from "@/components/intro-gate";
import { MotionProvider } from "@/components/motion-provider";
import { ProblemComparison } from "@/components/problem-comparison";
import { ReportSection } from "@/components/report-section";
import { ServicesSection } from "@/components/services-section";
import { StatBanner } from "@/components/stat-banner";

export default function Home() {
  return (
    <IntroGate>
      <MotionProvider />
      <Header />
      <main>
        <Hero />
        <FrameworksBand />
        <ProblemComparison />
        <ServicesSection />
        <FrameworkExplorer />
        <IntegrationsMarquee />
        <InteractiveCalculator />
        <HowItWorks />
        <ReportSection />
        <StatBanner />
        <CtaSection />
      </main>
      <Footer />
    </IntroGate>
  );
}
