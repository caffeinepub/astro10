import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type ZodiacSign,
  getAIResponse,
  getZodiacFromDate,
} from "@/data/zodiac";
import { Bot, Clock, CreditCard, Send, Sparkles, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
}

const TOTAL_SECONDS = 5 * 60;
const RAZORPAY_URL =
  "https://razorpay.me/@jittaboinaajay?amount=CeQsAR0nTC%2BND0Le6liYzQ%3D%3D";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ChatSection() {
  const [phase, setPhase] = useState<"payment" | "form" | "chat">("payment");
  const [paymentOpened, setPaymentOpened] = useState(false);
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [pob, setPob] = useState("");
  const [zodiac, setZodiac] = useState<ZodiacSign | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [timerActive, setTimerActive] = useState(false);
  const [showRecharge, setShowRecharge] = useState(false);
  const [rechargeOpened, setRechargeOpened] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [scrollTick, setScrollTick] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const openRazorpay = () => {
    window.open(RAZORPAY_URL, "_blank", "noopener,noreferrer");
    setPaymentOpened(true);
  };

  const confirmPayment = () => {
    setPhase("form");
  };

  const startChat = () => {
    if (!dob) return;
    const date = new Date(dob);
    const sign = getZodiacFromDate(date.getMonth() + 1, date.getDate());
    setZodiac(sign);
    const greeting: ChatMessage = {
      id: "intro",
      role: "ai",
      text: `Namaste! ✨ I sense the cosmic energy of ${sign.name} ${sign.symbol} in your birth chart. Born under the ${sign.element} element${pob ? ` in ${pob}` : ""}, your stars hold profound wisdom. I am your AI Astrologer — ask me anything about your love life, career, health, or destiny. The cosmic clock is ticking — we have 5 minutes together.`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    userScrolledUp.current = false;
    setMessages([greeting]);
    setPhase("chat");
    setTimerActive(true);
    triggerScroll();
  };

  const sendMessage = () => {
    if (!input.trim() || timeLeft === 0 || !zodiac) return;
    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMsg]);
    const userText = input.trim();
    setInput("");
    setIsTyping(true);
    triggerScroll();
    setTimeout(
      () => {
        const aiText = getAIResponse(zodiac, userText);
        const aiMsg: ChatMessage = {
          id: `a${Date.now()}`,
          role: "ai",
          text: aiText,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        triggerScroll();
      },
      1200 + Math.random() * 800,
    );
  };

  const openRechargeRazorpay = () => {
    window.open(RAZORPAY_URL, "_blank", "noopener,noreferrer");
    setRechargeOpened(true);
  };

  const handleRecharge = () => {
    setTimeLeft(TOTAL_SECONDS);
    setTimerActive(true);
    setShowRecharge(false);
    setRechargeOpened(false);
    const msg: ChatMessage = {
      id: `r${Date.now()}`,
      role: "ai",
      text: "Payment confirmed! ✨ The cosmic connection is restored. Your 5 minutes have been renewed. What else would you like to know from the stars?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, msg]);
    triggerScroll();
  };

  const timerPercent = (timeLeft / TOTAL_SECONDS) * 100;
  const timerColor =
    timeLeft > 60 ? "#00ffcc" : timeLeft > 30 ? "#fbbf24" : "#ef4444";

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
            AI <span>Astrologer</span> Chat
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Share your birth details and unlock personalized cosmic guidance.
            Your first 5 minutes are just ₹10.
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
                  Astro AI
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-muted-foreground">
                    Online — Cosmic Connection Active
                  </span>
                </div>
              </div>
            </div>
            {phase === "chat" && (
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
            {/* Payment Gate */}
            {phase === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 sm:p-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-neon/10 border border-neon-border flex items-center justify-center mb-6">
                  <CreditCard className="w-7 h-7 text-neon" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Start Your 5-Minute Astrology Session
                </h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                  Pay securely via Razorpay to unlock your personalized cosmic
                  reading. Once payment is complete, return here and click "I've
                  Paid".
                </p>

                <div className="bg-neon/5 border border-neon-border rounded-2xl px-8 py-5 mb-8 w-full max-w-xs">
                  <div className="text-4xl font-bold text-neon mb-1">₹10</div>
                  <div className="text-sm text-muted-foreground">
                    5-Minute Live Astrology Chat
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Secure payment via Razorpay
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={openRazorpay}
                  className="btn-neon w-full max-w-xs rounded-full py-3 h-auto font-semibold mb-3"
                  data-ocid="chat.primary_button"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay ₹10 via Razorpay
                </Button>

                {paymentOpened && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-xs"
                  >
                    <p className="text-xs text-muted-foreground mb-2">
                      Completed payment? Click below to continue.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={confirmPayment}
                      className="w-full rounded-full py-3 h-auto font-semibold border-neon/40 text-neon hover:bg-neon/10"
                      data-ocid="chat.confirm_button"
                    >
                      ✅ I've Paid — Start Chat
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Birth form */}
            {phase === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 sm:p-8"
              >
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Enter Your Birth Details
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label
                      htmlFor="dob"
                      className="text-sm text-muted-foreground mb-2 block"
                    >
                      Date of Birth *
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
                      Time of Birth
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
                      Place of Birth
                    </Label>
                    <Input
                      id="pob"
                      type="text"
                      placeholder="e.g. Mumbai, India"
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
                  Begin My Reading
                </Button>
              </motion.div>
            )}

            {phase === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col h-[420px] sm:h-[480px]"
              >
                {zodiac && (
                  <div className="px-6 py-2 border-b border-navy-500/30">
                    <span className="inline-flex items-center gap-1.5 text-xs bg-neon/10 text-neon border border-neon-border rounded-full px-3 py-1">
                      {zodiac.symbol} {zodiac.name} • {zodiac.element} Sign
                    </span>
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
                        className={`flex gap-3 ${
                          msg.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
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
                          <p className="text-sm leading-relaxed">{msg.text}</p>
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

                <div className="p-4 border-t border-navy-500/50">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && !e.shiftKey && sendMessage()
                      }
                      placeholder={
                        timeLeft === 0
                          ? "Session ended — recharge to continue"
                          : "Ask the stars anything..."
                      }
                      disabled={timeLeft === 0}
                      className="flex-1 bg-navy-600/50 border-navy-500 focus:border-neon focus:ring-0 text-foreground placeholder:text-muted-foreground/50 rounded-full"
                      data-ocid="chat.input"
                    />
                    <Button
                      type="button"
                      onClick={sendMessage}
                      disabled={!input.trim() || timeLeft === 0}
                      className="btn-neon rounded-full w-10 h-10 p-0 flex-shrink-0 disabled:opacity-50"
                      data-ocid="chat.submit_button"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Recharge Modal */}
      <Dialog open={showRecharge} onOpenChange={() => {}}>
        <DialogContent
          className="bg-navy-700 border border-navy-500 text-foreground max-w-sm"
          data-ocid="chat.modal"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              ✨ Session Ended
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="text-5xl mb-4">⏰</div>
            <p className="text-muted-foreground mb-2">
              Your 5-minute cosmic reading session has ended.
            </p>
            <p className="text-foreground font-medium mb-6">
              Recharge for ₹10 to continue your consultation.
            </p>
            <div className="bg-neon/5 border border-neon-border rounded-xl p-4 mb-4">
              <div className="text-3xl font-bold text-neon">₹10</div>
              <div className="text-sm text-muted-foreground">
                = 5 More Minutes
              </div>
            </div>
            <Button
              type="button"
              onClick={openRechargeRazorpay}
              className="btn-neon w-full rounded-full py-3 h-auto font-semibold mb-3"
              data-ocid="chat.confirm_button"
            >
              Pay ₹10 via Razorpay
            </Button>
            {rechargeOpened && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-xs text-muted-foreground mb-2">
                  Payment done? Click below to resume.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRecharge}
                  className="w-full rounded-full py-3 h-auto font-semibold border-neon/40 text-neon hover:bg-neon/10"
                >
                  ✅ I've Paid — Resume Chat
                </Button>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
