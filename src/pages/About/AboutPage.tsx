import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Career from "../../components/career/Career";

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="font-mono text-3xl text-helix-cyan mb-2">
            &gt;&gt; {t("about.title")}
          </h1>
          <p className="font-mono text-sm text-text-dim pl-4">
            {t("about.description")}
          </p>
        </div>

        {/* Career Section */}
        <Career />
      </div>
    </div>
  );
};

export default AboutPage;
