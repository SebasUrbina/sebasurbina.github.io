import React from "react";
import SkillTag from "./SkillTag";

interface CareerEntryProps {
  logo: string;
  alt: string;
  title: string;
  subtitle: string;
  period: string;
  skills: string;
}

const CareerEntry: React.FC<CareerEntryProps> = ({
  logo,
  alt,
  title,
  subtitle,
  period,
  skills,
}) => {
  const skillList = skills.split(",").map((skill) => skill.trim());

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-card hover:bg-card-hover transition-colors duration-200">
      <img
        src={logo}
        alt={alt}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            <p className="text-text-secondary">{subtitle}</p>
          </div>
          <span className="text-sm text-text-secondary">{period}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {skillList.map((skill, index) => (
            <SkillTag key={index} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerEntry;
