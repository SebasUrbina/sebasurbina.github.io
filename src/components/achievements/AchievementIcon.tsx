import React from "react";
import { getIconComponent, IconKey } from "../../utils/iconMapper";

interface AchievementIconProps {
  icon: IconKey;
}

const AchievementIcon: React.FC<AchievementIconProps> = ({ icon }) => {
  const IconComponent = getIconComponent(icon);

  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-helix-cyan/50 bg-space-darker">
      <IconComponent size={20} className="text-helix-cyan" />
    </div>
  );
};

export default AchievementIcon;
