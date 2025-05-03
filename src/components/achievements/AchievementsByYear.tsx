import React from "react";
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
    <div className="mb-8">
      <h3 className="text-2xl text-primary font-bold mb-6 theme-transition">
        {year}
      </h3>
      <div className="ml-2">
        {achievements.map((achievement, index) => (
          <AchievementItem
            key={achievement.id}
            achievement={achievement}
            isLast={isLastYear && index === achievements.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementsByYear;
