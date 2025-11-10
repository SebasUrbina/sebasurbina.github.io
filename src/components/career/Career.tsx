import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { useCareerData } from "../../hooks/useCareerData";
import CareerEntry from "./CareerEntry";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Career: React.FC = () => {
  const { t } = useLanguage();
  const careerData = useCareerData();
  return (
    <div className="space-y-12">
      {/* Experiencia Laboral */}
      <section>
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {t("about.career")}
          </h2>
        </motion.div>
        <div className="space-y-4">
          {careerData.companies.map((company, index) => (
            <motion.div
              key={`${company.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CareerEntry
                logo={company.logo}
                alt={company.alt}
                title={company.title}
                subtitle={company.role}
                period={company.period}
                skills={company.skills}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Educación */}
      <section>
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {t("about.educationLabel")}
          </h2>
        </motion.div>
        <div className="space-y-4">
          {careerData.education.map((edu, index) => (
            <motion.div
              key={`${edu.institution}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CareerEntry
                logo={edu.logo}
                alt={`${edu.institution} logo`}
                title={edu.institution}
                subtitle={edu.degree}
                period={edu.period}
                skills={edu.skills}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Career;
