import { CareerData } from "../../types/Career";
import EntelLogo from "../../assets/images/entel.jpg";
import UChileLogo from "../../assets/images/uchile.jpg";
import BciLogo from "../../assets/images/bci.jpg";

export const careerData: CareerData = {
  companies: [
    {
      title: "Bci Bank",
      alt: "Bci Bank logo",
      role: "Machine Learning Engineer",
      skills:
        "Langchain, Langgraph, RAG, LLMs, Microservices, FastAPI, Azure, Kubernetes",
      period: "August 2025 - Present",
      logo: BciLogo,
    },
    {
      title: "Entel",
      alt: "Entel logo",
      role: "Data Scientist Senior Specialist / AI Engineer",
      skills: "RAG, LLMs, Microservices, FastAPI, AWS",
      period: "March 2025 - August 2025",
      logo: EntelLogo,
    },
    {
      title: "Entel",
      alt: "Entel logo",
      role: "Data Scientist Specialist / AI Engineer",
      skills: "RAG, LLMs, Python, SQL, AWS",
      period: "March 2024 - February 2025",
      logo: EntelLogo,
    },
    {
      title: "Entel",
      alt: "Entel logo",
      role: "Data Scientist",
      skills: "Python, SQL, AWS",
      period: "August 2023 - February 2024",
      logo: EntelLogo,
    },
  ],
  education: [
    {
      institution: "Universidad de Chile",
      degree: "Master's Degree in Data Science",
      period: "2023 - 2024",
      skills: "Machine Learning, Deep Learning, Data Analysis",
      logo: UChileLogo,
    },
    {
      institution: "Universidad de Chile",
      degree: "Bachelor's Degree in Industrial Engineering",
      period: "2018 - 2023",
      skills:
        "Project Management, Data Structures, Statistics, Operations Research",
      logo: UChileLogo,
    },
  ],
};
