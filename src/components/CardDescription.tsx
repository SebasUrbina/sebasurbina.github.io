import UserAvatar from "./UserAvatar";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {};

function CardDescription({}: Props) {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Github, href: "https://github.com/sebasurbina", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/sebasurbina", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/in/sebasurbina", label: "LinkedIn" },
    { icon: Mail, href: "mailto:sebastian.urbina97@gmail.com", label: "Email" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Terminal-style border */}
      <div className="border border-helix-cyan/30 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="p-1 border-2 border-helix-cyan/50 rounded-full">
              <UserAvatar size={140} />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-4 flex-grow text-center md:text-left">
            {/* Greeting */}
            <h1 className="font-mono text-3xl md:text-4xl text-text-bright">
              <span className="text-helix-cyan">&gt;&gt;</span> {t("home.greeting")}
            </h1>

            {/* Name and Title */}
            <div className="font-mono">
              <h2 className="text-xl md:text-2xl text-text-bright mb-1">
                {t("home.name")}
              </h2>
              <p className="text-base md:text-lg text-helix-teal">
                {t("home.title")}
              </p>
            </div>

            {/* Description */}
            <p className="font-mono text-sm md:text-base text-text-dim leading-relaxed max-w-2xl">
              {t("home.description")}
            </p>

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary hover:text-helix-cyan transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDescription;
