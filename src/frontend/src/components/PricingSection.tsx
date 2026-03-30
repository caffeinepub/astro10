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
    "1 ఉచిత విశ్వ ప్రశ్న",
    "రాశి చిహ్న విశ్లేషణ",
    "ఇంగ్లీష్ & తెలుగు మద్దతు",
    "స్నేహపూర్వక జ్యోతిష్య మార్గదర్శకత్వం",
  ];

  const premiumFeatures = [
    "1 గంట అపరిమిత ప్రశ్నలు",
    "లోతైన వేద జన్మ చార్ట్ విశ్లేషణ",
    "ప్రేమ, కెరీర్, వివాహం & ఆరోగ్యం",
    "ముఖ్య సంఘటనలకు సమయ అంచనాలు",
    "ఆధ్యాత్మిక నివారణ చర్యలు చేర్చబడ్డాయి",
    "ఇంగ్లీష్ & తెలుగు మద్దతు",
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
            విశ్వ <span>ధర</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            ఉచితంగా ప్రారంభించండి, పూర్తి వేద జ్యోతిష్య మార్గదర్శకత్వానికి అప్‌గ్రేడ్ చేయండి.
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
            <h3 className="text-xl font-bold text-foreground mb-1">ఉచితం</h3>
            <p className="text-sm text-muted-foreground mb-4">
              నిబద్ధత ముందు ప్రయత్నించండి
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-extrabold text-foreground">
                ₹0
              </span>
              <span className="text-muted-foreground text-sm">/ 1 ప్రశ్న</span>
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
              ఉచిత చాట్ ప్రారంభించండి
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
                అత్యుత్తమ విలువ
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-amber-400/20 text-amber-400">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              ప్రీమియం జ్యోతిష్య చాట్
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              పూర్తి విశ్వ జీవిత మార్గదర్శకత్వం
            </p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-extrabold text-amber-400">
                ₹100
              </span>
              <span className="text-muted-foreground text-sm">/ 1 గంట</span>
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
              ప్రీమియం పొందండి
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
                ? "✅ చెల్లింపు విజయవంతమైంది!"
                : "ప్రీమియం జ్యోతిష్య చాట్‌కు అప్‌గ్రేడ్ చేయండి"}
            </DialogTitle>
          </DialogHeader>
          {!paymentSuccess ? (
            <div className="py-4">
              <div className="bg-amber-400/5 border border-amber-400/30 rounded-xl p-4 mb-6 text-center">
                <div className="text-sm text-muted-foreground mb-1">
                  ప్రీమియం జ్యోతిష్య చాట్
                </div>
                <div className="text-4xl font-extrabold text-amber-400">
                  ₹100
                </div>
                <div className="text-sm text-muted-foreground">
                  1 గంట — అపరిమిత ప్రశ్నలు
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center mb-2">
                  Razorpay ద్వారా సురక్షితంగా చెల్లించండి. పూర్తయిన తర్వాత, AI చాట్ విభాగానికి వెళ్ళి మీ
                  స్క్రీన్‌షాట్ అప్‌లోడ్ చేసి ప్రీమియం సెషన్ సక్రియం చేయండి.
                </p>
                <Button
                  type="button"
                  onClick={openRazorpay}
                  className="bg-amber-400 text-navy-900 hover:bg-amber-300 border-0 w-full rounded-full py-3 h-auto font-semibold"
                  data-ocid="pricing.confirm_button"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Razorpay ద్వారా ₹100 చెల్లించండి
                </Button>
                {paymentOpened && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-xs text-muted-foreground text-center mb-2">
                      చెల్లింపు పూర్తైందా?
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={confirmPayment}
                      className="w-full rounded-full py-3 h-auto font-semibold border-amber-400/40 text-amber-400 hover:bg-amber-400/10"
                      data-ocid="pricing.confirm_button"
                    >
                      ✅ చెల్లించాను — ప్రీమియం సక్రియం చేయండి
                    </Button>
                  </motion.div>
                )}
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full mt-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="pricing.cancel_button"
                >
                  రద్దు చేయండి
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center" data-ocid="pricing.success_state">
              <div className="text-5xl mb-4">🎉</div>
              <p className="text-foreground font-semibold mb-2">
                చెల్లింపు నిర్ధారించబడింది!
              </p>
              <p className="text-muted-foreground text-sm">
                మీ 1 గంట ప్రీమియం సెషన్ ప్రారంభించడానికి AI చాట్ విభాగానికి వెళ్ళి మీ చెల్లింపు స్క్రీన్‌షాట్
                అప్‌లోడ్ చేయండి.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
