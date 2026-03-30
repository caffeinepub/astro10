import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type ZodiacSign, getZodiacFromDate } from "@/data/zodiac";
import {
  Bot,
  CheckCircle,
  Clock,
  Crown,
  ImageUp,
  Loader2,
  Lock,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
}

const PREMIUM_SECONDS = 60 * 60; // 1 hour
const PREMIUM_RAZORPAY_URL =
  "https://razorpay.me/@jittaboinaajay?amount=CVDUr6Uxp2FOGZGwAHntNg%3D%3D";

const teluguResponses = [
  "మీ నక్షత్రాలు చాలా శుభంగా ఉన్నాయి. ఈ వారం మీకు మంచి అవకాశాలు వస్తాయి. ✨",
  "గురుడు మీకు అనుకూలంగా ఉన్నాడు. ప్రేమ విషయంలో మంచి మార్పులు వస్తాయి. 💫",
  "శని మీ జీవితంలో క్రమశిక్షణను తీసుకొస్తున్నాడు. సహనం వహించండి. 🌟",
  "మీ కెరీర్‌లో కొత్త అవకాశాలు వస్తున్నాయి. సాహసంగా ముందుకు వెళ్ళండి. 🚀",
  "ఈ నెల మీ ఆర్థిక పరిస్థితి మెరుగుపడుతుంది. పొదుపుగా ఉండండి. 💰",
  "మీ ఆరోగ్యం విషయంలో జాగ్రత్తగా ఉండండి. ధ్యానం చేయండి. 🌙",
];

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0)
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function nowTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getFreeAIResponse(zodiac: ZodiacSign, message: string): string {
  const msg = message.toLowerCase();
  let hint = "";
  if (
    msg.includes("love") ||
    msg.includes("ప్రేమ") ||
    msg.includes("marriage") ||
    msg.includes("పెళ్ళి") ||
    msg.includes("relationship")
  ) {
    hint = `మీ ప్రేమ జీవితంలో గురుడి ప్రభావం కనిపిస్తోంది. సానుకూల మార్పులు రానున్నాయి, ${zodiac.name} రాశి మీకు అనుకూలంగా ఉంది. అయితే పూర్తి వివరాల కోసం...`;
  } else if (
    msg.includes("career") ||
    msg.includes("job") ||
    msg.includes("వృత్తి") ||
    msg.includes("ఉద్యోగం") ||
    msg.includes("work") ||
    msg.includes("business")
  ) {
    hint = `మీ వృత్తిలో కొత్త అవకాశాలు వస్తున్నాయి. గ్రహ స్థితి మీకు అనుకూలంగా ఉంది, ${zodiac.name} రాశి వారికి ఈ సమయంలో మంచి ఫలితాలు వస్తాయి. అయితే సంపూర్ణ విశ్లేషణ కోసం...`;
  } else if (
    msg.includes("money") ||
    msg.includes("finance") ||
    msg.includes("ధనం") ||
    msg.includes("డబ్బు") ||
    msg.includes("wealth")
  ) {
    hint = `ఆర్థిక విషయంలో మెరుగుదల వస్తోంది. శని మీకు క్రమంగా ఫలితాలు ఇస్తున్నాడు, ${zodiac.name} రాశి వారికి ఆర్థిక స్థిరత్వం వస్తుంది. అయితే లోతైన జోస్యం కోసం...`;
  } else if (
    msg.includes("health") ||
    msg.includes("ఆరోగ్యం") ||
    msg.includes("sick") ||
    msg.includes("అనారోగ్యం")
  ) {
    hint = `మీ ఆరోగ్యంలో జాగ్రత్త అవసరం. నక్షత్రాల సూచన ధ్యానం మరియు సకారాత్మక అలవాట్లు పాటించమని, ${zodiac.name} రాశి వారికి ఈ సమయంలో ఆత్మబలం అవసరం. అయితే పూర్తి వివరాల కోసం...`;
  } else {
    hint = `మీ నక్షత్రాల ఆధారంగా ఈ సమయంలో మీకు మంచి ఫలితాలు వస్తాయి. ${zodiac.name} రాశి మీకు అనుకూలంగా ఉంది. లోతైన విశ్లేషణ కోసం...`;
  }
  return `${hint}\n\nసంపూర్ణ జ్యోతిష్య విశ్లేషణ, నివారణ చర్యలు మరియు భవిష్యత్తు అంచనాల కోసం Premium కి upgrade చేయండి (₹100 / 1 గంట).`;
}

