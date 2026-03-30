import { Star } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "astro10")}`;

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-navy-500/50 py-12 px-4 sm:px-6 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-neon/10 border border-neon-border flex items-center justify-center">
                <Star className="w-4 h-4 text-neon" fill="currentColor" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-neon">Astro</span>
                <span className="text-foreground">10</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              AI-ఆధారిత వేద జ్యోతిష్య రీడింగ్‌లు ₹100కే. ప్రేమ, వృత్తి మరియు జీవితంపై వ్యక్తిగతీకరించిన
              అంతర్దృష్టులతో మీ విశ్వ విధిని తెలుసుకోండి.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              త్వరిత లింకులు
            </h4>
            <ul className="space-y-2">
              {[
                { label: "రోజువారీ రాశిఫలం", id: "#horoscope" },
                { label: "AI రీడింగ్", id: "#chat" },
                { label: "అంచనాలు", id: "#predictions" },
                { label: "ధర", id: "#pricing" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-muted-foreground hover:text-neon transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              సమాచారం
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Astro10 గురించి", id: "#about" },
                { label: "సంప్రదించండి", id: "#contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-muted-foreground hover:text-neon transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-500/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Astro10. అన్ని హక్కులు పరిరక్షించబడ్డాయి. వినోద ప్రయోజనాల కోసం.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ♥ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
