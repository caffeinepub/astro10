import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const PREMIUM_RAZORPAY_URL =
  "https://razorpay.me/@jittaboinaajay?amount=cZFKpDUaadfgpLOW1lSJHw%3D%3D";
const ELITE_RAZORPAY_URL =
  "https://razorpay.me/@jittaboinaajay?amount=CVDUr6Uxp2FOGZGwAHntNg%3D%3D";

interface Plan {
  id: string;
  name: string;
  price: string;
  duration: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  razorpayUrl?: string;
}

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "₹10",
    duration: "5 Minutes",
    icon: <Sparkles className="w-6 h-6" />,
    description: "Perfect for quick cosmic check-ins",
    features: [
      "5-minute AI consultation",
      "Zodiac sign analysis",
      "1 topic reading (Love/Career/Life)",
      "Chat transcript saved",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹30",
    duration: "20 Minutes",
    icon: <Zap className="w-6 h-6" />,
    description: "Deep dive into your cosmic blueprint",
    features: [
      "20-minute AI consultation",
      "Full birth chart analysis",
      "All topics: Love, Career & Life",
      "Compatibility reading",
      "Monthly forecast included",
    ],
    highlighted: true,
    badge: "Best Value",
    razorpayUrl: PREMIUM_RAZORPAY_URL,
  },
  {
    id: "elite",
    name: "Elite",
    price: "₹99",
    duration: "60 Minutes",
    icon: <Crown className="w-6 h-6" />,
    description: "Complete cosmic life roadmap",
    features: [
      "60-minute AI consultation",
      "Detailed Kundli analysis",
      "Yearly predictions report",
      "Gemstone recommendations",
      "Priority cosmic connection",
      "Shareable PDF report",
    ],
    highlighted: false,
    badge: "Elite",
    razorpayUrl: ELITE_RAZORPAY_URL,
  },
];

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentOpened, setPaymentOpened] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setPaymentOpened(false);
    setPaymentSuccess(false);
  };

  const handleClose = () => {
    setSelectedPlan(null);
    setPaymentOpened(false);
    setPaymentSuccess(false);
  };

  const openRazorpay = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setPaymentOpened(true);
  };

  const confirmRazorpayPayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  const handleMockPay = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-heading mb-3">
            Cosmic <span>Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Choose the plan that aligns with your cosmic journey. All readings
            include AI-powered Vedic astrology insights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 card-hover ${
                plan.highlighted
                  ? "border border-neon/50 bg-neon/5 shadow-neon-sm"
                  : "card-surface"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      plan.id === "elite"
                        ? "bg-amber-400 text-navy-900"
                        : "bg-neon text-navy-900"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  plan.highlighted
                    ? "bg-neon/20 text-neon"
                    : plan.id === "elite"
                      ? "bg-amber-400/20 text-amber-400"
                      : "bg-navy-500/50 text-neon/70"
                }`}
              >
                {plan.icon}
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span
                  className={`text-4xl font-extrabold ${
                    plan.highlighted
                      ? "text-neon"
                      : plan.id === "elite"
                        ? "text-amber-400"
                        : "text-foreground"
                  }`}
                >
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm">
                  / {plan.duration}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        plan.id === "elite" ? "text-amber-400" : "text-neon"
                      }`}
                    />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                onClick={() => handleSelectPlan(plan)}
                className={`w-full rounded-full h-auto py-2.5 font-semibold ${
                  plan.highlighted
                    ? "btn-neon"
                    : plan.id === "elite"
                      ? "bg-amber-400 text-navy-900 hover:bg-amber-300 border-0"
                      : "btn-outline-neon"
                }`}
                data-ocid={`pricing.primary_button.${i + 1}`}
              >
                Get {plan.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={!!selectedPlan} onOpenChange={handleClose}>
        <DialogContent
          className="bg-navy-700 border border-navy-500 text-foreground max-w-sm"
          data-ocid="pricing.modal"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {paymentSuccess
                ? "✅ Payment Successful!"
                : `Upgrade to ${selectedPlan?.name}`}
            </DialogTitle>
          </DialogHeader>

          {!paymentSuccess ? (
            <div className="py-4">
              <div
                className={`border rounded-xl p-4 mb-6 text-center ${
                  selectedPlan?.id === "elite"
                    ? "bg-amber-400/5 border-amber-400/30"
                    : "bg-neon/5 border-neon-border"
                }`}
              >
                <div className="text-sm text-muted-foreground mb-1">
                  {selectedPlan?.name} Plan
                </div>
                <div
                  className={`text-4xl font-extrabold ${
                    selectedPlan?.id === "elite"
                      ? "text-amber-400"
                      : "text-neon"
                  }`}
                >
                  {selectedPlan?.price}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedPlan?.duration} consultation
                </div>
              </div>

              {selectedPlan?.razorpayUrl ? (
                /* Razorpay real payment flow */
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center mb-2">
                    Pay securely via Razorpay. Once done, click "I've Paid" to
                    activate your session.
                  </p>
                  <Button
                    type="button"
                    onClick={() => openRazorpay(selectedPlan.razorpayUrl!)}
                    className={`w-full rounded-full py-3 h-auto font-semibold ${
                      selectedPlan?.id === "elite"
                        ? "bg-amber-400 text-navy-900 hover:bg-amber-300 border-0"
                        : "btn-neon"
                    }`}
                    data-ocid="pricing.confirm_button"
                  >
                    Pay {selectedPlan.price} via Razorpay
                  </Button>
                  {paymentOpened && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-xs text-muted-foreground text-center mb-2">
                        Payment completed? Click below to activate.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={confirmRazorpayPayment}
                        className={`w-full rounded-full py-3 h-auto font-semibold ${
                          selectedPlan?.id === "elite"
                            ? "border-amber-400/40 text-amber-400 hover:bg-amber-400/10"
                            : "border-neon/40 text-neon hover:bg-neon/10"
                        }`}
                        data-ocid="pricing.confirm_button"
                      >
                        ✅ I've Paid — Activate{" "}
                        {selectedPlan?.id === "elite" ? "Elite" : "Premium"}
                      </Button>
                    </motion.div>
                  )}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full mt-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid="pricing.cancel_button"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                /* Mock payment flow for Basic */
                <div>
                  <div className="space-y-3 mb-6">
                    <input
                      className="w-full bg-navy-600/50 border border-navy-500 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon"
                      placeholder="Card number (demo)"
                      readOnly
                      value="4242 4242 4242 4242"
                      data-ocid="pricing.input"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        className="bg-navy-600/50 border border-navy-500 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        data-ocid="pricing.input"
                      />
                      <input
                        className="bg-navy-600/50 border border-navy-500 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon"
                        placeholder="CVV"
                        defaultValue="123"
                        data-ocid="pricing.input"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={handleMockPay}
                    className="btn-neon w-full rounded-full py-3 h-auto font-semibold"
                    data-ocid="pricing.confirm_button"
                  >
                    Confirm Payment {selectedPlan?.price}
                  </Button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid="pricing.cancel_button"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center" data-ocid="pricing.success_state">
              <div className="text-5xl mb-4">🎉</div>
              <p className="text-foreground font-semibold mb-2">
                Payment Confirmed!
              </p>
              <p className="text-muted-foreground text-sm">
                Your {selectedPlan?.name} cosmic session is ready. Enjoy your
                extended reading!
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
