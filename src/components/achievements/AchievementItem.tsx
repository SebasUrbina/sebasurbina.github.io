import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Achievement } from "../../types/Achievement";
import AchievementIcon from "./AchievementIcon";

interface AchievementItemProps {
  achievement: Achievement;
  isLast?: boolean;
  index?: number;
}

const AchievementItem: React.FC<AchievementItemProps> = ({
  achievement,
  isLast = false,
  index = 0,
}) => {
  return (
    <motion.div
      className="flex items-start relative group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Icono */}
      <motion.div
        className="z-10"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <AchievementIcon icon={achievement.icon} />
      </motion.div>

      {/* Línea conectora */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-full -ml-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent dark:from-blue-400/50 dark:via-purple-400/50"></div>
      )}

      {/* Contenido */}
      <motion.div
        className="ml-6 pb-10 flex-1"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-md hover:shadow-lg transition-all duration-300 group-hover:bg-white/80 dark:group-hover:bg-gray-800/80">
          <div className="text-text-primary dark:text-white text-base leading-relaxed">
            {achievement.content}
            {achievement.link && (
              <Link
                to={achievement.link.url}
                className="ml-2 font-semibold text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors inline-flex items-center gap-1 group/link"
              >
                {achievement.link.text}
                <span className="group-hover/link:translate-x-1 transition-transform inline-block">
                  →
                </span>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AchievementItem;
