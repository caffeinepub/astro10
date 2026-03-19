import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZODIAC_SIGNS } from "@/data/zodiac";
import { Briefcase, Heart } from "lucide-react";
import { motion } from "motion/react";

function InfinityIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <title>Infinity</title>
      <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z" />
      <path d="M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z" />
    </svg>
  );
}

const PREDICTION_CATEGORIES = [
  {
    id: "love",
    label: "Love",
    icon: <Heart className="w-4 h-4" />,
    heading: "Love & Relationships",
    description:
      "Discover what the stars reveal about your romantic destiny and soul connections.",
    key: "love" as const,
  },
  {
    id: "career",
    label: "Career",
    icon: <Briefcase className="w-4 h-4" />,
    heading: "Career & Success",
    description:
      "Cosmic insights into your professional path, ambitions, and financial prosperity.",
    key: "career" as const,
  },
  {
    id: "life",
    label: "Life",
    icon: <InfinityIcon className="w-4 h-4" />,
    heading: "Life & Destiny",
    description:
      "Your broader life purpose, spiritual growth, and the journey your soul has chosen.",
    key: "life" as const,
  },
];

export function PredictionsSection() {
  return (
    <section id="predictions" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-heading mb-3">
            Cosmic <span>Predictions</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Explore AI-generated predictions for every zodiac sign across the
            three pillars of life.
          </p>
        </motion.div>

        <Tabs defaultValue="love" data-ocid="predictions.tab">
          <TabsList className="flex w-full sm:w-auto mx-auto mb-10 bg-navy-700/50 border border-navy-500 rounded-full p-1 h-auto gap-1">
            {PREDICTION_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-neon data-[state=active]:text-navy-900 data-[state=inactive]:text-muted-foreground"
                data-ocid={`predictions.${cat.id}.tab`}
              >
                {cat.icon}
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {PREDICTION_CATEGORIES.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {cat.heading}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {cat.description}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ZODIAC_SIGNS.map((sign, i) => (
                    <motion.div
                      key={sign.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="card-surface rounded-xl p-5 card-hover"
                      data-ocid={`predictions.item.${i + 1}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                          style={{
                            backgroundColor: `${sign.color}20`,
                            border: `1px solid ${sign.color}40`,
                          }}
                        >
                          {sign.symbol}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            {sign.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {sign.dateRange}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {sign[cat.key]}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
