import { useMemo } from "react";
import { CareerData } from "../types/Career";
import EntelLogo from "../assets/images/entel.jpg";
import UChileLogo from "../assets/images/uchile.jpg";
import BciLogo from "../assets/images/bci.jpg";
import { useLanguage } from "../contexts/LanguageContext";

export const useCareerData = (): CareerData => {
  const { t } = useLanguage();

  return useMemo(
    () => ({
      companies: [
        {
          title: t("about.companies.bci.title"),
          alt: "Bci Bank logo",
          role: t("about.companies.bci.role1"),
          skills:
            "Langchain, Langgraph, RAG, LLMs, Microservices, FastAPI, Azure, Kubernetes",
          period: t("about.companies.bci.period1"),
          logo: BciLogo,
        },
        {
          title: t("about.companies.entel.title"),
          alt: "Entel logo",
          role: t("about.companies.entel.role1"),
          skills: "RAG, LLMs, Microservices, FastAPI, AWS",
          period: t("about.companies.entel.period1"),
          logo: EntelLogo,
        },
        {
          title: t("about.companies.entel.title"),
          alt: "Entel logo",
          role: t("about.companies.entel.role2"),
          skills: "RAG, LLMs, Python, SQL, AWS",
          period: t("about.companies.entel.period2"),
          logo: EntelLogo,
        },
        {
          title: t("about.companies.entel.title"),
          alt: "Entel logo",
          role: t("about.companies.entel.role3"),
          skills: "Python, SQL, AWS",
          period: t("about.companies.entel.period3"),
          logo: EntelLogo,
        },
      ],
      education: [
        {
          institution: t("about.education.uchile.institution"),
          degree: t("about.education.uchile.degree1"),
          period: t("about.education.uchile.period1"),
          skills: "Machine Learning, Deep Learning, Data Analysis",
          logo: UChileLogo,
        },
        {
          institution: t("about.education.uchile.institution"),
          degree: t("about.education.uchile.degree2"),
          period: t("about.education.uchile.period2"),
          skills:
            "Project Management, Data Structures, Statistics, Operations Research",
          logo: UChileLogo,
        },
      ],
    }),
    [t]
  );
};

export default useCareerData;
