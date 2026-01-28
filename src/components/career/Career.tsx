import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { useCareerData } from "../../hooks/useCareerData";
import CareerEntry from "./CareerEntry";
import { useLanguage } from "@/contexts/LanguageContext";

const Career: React.FC = () => {
  const { t } = useLanguage();
  const careerData = useCareerData();
  
  return (
    <div className="space-y-12">
      {/* Work Experience */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-5 h-5 text-helix-cyan" />
          <h2 className="font-mono text-2xl text-text-bright">
            {t("about.career")}
          </h2>
        </div>
        <div className="space-y-4">
          {careerData.companies.map((company, index) => (
            <CareerEntry
              key={`${company.title}-${index}`}
              logo={company.logo}
              alt={company.alt}
              title={company.title}
              subtitle={company.role}
              period={company.period}
              skills={company.skills}
            />
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-5 h-5 text-helix-cyan" />
          <h2 className="font-mono text-2xl text-text-bright">
            {t("about.educationLabel")}
          </h2>
        </div>
        <div className="space-y-4">
          {careerData.education.map((edu, index) => (
            <CareerEntry
              key={`${edu.institution}-${index}`}
              logo={edu.logo}
              alt={`${edu.institution} logo`}
              title={edu.institution}
              subtitle={edu.degree}
              period={edu.period}
              skills={edu.skills}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Career;
