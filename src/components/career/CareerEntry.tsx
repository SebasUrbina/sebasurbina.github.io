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
    <div className="border-l-2 border-helix-cyan/30 pl-6 py-4 hover:border-helix-cyan/60 transition-colors">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={logo}
            alt={alt}
          className="w-12 h-12 rounded-full object-cover border border-helix-cyan/30 bg-white"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
            <div className="flex-1">
              <h3 className="font-mono text-lg text-text-bright mb-1">
                {title}
              </h3>
              <p className="font-mono text-sm text-text-dim">
                {subtitle}
              </p>
            </div>
            <span className="font-mono text-xs text-helix-teal whitespace-nowrap">
              {period}
            </span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skillList.map((skill, index) => (
              <SkillTag key={index} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerEntry;
