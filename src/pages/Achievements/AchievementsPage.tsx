import React from 'react';
import AchievementsByYear from '../../components/achievements/AchievementsByYear';
import { useAchievements } from '../../hooks/useAchievements';

const AchievementsPage: React.FC = () => {
  const { achievementsByYear, years } = useAchievements();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-text-primary">Achievements</h1>
      <div className="space-y-8">
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