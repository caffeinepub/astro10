import { AboutSection } from "@/components/AboutSection";
import { ChatSection } from "@/components/ChatSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HoroscopeSection } from "@/components/HoroscopeSection";
import { PredictionsSection } from "@/components/PredictionsSection";
import { PricingSection } from "@/components/PricingSection";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen font-jakarta">
        <Header />
        <main>
          <HeroSection />
          <HoroscopeSection />
          <ChatSection />
          <PredictionsSection />
          <PricingSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
