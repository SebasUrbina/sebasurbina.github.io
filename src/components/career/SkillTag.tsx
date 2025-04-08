interface SkillTagProps {
  skill: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => (
  <span className="px-1 text-sm rounded-md bg-secondary text-accent">
    {skill}
  </span>
);

export default SkillTag;
