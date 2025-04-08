export interface Company {
  title: string;
  alt: string;
  role: string;
  skills: string;
  period: string;
  logo: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  skills: string;
  logo: string;
}

export interface CareerData {
  companies: Company[];
  education: Education[];
} 