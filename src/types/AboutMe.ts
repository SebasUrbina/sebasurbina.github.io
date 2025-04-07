import { ReactNode } from 'react';

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: ReactNode;
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: number;
  location: string;
  description?: ReactNode;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface AboutMeData {
  name: string;
  title: string;
  summary: ReactNode;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  socialLinks: SocialLink[];
}

export type ExperienceByCompany = Record<string, ExperienceItem[]>;
export type EducationByYear = Record<number, EducationItem[]>; 