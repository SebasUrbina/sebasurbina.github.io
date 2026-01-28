import React from "react";

interface SkillTagProps {
  skill: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => (
  <span className="font-mono text-xs px-2 py-1 border border-helix-cyan/30 text-text-dim hover:text-helix-cyan hover:border-helix-cyan/60 transition-colors">
    {skill}
  </span>
);

export default SkillTag;
