import React from "react";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { careerData } from "../../content/about/career";
import CareerEntry from "./CareerEntry";

const Career: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Experiencia Laboral */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <FaBriefcase className="text-xl text-accent" />
          <h2 className="text-2xl font-bold text-text-primary">Career</h2>
          <hr className="w-full border-t border-accent mt-2 border-gray-300" />
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

      {/* Educación */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <FaGraduationCap className="text-xl text-accent" />
          <h2 className="text-2xl font-bold text-text-primary">Education</h2>
          <hr className="w-full border-t border-accent mt-2 border-gray-300" />
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
