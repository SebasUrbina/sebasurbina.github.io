import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type SocialLink = {
  icon: React.ReactNode;
  href: string;
  label: string;
};

type Props = {};

function Footer({}: Props) {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

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
    <footer className="w-full py-8 mt-12 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-secondary hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500 shadow-md hover:shadow-lg"
                aria-label={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          <motion.div
            className="text-sm text-text-secondary dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {t("footer.copyright", { year: currentYear.toString() })}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
