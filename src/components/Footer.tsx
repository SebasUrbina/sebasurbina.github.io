import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

type SocialLink = {
  icon: React.ReactNode;
  href: string;
  label: string;
};

type Props = {};

function Footer({}: Props) {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      icon: <FaGithub className="w-5 h-5" />,
      href: "https://github.com/sebasurbina",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/sebaurbina",
      label: "LinkedIn",
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      href: "mailto:sebastian.urbina97@gmail.com",
      label: "Email",
    },
  ];
  return (
    <footer className="w-full py-4 mt-8 theme-transition">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors duration-200"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div className="text-sm text-text-secondary">
            © {currentYear} Sebastián Urbina
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
