import { Heart, Shield, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Ancient Wisdom, Modern AI",
    desc: "We blend thousands of years of Vedic astrology with cutting-edge artificial intelligence to deliver readings that resonate deeply.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Instant Cosmic Insights",
    desc: "No waiting, no scheduling. Get personalized readings in seconds, powered by AI trained on vast astrological knowledge.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Private & Confidential",
    desc: "Your birth data and conversations are completely private. We never share your personal information with third parties.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Compassionate Guidance",
    desc: "Our AI Astrologer provides guidance with empathy and nuance, helping you navigate life's complexities with cosmic clarity.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-heading mb-4">
              About <span>Astro10</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Astro10 was born from a simple vision: make ancient astrological
              wisdom accessible to everyone. For centuries, astrology was
              reserved for those with access to learned Jyotishis and the means
              to consult them. We believed that cosmic guidance should be
              available to all — instantly and affordably.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our AI Astrologer is trained on thousands of verified birth charts
              and classical Vedic texts, delivering readings that go far beyond
              sun sign generalizations. At just ₹10 for 5 minutes, we've made
              cosmic clarity accessible to every seeker.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Vedic Astrology",
                "Birth Chart",
                "Kundli",
                "Compatibility",
                "Transit Readings",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-neon/10 text-neon border border-neon-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-surface rounded-xl p-5 card-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon-border text-neon flex items-center justify-center mb-3">
                  {feat.icon}
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-2">
                  {feat.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
