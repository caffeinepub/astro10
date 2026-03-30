import { ChevronDown, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { StarField } from "./StarField";

export function HeroSection() {
  const scrollToChat = () => {
    document.querySelector("#chat")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToHoroscope = () => {
    document
      .querySelector("#horoscope")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <StarField />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,255,204,0.04) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 50% 100%, rgba(5,7,13,0.8) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-border bg-neon/5 text-neon text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI-ఆధారిత వేద జ్యోతిష్యం</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
        >
          వేద జ్యోతిష్యుడితో మాట్లాడండి
          <br />
          <span className="gradient-text">మొదటి ప్రశ్న ఉచితం</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          మీ జన్మ చార్ట్ ఆధారంగా వ్యక్తిగతీకరించిన రీడింగ్‌లతో మీ విశ్వ విధిని తెలుసుకోండి. ప్రేమ, వృత్తి మరియు
          జీవితంపై తక్షణ అంతర్దృష్టులు పొందండి — వేల సంవత్సరాల వేద జ్ఞానం ఆధారంగా.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            type="button"
            onClick={scrollToChat}
            className="btn-neon px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2 justify-center"
            data-ocid="hero.primary_button"
          >
            <Sparkles className="w-5 h-5" />
            ఉచిత చాట్ ప్రారంభించండి
          </button>
          <button
            type="button"
            onClick={scrollToHoroscope}
            className="btn-outline-neon px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2 justify-center"
            data-ocid="hero.secondary_button"
          >
            రాశిఫలాలు చూడండి
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { value: "50K+", label: "రీడింగ్‌లు పూర్తయ్యాయి" },
            { value: "4.9★", label: "సగటు రేటింగ్" },
            { value: "12", label: "రాశి చిహ్నాలు" },
            { value: "₹100", label: "ప్రీమియం ప్లాన్" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-neon">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <button
        type="button"
        onClick={scrollToChat}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-neon transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
