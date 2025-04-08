import { useMemo } from 'react';
import { 
  AboutMeData, 
  ExperienceItem, 
  EducationItem,
  ExperienceByCompany,
  EducationByYear
} from '../types/AboutMe';
import { aboutMeData } from '../content/about/data';
import { groupBy, getSortedKeys, sortItems } from '../utils/contentProcessor';

/**
 * Hook para gestionar los datos de la sección 'Sobre mí'
 * Utilizando el mismo patrón que el hook de logros
 */
export const useAboutMe = () => {
  // Cargar datos estáticos
  const aboutMe: AboutMeData = useMemo(() => aboutMeData, []);
  
  // Experiencia agrupada por compañía
  const experienceByCompany: ExperienceByCompany = useMemo(() => {
    return groupBy(aboutMe.experience, (item) => item.company);
  }, [aboutMe.experience]);
  
  // Compañías ordenadas alfabéticamente
  const companies = useMemo(() => {
    return getSortedKeys(experienceByCompany, (a, b) => a.localeCompare(b));
  }, [experienceByCompany]);
  
  // Educación agrupada por año
  const educationByYear: EducationByYear = useMemo(() => {
    return groupBy(aboutMe.education, (item) => item.year);
  }, [aboutMe.education]);
  
  // Años de educación ordenados de forma descendente
  const educationYears = useMemo(() => {
    return getSortedKeys(educationByYear);
  }, [educationByYear]);
  
  // Experiencia ordenada cronológicamente (más reciente primero)
  const sortedExperience: ExperienceItem[] = useMemo(() => {
    return sortItems(aboutMe.experience, (a, b) => {
      // Extrae el año de inicio de cada período (asumiendo formato "YYYY - Presente" o "YYYY - YYYY")
      const yearA = parseInt(a.period.split(' - ')[0], 10);
      const yearB = parseInt(b.period.split(' - ')[0], 10);
      return yearB - yearA; // Orden descendente
    });
  }, [aboutMe.experience]);
  
  // Habilidades agrupadas por categoría
  const skillsByCategory = useMemo(() => {
    return aboutMe.skills.reduce((acc, category) => {
      acc[category.name] = category.skills;
      return acc;
    }, {} as Record<string, string[]>);
  }, [aboutMe.skills]);
  
  return {
    aboutMe,
    experienceByCompany,
    companies,
    educationByYear,
    educationYears,
    sortedExperience,
    skillsByCategory
  };
};

export default useAboutMe; 