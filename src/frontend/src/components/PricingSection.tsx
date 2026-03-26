import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Crown, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const PREMIUM_RAZORPAY_URL =
  "https://razorpay.me/@jittaboinaajay?amount=CVDUr6Uxp2FOGZGwAHntNg%3D%3D";

export function PricingSection() {
  const [showModal, setShowModal] = useState(false);
  const [paymentOpened, setPaymentOpened] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const openRazorpay = () => {
    window.open(PREMIUM_RAZORPAY_URL, "_blank", "noopener,noreferrer");
    setPaymentOpened(true);
  };

  const confirmPayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setPaymentOpened(false);
      setPaymentSuccess(false);
    }, 2500);
  };

  const freeFeatures = [
    "1 free cosmic question",
    "Zodiac sign analysis",
    "English & Telugu support",
    "Friendly astrology guidance",
  ];

  const premiumFeatures = [
    "Unlimited questions for 1 hour",
    "Deep Vedic birth chart analysis",
    "Love, Career, Marriage & Health",
    "Timing predictions for key events",
    "Spiritual remedies included",
    "English & Telugu support",
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
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
            Start free, upgrade for complete Vedic astrology guidance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl p-6 card-surface"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-navy-500/50 text-neon/70">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1">Free</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try before you commit
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-extrabold text-foreground">
                ₹0
              </span>
              <span className="text-muted-foreground text-sm">
                / 1 question
              </span>
            </div>
            <ul className="space-y-3 mb-8">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-neon" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              onClick={() => {
                document
                  .getElementById("chat")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-outline-neon w-full rounded-full h-auto py-2.5 font-semibold"
              data-ocid="pricing.primary_button.1"
            >
              Start Free Chat
            </Button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl p-6 border border-amber-400/50 bg-amber-400/5"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-navy-900">
                Best Value
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-amber-400/20 text-amber-400">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              Premium Astrology Chat
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete cosmic life guidance
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-extrabold text-amber-400">
                ₹100
              </span>
              <span className="text-muted-foreground text-sm">/ 1 hour</span>
            </div>
            <ul className="space-y-3 mb-8">
              {premiumFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              onClick={() => setShowModal(true)}
              className="bg-amber-400 text-navy-900 hover:bg-amber-300 border-0 w-full rounded-full h-auto py-2.5 font-semibold"
              data-ocid="pricing.primary_button.2"
            >
              <Crown className="w-4 h-4 mr-2" />
              Get Premium
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className="bg-navy-700 border border-navy-500 text-foreground max-w-sm"
          data-ocid="pricing.modal"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {paymentSuccess
                ? "✅ Payment Successful!"
                : "Upgrade to Premium Astrology Chat"}
            </DialogTitle>
          </DialogHeader>
          {!paymentSuccess ? (
            <div className="py-4">
              <div className="bg-amber-400/5 border border-amber-400/30 rounded-xl p-4 mb-6 text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  Premium Astrology Chat
                </div>
                <div className="text-4xl font-extrabold text-amber-400">
                  ₹100
                </div>
                <div className="text-sm text-muted-foreground">
                  1 hour — unlimited questions
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center mb-2">
                  Pay securely via Razorpay. Once done, scroll to the chat and
                  upload your screenshot to activate.
                </p>
                <Button
                  type="button"
                  onClick={openRazorpay}
                  className="bg-amber-400 text-navy-900 hover:bg-amber-300 border-0 w-full rounded-full py-3 h-auto font-semibold"
                  data-ocid="pricing.confirm_button"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Pay ₹100 via Razorpay
                </Button>
                {paymentOpened && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-xs text-muted-foreground text-center mb-2">
                      Payment completed?
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={confirmPayment}
                      className="w-full rounded-full py-3 h-auto font-semibold border-amber-400/40 text-amber-400 hover:bg-amber-400/10"
                      data-ocid="pricing.confirm_button"
                    >
                      ✅ I've Paid — Activate Premium
                    </Button>
                  </motion.div>
                )}
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full mt-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="pricing.cancel_button"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center" data-ocid="pricing.success_state">
              <div className="text-5xl mb-4">🎉</div>
              <p className="text-foreground font-semibold mb-2">
                Payment Confirmed!
              </p>
              <p className="text-muted-foreground text-sm">
                Scroll to the AI Chat section and upload your payment screenshot
                to begin your 1-hour Premium session.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
