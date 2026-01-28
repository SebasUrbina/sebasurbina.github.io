import React from "react";
import AchievementsByYear from "../../components/achievements/AchievementsByYear";
import { useAchievements } from "../../hooks/useAchievements";
import { useLanguage } from "@/contexts/LanguageContext";

const AchievementsPage: React.FC = () => {
  const { achievementsByYear, years } = useAchievements();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="font-mono text-3xl text-helix-cyan mb-2">
            &gt;&gt; {t("achievements.title")}
          </h1>
          <p className="font-mono text-sm text-text-dim pl-4">
            {t("achievements.description")}
          </p>
        </div>

        {/* Achievements Content */}
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
    </div>
  );
};

export default AchievementsPage;
