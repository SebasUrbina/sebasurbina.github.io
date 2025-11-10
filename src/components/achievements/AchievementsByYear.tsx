import React from "react";
import { motion } from "framer-motion";
import { Achievement } from "../../types/Achievement";
import AchievementItem from "./AchievementItem";

interface AchievementsByYearProps {
  year: number;
  achievements: Achievement[];
  isLastYear?: boolean;
}

const AchievementsByYear: React.FC<AchievementsByYearProps> = ({
  year,
  achievements,
  isLastYear = false,
}) => {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative mb-8">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent inline-block">
          {year}
        </h3>
        <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full" />
      </div>
      <div className="ml-4 space-y-0">
        {achievements.map((achievement, index) => (
          <AchievementItem
            key={achievement.id}
            achievement={achievement}
            isLast={isLastYear && index === achievements.length - 1}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsByYear;
