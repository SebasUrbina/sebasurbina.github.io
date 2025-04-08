import {
  FaCode,
  FaUsers,
  FaBlog,
  FaGithub,
  FaChartBar,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
// Definir el tipo de iconos válidos
export type IconKey =
  | "code"
  | "family"
  | "blog"
  | "github"
  | "stats"
  | "portfolio"
  | "education"
  | "coursera"
  | "aws"
  | string;

// Mapper para convertir strings a componentes de react-icons
export const iconMapper: Record<string, IconType> = {
  code: FaCode,
  family: FaUsers,
  blog: FaBlog,
  github: FaGithub,
  stats: FaChartBar,
  portfolio: FaBriefcase,
  education: FaGraduationCap,
  coursera: SiCoursera,
  aws: FaAws,
};

// Función para obtener el componente de icono a partir de la clave
export const getIconComponent = (iconKey: IconKey): IconType => {
  return iconMapper[iconKey] || FaCode; // FaCode como fallback por defecto
};
