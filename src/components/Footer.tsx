import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type SocialLink = {
  icon: React.ElementType;
  href: string;
  label: string;
};

type Props = {};

function Footer({}: Props) {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const socialLinks: SocialLink[] = [
    {
      icon: Github,
      href: "https://github.com/sebasurbina",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/sebaurbina",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:sebastian.urbina97@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="w-full py-8 mt-12 border-t border-helix-cyan/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:text-helix-cyan transition-colors"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-text-dim">
            {t("footer.copyright", { year: currentYear.toString() })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
