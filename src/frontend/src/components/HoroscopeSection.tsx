import { ZODIAC_SIGNS } from "@/data/zodiac";
import { motion } from "motion/react";

export function HoroscopeSection() {
  return (
    <section id="horoscope" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-border bg-neon/5 text-neon text-sm font-medium mb-4">
            Today's Cosmic Energy
          </div>
          <h2 className="section-heading mb-3">
            Daily <span>Horoscope</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            AI-powered daily readings for all 12 zodiac signs. Discover what the
            cosmos has in store for you today.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {ZODIAC_SIGNS.map((sign, i) => (
            <motion.div
              key={sign.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card-surface rounded-xl p-5 card-hover group cursor-pointer"
              data-ocid={`horoscope.item.${i + 1}`}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto transition-all group-hover:scale-110"
                style={{
                  backgroundColor: `${sign.color}15`,
                  border: `1px solid ${sign.color}30`,
                  boxShadow: `0 0 12px ${sign.color}15`,
                }}
              >
                {sign.symbol}
              </div>
              <h3 className="font-semibold text-foreground text-sm text-center mb-0.5">
                {sign.name}
              </h3>
              <p className="text-xs text-muted-foreground text-center mb-3">
                {sign.dateRange}
              </p>
              <div
                className="text-xs px-2 py-0.5 rounded-full text-center font-medium mb-3 w-fit mx-auto"
                style={{
                  backgroundColor: `${sign.color}15`,
                  color: sign.color,
                  border: `1px solid ${sign.color}25`,
                }}
              >
                {sign.element}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {sign.horoscope}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
