interface SkillTagProps {
  skill: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => (
  <span className="px-2 text-sm rounded-md bg-gray-500 text-accent">
    {skill}
  </span>
);

export default SkillTag;
