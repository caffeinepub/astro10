import { Button } from "@/components/ui/button";
import { Menu, Star, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Horoscopes", href: "#horoscope" },
  { label: "AI Reading", href: "#chat" },
  { label: "Predictions", href: "#predictions" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/95 backdrop-blur-md border-b border-navy-500/50 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNav("#home")}
          className="flex items-center gap-2 group"
          data-ocid="header.link"
        >
          <div className="w-8 h-8 rounded-full bg-neon/10 border border-neon-border flex items-center justify-center group-hover:shadow-neon-sm transition-all">
            <Star className="w-4 h-4 text-neon" fill="currentColor" />
          </div>
          <span className="text-lg font-bold">
            <span className="text-neon">Astro</span>
            <span className="text-foreground">10</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNav(link.href)}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-neon transition-colors rounded-md hover:bg-neon/5"
              data-ocid="header.link"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={() => handleNav("#chat")}
            className="hidden sm:flex btn-neon rounded-full px-5 py-2 text-sm h-auto"
            data-ocid="header.primary_button"
          >
            Get Started
          </Button>
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-neon transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="header.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-b border-navy-500/50 animate-fade-in">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNav(link.href)}
                className="text-left px-4 py-3 text-sm text-muted-foreground hover:text-neon hover:bg-neon/5 rounded-lg transition-colors"
                data-ocid="header.link"
              >
                {link.label}
              </button>
            ))}
            <Button
              type="button"
              onClick={() => handleNav("#chat")}
              className="mt-2 btn-neon rounded-full h-auto py-2"
              data-ocid="header.primary_button"
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
