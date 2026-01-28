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
    <div className="flex items-start relative group">
      {/* Icon */}
      <div className="z-10">
        <AchievementIcon icon={achievement.icon} />
      </div>

      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-full -ml-0.5 bg-helix-cyan/20"></div>
      )}

      {/* Content */}
      <div className="ml-6 pb-10 flex-1">
        <div className="p-4 border border-helix-cyan/20 hover:border-helix-cyan/40 transition-colors">
          <div className="font-mono text-sm text-text-primary leading-relaxed">
            {achievement.content}
            {achievement.link && (
              <Link
                to={achievement.link.url}
                className="ml-2 text-helix-cyan hover:text-helix-teal transition-colors inline-flex items-center gap-1"
              >
                {achievement.link.text}
                <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementItem;
