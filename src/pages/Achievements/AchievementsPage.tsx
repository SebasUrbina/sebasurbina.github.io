import React from "react";
import AchievementsByYear from "../../components/achievements/AchievementsByYear";
import { useAchievements } from "../../hooks/useAchievements";
import { motion } from "framer-motion";

const AchievementsPage: React.FC = () => {
  const { achievementsByYear, years } = useAchievements();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-text-primary">
        Achievements
      </h1>
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {years.map((year: number, index: number) => (
          <AchievementsByYear
            key={year}
            year={year}
            achievements={achievementsByYear[year]}
            isLastYear={index === years.length - 1}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AchievementsPage;
