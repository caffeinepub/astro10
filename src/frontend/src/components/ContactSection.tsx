import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { actor } = useActor();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus("loading");
    try {
      if (actor) {
        await actor.submit(name, email, message);
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-heading mb-3">
            Get in <span>Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have questions about your reading or our service? We'd love to hear
            from the cosmos — and from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              {
                icon: <Mail className="w-5 h-5 text-neon" />,
                title: "Email Us",
                value: "hello@astro10.in",
              },
              {
                icon: <MessageSquare className="w-5 h-5 text-neon" />,
                title: "Support Hours",
                value: "9 AM – 9 PM IST, Daily",
              },
              {
                icon: <User className="w-5 h-5 text-neon" />,
                title: "Response Time",
                value: "Within 24 hours",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon-border flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {item.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            <div className="card-surface rounded-xl p-5 border-l-2 border-neon mt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                "The stars impel, they do not compel. Your destiny is written in
                the cosmos, but you hold the pen."
              </p>
              <p className="text-xs text-neon mt-2">— Ancient Vedic Wisdom</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 card-surface rounded-2xl p-6 sm:p-8"
            data-ocid="contact.panel"
          >
            <div className="space-y-5">
              <div>
                <Label
                  htmlFor="contact-name"
                  className="text-sm text-muted-foreground mb-2 block"
                >
                  Name *
                </Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="bg-navy-600/50 border-navy-500 focus:border-neon focus:ring-0 text-foreground placeholder:text-muted-foreground/50"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <Label
                  htmlFor="contact-email"
                  className="text-sm text-muted-foreground mb-2 block"
                >
                  Email *
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-navy-600/50 border-navy-500 focus:border-neon focus:ring-0 text-foreground placeholder:text-muted-foreground/50"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <Label
                  htmlFor="contact-message"
                  className="text-sm text-muted-foreground mb-2 block"
                >
                  Message *
                </Label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your question or reading..."
                  required
                  rows={5}
                  className="bg-navy-600/50 border-navy-500 focus:border-neon focus:ring-0 text-foreground placeholder:text-muted-foreground/50 resize-none"
                  data-ocid="contact.textarea"
                />
              </div>

              {status === "success" && (
                <div
                  className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 text-sm"
                  data-ocid="contact.success_state"
                >
                  ✅ Message sent! The cosmos has received your query. We'll
                  respond soon.
                </div>
              )}
              {status === "error" && (
                <div
                  className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm"
                  data-ocid="contact.error_state"
                >
                  ❌ Something went wrong. Please try again.
                </div>
              )}

              <Button
                type="submit"
                disabled={status === "loading" || !name || !email || !message}
                className="btn-neon w-full rounded-full py-3 h-auto font-semibold disabled:opacity-50"
                data-ocid="contact.submit_button"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-navy-900/50 border-t-navy-900 rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
