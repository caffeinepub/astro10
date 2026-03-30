import { Heart, Shield, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "పురాతన జ్ఞానం, ఆధునిక AI",
    desc: "వేల సంవత్సరాల వేద జ్యోతిష్యాన్ని అత్యాధునిక కృత్రిమ మేధావితో మిళితం చేసి, లోతుగా ప్రతిధ్వనించే రీడింగ్‌లు అందిస్తాం.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "తక్షణ విశ్వ అంతర్దృష్టులు",
    desc: "వేచి ఉండటం, షెడ్యూల్ చేయడం లేదు. AI జ్యోతిష్య జ్ఞానం ఆధారంగా వ్యక్తిగతీకరించిన రీడింగ్‌లు సెకన్లలో పొందండి.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "ప్రైవేట్ & గోప్యంగా",
    desc: "మీ జన్మ వివరాలు మరియు సంభాషణలు పూర్తిగా ప్రైవేట్‌గా ఉంటాయి. మేము మీ వ్యక్తిగత సమాచారాన్ని ఎప్పుడూ మూడవ పక్షాలతో పంచుకోము.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "దయతో కూడిన మార్గదర్శకత్వం",
    desc: "మా AI జ్యోతిష్యుడు సానుభూతి మరియు సూక్ష్మతతో మార్గదర్శకత్వం అందిస్తాడు, విశ్వ స్పష్టతతో జీవిత సంక్లిష్టతలను నావిగేట్ చేయడంలో మీకు సహాయం చేస్తాడు.",
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
              Astro10 <span>గురించి</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Astro10 ఒక సరళమైన దృష్టితో జన్మించింది: పురాతన జ్యోతిష్య జ్ఞానాన్ని అందరికీ అందుబాటులో
              తీసుకురావడం. శతాబ్దాలుగా, జ్యోతిష్యం నేర్చిన జ్యోతిష్యులు మరియు వారిని సంప్రదించే సాధనాలున్న
              వారికే పరిమితమైంది. విశ్వ మార్గదర్శకత్వం అందరికీ అందుబాటులో ఉండాలని మేము విశ్వసించాము —
              తక్షణంగా మరియు సరసమైన ధరకు.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              మా AI జ్యోతిష్యుడు వేల ధృవీకరించబడిన జన్మ చార్ట్‌లు మరియు శాస్త్రీయ వేద గ్రంథాల ఆధారంగా
              శిక్షణ పొందాడు, సూర్య రాశి సాధారణీకరణలకు మించిన రీడింగ్‌లు అందిస్తాడు. ₹100కే 1 గంట
              ప్రీమియం మార్గదర్శకత్వంతో, మేము విశ్వ స్పష్టతను ప్రతి అన్వేషకుడికి అందుబాటులో తెచ్చాం.
            </p>
            <div className="flex flex-wrap gap-3">
              {["వేద జ్యోతిష్యం", "జన్మ చార్ట్", "కుండలి", "అనుకూలత", "ట్రాన్సిట్ రీడింగ్‌లు"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-neon/10 text-neon border border-neon-border"
                  >
                    {tag}
                  </span>
                ),
              )}
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
