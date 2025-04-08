import { CareerData } from "../../types/Career";

// Importar las imágenes (asegúrate de tener estas imágenes en la carpeta assets/images)
import EntelLogo from "../../assets/images/entel.jpg";
import UChileLogo from "../../assets/images/uchile.jpg";

export const careerData: CareerData = {
  companies: [
    {
      title: "Entel",
      alt: "Entel logo",
      role: "Data Scientist Senior Specialist",
      skills: "Python, SQL, AWS",
      period: "March 2025 - Present",
      logo: EntelLogo,
    },
    {
      title: "Entel",
      alt: "Entel logo",
      role: "Data Scientist Specialist",
      skills: "Python, SQL, AWS",
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
