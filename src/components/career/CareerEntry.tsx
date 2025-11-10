import React from "react";
import { motion } from "framer-motion";
import SkillTag from "./SkillTag";

interface CareerEntryProps {
  logo: string;
  alt: string;
  title: string;
  subtitle: string;
  period: string;
  skills: string;
}

const CareerEntry: React.FC<CareerEntryProps> = ({
  logo,
  alt,
  title,
  subtitle,
  period,
  skills,
}) => {
  const skillList = skills.split(",").map((skill) => skill.trim());

  return (
    <motion.div
      className="group relative"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-start gap-6 p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300">
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <div className="bg-white dark:bg-gray-800 rounded-full p-1">
              <img
                src={logo}
                alt={alt}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-primary dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
              </h3>
              <p className="text-base text-text-secondary dark:text-gray-300">
                {subtitle}
              </p>
            </div>
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-600/30 dark:to-purple-600/30 text-blue-700 dark:text-blue-300 whitespace-nowrap">
              {period}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillList.map((skill, index) => (
              <SkillTag key={index} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerEntry;
