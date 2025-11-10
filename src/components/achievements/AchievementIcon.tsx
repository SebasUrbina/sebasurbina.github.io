import React from "react";
import { getIconComponent, IconKey } from "../../utils/iconMapper";

interface AchievementIconProps {
  icon: IconKey;
}

const AchievementIcon: React.FC<AchievementIconProps> = ({ icon }) => {
  const IconComponent = getIconComponent(icon);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-50 animate-pulse" />
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 shadow-lg border-2 border-white dark:border-gray-800">
        <IconComponent size={24} className="text-white" />
      </div>
    </div>
  );
};

export default AchievementIcon;