export function ChatSection() {
  const [phase, setPhase] = useState<
    "form" | "chat" | "premium_payment" | "premium_screenshot"
  >("form");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [pob, setPob] = useState("");
  const [zodiac, setZodiac] = useState<ZodiacSign | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [freeQuestionUsed, setFreeQuestionUsed] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(PREMIUM_SECONDS);
  const [timerActive, setTimerActive] = useState(false);
  const [showRecharge, setShowRecharge] = useState(false);
  const [premiumPaymentOpened, setPremiumPaymentOpened] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(
    null,
  );
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [rechargeOpened, setRechargeOpened] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scrollTick, setScrollTick] = useState(0);

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setTimerActive(false);
            setShowRecharge(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  useEffect(() => {
    if (scrollTick === 0) return;
    if (!userScrolledUp.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [scrollTick]);

  const triggerScroll = () => setScrollTick((n) => n + 1);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
    userScrolledUp.current = !atBottom;
  };

  const startChat = () => {
    if (!dob) return;
    const date = new Date(dob);
    const sign = getZodiacFromDate(date.getMonth() + 1, date.getDate());
    setZodiac(sign);
    const greeting: ChatMessage = {
      id: "intro",
      role: "ai",
      text: `నమస్కారం! ✨ మీ జన్మ చార్ట్‌లో ${sign.name} ${sign.symbol} యొక్క విశ్వ శక్తిని అనుభవిస్తున్నాను. ${sign.element} మూలకం కింద జన్మించి${pob ? ` ${pob}లో` : ""}, మీ నక్షత్రాలు మహా జ్ఞానాన్ని కలిగి ఉన్నాయి.\n\nనేను మీ వేద జ్యోతిష్యుడిని — ప్రేమ జీవితం, వృత్తి, ఆరోగ్యం లేదా విధి గురించి ఏదైనా అడగండి.`,
      time: nowTime(),
    };
    userScrolledUp.current = false;
    setMessages([greeting]);
    setPhase("chat");
    triggerScroll();
  };

  const sendMessage = () => {
    if (!input.trim() || !zodiac) return;
    if (freeQuestionUsed && !isPremium) {
      setShowUpgradeModal(true);
      return;
    }
    if (isPremium && timeLeft === 0) return;

    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: "user",
      text: input.trim(),
      time: nowTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    const userText = input.trim();
    setInput("");
    setIsTyping(true);
    triggerScroll();

    setTimeout(
      () => {
        let aiText: string;

        if (!freeQuestionUsed) {
          // This is the FREE question — Telugu response
          aiText = getFreeAIResponse(zodiac, userText);
          setFreeQuestionUsed(true);
        } else {
          // Premium — full Telugu responses
          aiText =
            teluguResponses[Math.floor(Math.random() * teluguResponses.length)];
        }

        const aiMsg: ChatMessage = {
          id: `a${Date.now()}`,
          role: "ai",
          text: aiText,
          time: nowTime(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        triggerScroll();
      },
      1200 + Math.random() * 800,
    );
  };

  const openPremiumRazorpay = () => {
    window.open(PREMIUM_RAZORPAY_URL, "_blank", "noopener,noreferrer");
    setPremiumPaymentOpened(true);
  };

  const confirmPremiumPayment = () => {
    setPhase("premium_screenshot");
    setShowUpgradeModal(false);
    setPremiumPaymentOpened(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setScreenshotPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleVerify = () => {
    if (!screenshotFile) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 2000);
  };

  const activatePremium = () => {
    setIsPremium(true);
    setTimeLeft(PREMIUM_SECONDS);
    setTimerActive(true);
    setPhase("chat");
    setVerified(false);
    setScreenshotFile(null);
    setScreenshotPreview(null);
    const msg: ChatMessage = {
      id: `premium${Date.now()}`,
      role: "ai",
      text: "✨ Premium activated! ఇప్పుడు మీకు 1 గంట పాటు అపరిమిత జ్యోతిష్య సలహా అందుబాటులో ఉంది. ప్రేమ, వివాహం, వృత్తి, ఆరోగ్యం లేదా జీవిత రహస్యాలు — ఏదైనా అడగండి.",
      time: nowTime(),
    };
    setMessages((prev) => [...prev, msg]);
    triggerScroll();
  };

  const openRechargeRazorpay = () => {
    window.open(PREMIUM_RAZORPAY_URL, "_blank", "noopener,noreferrer");
    setRechargeOpened(true);
  };

  const handleRecharge = () => {
    setTimeLeft(PREMIUM_SECONDS);
    setTimerActive(true);
    setShowRecharge(false);
    setRechargeOpened(false);
    const msg: ChatMessage = {
      id: `r${Date.now()}`,
      role: "ai",
      text: "చెల్లింపు నిర్ధారించబడింది! ✨ మీ 1 గంట సెషన్ పునరుద్ధరించబడింది. నక్షత్రాల నుండి ఇంకా ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
      time: nowTime(),
    };
    setMessages((prev) => [...prev, msg]);
    triggerScroll();
  };

  const timerPercent = (timeLeft / PREMIUM_SECONDS) * 100;
  const timerColor =
    timeLeft > 600 ? "#00ffcc" : timeLeft > 300 ? "#fbbf24" : "#ef4444";

  const inputBlocked =
    (freeQuestionUsed && !isPremium) || (isPremium && timeLeft === 0);

  return (
    <section id="chat" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading mb-3">
            AI <span>జ్యోతిష్యుడు</span> చాట్
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            మీ మొదటి విశ్వ ప్రశ్నకు ఉచితంగా సమాధానం పొందండి. అపరిమిత 1 గంట మార్గదర్శకత్వం కోసం
            ప్రీమియంకు అప్‌గ్రేడ్ చేయండి.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-surface rounded-2xl overflow-hidden shadow-card"
        >
          {/* Chat header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-navy-500/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon/10 border border-neon-border flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-5 h-5 text-neon" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">
                  Vedic Astro AI
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-muted-foreground">
                    {isPremium
                      ? "ప్రీమియం — విశ్వ సంబంధం సక్రియంగా ఉంది"
                      : freeQuestionUsed
                        ? "ఉచిత ప్రశ్న ఉపయోగించబడింది"
                        : "1 ఉచిత ప్రశ్న అందుబాటులో ఉంది"}
                  </span>
                </div>
              </div>
            </div>
            {phase === "chat" && isPremium && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: timerColor }} />
                <span
                  className="text-lg font-bold font-mono tabular-nums"
                  style={{ color: timerColor }}
                  data-ocid="chat.loading_state"
                >
                  {formatTime(timeLeft)}
                </span>
                <div className="w-16 h-1.5 rounded-full bg-navy-500 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${timerPercent}%`,
                      backgroundColor: timerColor,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {/* Birth form */}
            {phase === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 sm:p-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-neon/10 border border-neon-border flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-neon" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      మీ ఉచిత విశ్వ రీడింగ్ ప్రారంభించండి
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      మొదలు పెట్టడానికి మీ జన్మ వివరాలు నమోదు చేయండి. మీ మొదటి ప్రశ్న ఉచితం.
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label
                      htmlFor="dob"
                      className="text-sm text-muted-foreground mb-2 block"
                    >
                      జన్మ తేది *
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="bg-navy-600/50 border-navy-500 focus:border-neon focus:ring-0 text-foreground"
                      max={new Date().toISOString().split("T")[0]}
                      data-ocid="chat.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="tob"
                      className="text-sm text-muted-foreground mb-2 block"
                    >
                      జన్మ సమయం
                    </Label>
                    <Input
                      id="tob"
                      type="time"
                      value={tob}
                      onChange={(e) => setTob(e.target.value)}
                      className="bg-navy-600/50 border-navy-500 focus:border-neon focus:ring-0 text-foreground"
                      data-ocid="chat.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="pob"
                      className="text-sm text-muted-foreground mb-2 block"
                    >
                      జన్మ స్థలం
                    </Label>
                    <Input
                      id="pob"
                      type="text"
                      placeholder="ఉదా. హైదరాబాద్, భారత్"
                      value={pob}
                      onChange={(e) => setPob(e.target.value)}
                      className="bg-navy-600/50 border-navy-500 focus:border-neon focus:ring-0 text-foreground placeholder:text-muted-foreground/50"
                      data-ocid="chat.input"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={startChat}
                  disabled={!dob}
                  className="btn-neon w-full sm:w-auto px-8 py-3 rounded-full h-auto font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  data-ocid="chat.primary_button"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  ఉచిత రీడింగ్ ప్రారంభించండి
                </Button>
              </motion.div>
            )}

            {/* Premium Payment */}
            {phase === "premium_payment" && (
              <motion.div
                key="premium_payment"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 sm:p-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-6">
                  <Crown className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  ప్రీమియం జ్యోతిష్య చాట్‌కు అప్‌గ్రేడ్ చేయండి
                </h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                  1 గంట అపరిమిత వేద జ్యోతిష్య మార్గదర్శకత్వాన్ని అన్‌లాక్ చేయడానికి Razorpay ద్వారా
                  సురక్షితంగా చెల్లించండి.
                </p>
                <div className="bg-amber-400/5 border border-amber-400/30 rounded-2xl px-8 py-5 mb-8 w-full max-w-xs">
                  <div className="text-4xl font-bold text-amber-400 mb-1">
                    ₹100
                  </div>
                  <div className="text-sm text-muted-foreground">
                    1 గంట — అపరిమిత ప్రశ్నలు
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Razorpay ద్వారా సురక్షిత చెల్లింపు
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={openPremiumRazorpay}
                  className="bg-amber-400 text-navy-900 hover:bg-amber-300 border-0 w-full max-w-xs rounded-full py-3 h-auto font-semibold mb-3"
                  data-ocid="chat.primary_button"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Razorpay ద్వారా ₹100 చెల్లించండి
                </Button>
                {premiumPaymentOpened && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-xs"
                  >
                    <p className="text-xs text-muted-foreground mb-2">
                      చెల్లింపు పూర్తైందా? కొనసాగించడానికి దిగువ క్లిక్ చేయండి.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={confirmPremiumPayment}
                      className="w-full rounded-full py-3 h-auto font-semibold border-amber-400/40 text-amber-400 hover:bg-amber-400/10"
                      data-ocid="chat.confirm_button"
                    >
                      ✅ చెల్లించాను — స్క్రీన్‌షాట్ అప్‌లోడ్ చేయండి
                    </Button>
                  </motion.div>
                )}
                <button
                  type="button"
                  onClick={() => setPhase("chat")}
                  className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  చాట్‌కు తిరిగి వెళ్ళండి
                </button>
              </motion.div>
            )}

            {/* Premium Screenshot Verification */}
            {phase === "premium_screenshot" && (
              <motion.div
                key="premium_screenshot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 sm:p-10 flex flex-col items-center text-center"
              >
                {!verified ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-6">
                      <ImageUp className="w-7 h-7 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      మీ చెల్లింపును ధృవీకరించండి
                    </h3>
                    <p className="text-muted-foreground max-w-sm mb-6">
                      మీ ప్రీమియం సెషన్‌ను సక్రియం చేయడానికి మీ Razorpay చెల్లింపు స్క్రీన్‌షాట్‌ను అప్‌లోడ్
                      చేయండి.
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {!screenshotPreview ? (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full max-w-sm border-2 border-dashed border-amber-400/30 hover:border-amber-400/60 rounded-2xl p-8 flex flex-col items-center gap-3 text-muted-foreground hover:text-amber-400 transition-colors cursor-pointer mb-6"
                      >
                        <ImageUp className="w-8 h-8" />
                        <span className="text-sm font-medium">
                          చెల్లింపు స్క్రీన్‌షాట్ అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి
                        </span>
                        <span className="text-xs opacity-70">
                          JPG, PNG లేదా ఏదైనా చిత్ర ఫార్మాట్
                        </span>
                      </button>
                    ) : (
                      <div className="w-full max-w-sm mb-6">
                        <div className="relative rounded-xl overflow-hidden border border-amber-400/30">
                          <img
                            src={screenshotPreview}
                            alt="Payment screenshot"
                            className="w-full max-h-48 object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setScreenshotFile(null);
                            setScreenshotPreview(null);
                          }}
                          className="mt-2 text-xs text-muted-foreground hover:text-amber-400 underline"
                        >
                          తొలగించి వేరే చిత్రాన్ని అప్‌లోడ్ చేయండి
                        </button>
                      </div>
                    )}
                    <Button
                      type="button"
                      onClick={handleVerify}
                      disabled={!screenshotFile || verifying}
                      className="bg-amber-400 text-navy-900 hover:bg-amber-300 border-0 w-full max-w-sm rounded-full py-3 h-auto font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      data-ocid="chat.primary_button"
                    >
                      {verifying ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          చెల్లింపు ధృవీకరిస్తున్నాం...
                        </>
                      ) : (
                        "ధృవీకరణకు సమర్పించండి"
                      )}
                    </Button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      చెల్లింపు విజయవంతంగా ధృవీకరించబడింది!
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      మీ ప్రీమియం సెషన్ సిద్ధంగా ఉంది. 1 గంట అపరిమిత విశ్వ మార్గదర్శకత్వం వేచి ఉంది.
                    </p>
                    <Button
                      type="button"
                      onClick={activatePremium}
                      className="bg-amber-400 text-navy-900 hover:bg-amber-300 border-0 w-full max-w-xs rounded-full py-3 h-auto font-semibold"
                      data-ocid="chat.primary_button"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      ప్రీమియం చాట్ సక్రియం చేయండి
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Chat */}
            {phase === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col h-[460px] sm:h-[520px]"
              >
                {zodiac && (
                  <div className="px-6 py-2 border-b border-navy-500/30 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs bg-neon/10 text-neon border border-neon-border rounded-full px-3 py-1">
                      {zodiac.symbol} {zodiac.name} • {zodiac.element} Sign
                    </span>
                    {!isPremium && (
                      <span className="text-xs text-amber-400 font-medium">
                        {freeQuestionUsed
                          ? "ఉచిత ప్రశ్న ఉపయోగించబడింది"
                          : "1 ఉచిత ప్రశ్న"}
                      </span>
                    )}
                  </div>
                )}

                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
                >
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                            msg.role === "ai"
                              ? "bg-neon/10 border border-neon-border"
                              : "bg-navy-500 border border-navy-400"
                          }`}
                        >
                          {msg.role === "ai" ? (
                            <Bot className="w-4 h-4 text-neon" />
                          ) : (
                            <User className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                            msg.role === "ai"
                              ? "bg-navy-600/70 border border-navy-500/50 text-foreground rounded-tl-none"
                              : "bg-neon/10 border border-neon-border text-foreground rounded-tr-none"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-line">
                            {msg.text}
                          </p>
                          <span className="text-xs text-muted-foreground/60 mt-1 block">
                            {msg.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-neon/10 border border-neon-border flex items-center justify-center">
                          <Bot className="w-4 h-4 text-neon" />
                        </div>
                        <div className="bg-navy-600/70 border border-navy-500/50 rounded-2xl rounded-tl-none px-4 py-3">
                          <div className="flex gap-1 items-center h-5">
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                className="w-2 h-2 rounded-full bg-neon/60 animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Upgrade banner after free question */}
                {freeQuestionUsed && !isPremium && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-4 mb-2 bg-amber-400/10 border border-amber-400/30 rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <p className="text-xs text-amber-200">
                        లోతైన అంచనాల కోసం Premium కి upgrade చేయండి — ₹100 / 1 గంట
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => setPhase("premium_payment")}
                      className="bg-amber-400 text-navy-900 hover:bg-amber-300 border-0 rounded-full px-3 py-1.5 h-auto text-xs font-bold flex-shrink-0"
                      data-ocid="chat.primary_button"
                    >
                      అప్‌గ్రేడ్
                    </Button>
                  </motion.div>
                )}

                <div className="p-4 border-t border-navy-500/50">
                  {inputBlocked ? (
                    <button
                      type="button"
                      onClick={() =>
                        isPremium && timeLeft === 0
                          ? setShowRecharge(true)
                          : setPhase("premium_payment")
                      }
                      className="w-full flex items-center justify-center gap-2 rounded-full py-3 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-sm font-semibold hover:bg-amber-400/20 transition-colors"
                      data-ocid="chat.primary_button"
                    >
                      <Lock className="w-4 h-4" />
                      {isPremium && timeLeft === 0
                        ? "సెషన్ ముగిసింది — కొనసాగించడానికి రీఛార్జ్ చేయండి"
                        : "Premium కి Upgrade చేయండి — ₹100 / 1 గంట"}
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && !e.shiftKey && sendMessage()
                        }
                        placeholder="నక్షత్రాలను ఏదైనా అడగండి..."
                        className="flex-1 bg-navy-600/50 border-navy-500 focus:border-neon focus:ring-0 text-foreground placeholder:text-muted-foreground/50 rounded-full"
                        data-ocid="chat.input"
                      />
                      <Button
                        type="button"
                        onClick={sendMessage}
                        disabled={!input.trim()}
                        className="btn-neon rounded-full w-10 h-10 p-0 flex-shrink-0 disabled:opacity-50"
                        data-ocid="chat.submit_button"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent
          className="bg-navy-700 border border-navy-500 text-foreground max-w-sm"
          data-ocid="chat.modal"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              ✨ పూర్తి విశ్వ మార్గదర్శకత్వం పొందండి
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="text-5xl mb-4">👑</div>
            <p className="text-muted-foreground mb-2">మీ ఉచిత ప్రశ్న ఉపయోగించబడింది.</p>
            <p className="text-foreground font-medium mb-6">
              వ్యక్తిగతీకరించిన విశ్లేషణ, సమయ అంచనాలు మరియు ఆధ్యాత్మిక నివారణ చర్యలతో Premium కి
              upgrade చేయండి.
            </p>
            <div className="bg-amber-400/5 border border-amber-400/30 rounded-xl p-4 mb-6">
              <div className="text-3xl font-bold text-amber-400">₹100</div>
              <div className="text-sm text-muted-foreground">
                ప్రీమియం జ్యోతిష్య చాట్ — 1 గంట
              </div>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground text-left">
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span> 1 గంట అపరిమిత ప్రశ్నలు
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span> లోతైన వేద జ్యోతిష్య విశ్లేషణ
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span> ముఖ్య జీవిత సంఘటనలకు
                  సమయ అంచనాలు
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span> ఆధ్యాత్మిక నివారణ చర్యలు
                  చేర్చబడ్డాయి
                </li>
              </ul>
            </div>
            <Button
              type="button"
              onClick={() => {
                setShowUpgradeModal(false);
                setPhase("premium_payment");
              }}
              className="bg-amber-400 text-navy-900 hover:bg-amber-300 border-0 w-full rounded-full py-3 h-auto font-semibold mb-3"
              data-ocid="chat.confirm_button"
            >
              <Crown className="w-4 h-4 mr-2" />
              ప్రీమియంకు అప్‌గ్రేడ్ — ₹100
            </Button>
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              తర్వాత చూద్దాం
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recharge Modal */}
      <Dialog open={showRecharge} onOpenChange={() => {}}>
        <DialogContent
          className="bg-navy-700 border border-navy-500 text-foreground max-w-sm"
          data-ocid="chat.modal"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              ✨ సెషన్ ముగిసింది
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="text-5xl mb-4">⏰</div>
            <p className="text-muted-foreground mb-2">
              మీ 1 గంట Premium సెషన్ ముగిసింది.
            </p>
            <p className="text-foreground font-medium mb-6">
              కొనసాగించడానికి ₹100 రీఛార్జ్ చేయండి.
            </p>
            <div className="bg-amber-400/5 border border-amber-400/30 rounded-xl p-4 mb-4">
              <div className="text-3xl font-bold text-amber-400">₹100</div>
              <div className="text-sm text-muted-foreground">= మరో 1 గంట</div>
            </div>
            <Button
              type="button"
              onClick={openRechargeRazorpay}
              className="bg-amber-400 text-navy-900 hover:bg-amber-300 border-0 w-full rounded-full py-3 h-auto font-semibold mb-3"
              data-ocid="chat.confirm_button"
            >
              Razorpay ద్వారా ₹100 చెల్లించండి
            </Button>
            {rechargeOpened && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-xs text-muted-foreground mb-2">
                  చెల్లింపు పూర్తయిందా? కొనసాగించడానికి నొక్కండి.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRecharge}
                  className="w-full rounded-full py-3 h-auto font-semibold border-amber-400/40 text-amber-400 hover:bg-amber-400/10"
                >
                  ✅ చెల్లించాను — చాట్ కొనసాగించు
                </Button>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
