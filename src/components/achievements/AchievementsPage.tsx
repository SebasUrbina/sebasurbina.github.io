import React from "react";
import { useAchievements } from "../../hooks/useAchievements";
import AchievementsByYear from "./AchievementsByYear";

const AchievementsPage: React.FC = () => {
  const { achievementsByYear, years } = useAchievements();

  return (
    <div className="container py-12 fade-in">
      <h1 className="text-4xl font-bold mb-8 theme-transition text-primary">
        Logros
      </h1>

      <div className="mt-10">
        {years.map((year: number, index: number) => (
          <AchievementsByYear
            key={year}
            year={year}
            achievements={achievementsByYear[year]}
            isLastYear={index === years.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
