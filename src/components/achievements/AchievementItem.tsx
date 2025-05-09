import React from "react";
import { Link } from "react-router-dom";
import { Achievement } from "../../types/Achievement";
import AchievementIcon from "./AchievementIcon";

interface AchievementItemProps {
  achievement: Achievement;
  isLast?: boolean;
}

const AchievementItem: React.FC<AchievementItemProps> = ({
  achievement,
  isLast = false,
}) => {
  return (
    <div className="flex items-start relative">
      {/* Icono */}
      <div className="z-10">
        <AchievementIcon icon={achievement.icon} />
      </div>

      {/* Línea conectora */}
      {!isLast && (
        <div className="absolute bg-secondary left-6 top-12 w-0.5 h-full -ml-0.5 theme-transition"></div>
      )}

      {/* Contenido */}
      <div className="ml-4 pb-10">
        <div className="theme-transition text-primary">
          {achievement.content}
          {achievement.link && (
            <Link to={achievement.link.url} className="ml-2 theme-transition">
              {achievement.link.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementItem;
