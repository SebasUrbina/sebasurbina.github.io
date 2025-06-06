import React from "react";
import { getIconComponent, IconKey } from "../../utils/iconMapper";

interface AchievementIconProps {
  icon: IconKey;
}

const AchievementIcon: React.FC<AchievementIconProps> = ({ icon }) => {
  const IconComponent = getIconComponent(icon);

  return (
    <div
      className="flex items-center bg-secondary justify-center w-12 h-12 rounded-full theme-transition"
      style={{
        color: "var(--color-accent)",
      }}
    >
      <IconComponent size={20} />
    </div>
  );
};

export default AchievementIcon;
