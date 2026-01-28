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
    <div className="mb-12">
      {/* Year Header */}
      <div className="mb-6">
        <h3 className="font-mono text-2xl text-helix-cyan">
          &gt;&gt; {year}
        </h3>
        <div className="h-px bg-helix-cyan/30 mt-2" />
      </div>

      {/* Achievements List */}
      <div className="ml-4 space-y-0">
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
