import React from "react";
import { AboutMeData } from "../../types/AboutMe";

/**
 * Datos estáticos para la sección 'Sobre mí'
 * Separados para facilitar el mantenimiento y la modificación
 * Siguiendo el mismo patrón que los logros
 */
export const aboutMeData: AboutMeData = {
  name: "Sebastián Urbina",
  title: "Desarrollador Full Stack",
  summary: (
    <>
      <p>
        Desarrollador de software con más de 5 años de experiencia,
        especializado en tecnologías frontend y backend modernas. Me apasiona
        crear productos digitales que tengan un impacto positivo en las
        personas.
      </p>
      <p>
        Cuando no estoy programando, disfruto leyendo sobre nuevas tecnologías,
        tocando guitarra y explorando nuevos lugares con mis amigos.
      </p>
    </>
  ),

  experience: [
    {
      id: "exp1",
      title: "Senior Frontend Developer",
      company: "Tech Innovations",
      period: "2022 - Presente",
      location: "Santiago, Chile",
      description: (
        <ul>
          <li>Desarrollo de aplicaciones web con React, TypeScript</li>
          <li>Implementación de arquitecturas frontend escalables</li>
        </ul>
      ),
      technologies: [
        "React",
        "TypeScript",
        "Next.js",
        "GraphQL",
        "Tailwind CSS",
      ],
    },
    {
      id: "exp2",
      title: "Desarrollador Full Stack",
      company: "Digital Solutions",
      period: "2020 - 2022",
      location: "Viña del Mar, Chile",
      description: (
        <ul>
          <li>Desarrollo de APIs RESTful con Node.js y Express</li>
          <li>Implementación de interfaces con React y Vue.js</li>
          <li>Integración con bases de datos SQL y NoSQL</li>
        </ul>
      ),
      technologies: ["Node.js", "Express", "MongoDB", "React", "Vue.js"],
    },
    {
      id: "exp3",
      title: "Desarrollador Web Junior",
      company: "WebCraft",
      period: "2018 - 2020",
      location: "Santiago, Chile",
      description: (
        <ul>
          <li>Desarrollo de sitios web responsivos</li>
          <li>Mantenimiento de aplicaciones PHP existentes</li>
          <li>Integración con CMS como WordPress</li>
        </ul>
      ),
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
    },
  ],

  education: [
    {
      id: "edu1",
      degree: "Ingeniería Informática",
      institution: "Universidad de Chile",
      year: 2018,
      location: "Santiago, Chile",
      description:
        "Especialización en desarrollo de software y sistemas informáticos",
    },
    {
      id: "edu2",
      degree: "Bootcamp Full Stack JavaScript",
      institution: "Coding Academy",
      year: 2017,
      location: "Online",
    },
  ],

  skills: [
    {
      id: "skills1",
      name: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML/CSS"],
    },
    {
      id: "skills2",
      name: "Backend",
      skills: ["Node.js", "Express", "Python", "Django", "GraphQL"],
    },
    {
      id: "skills3",
      name: "Bases de datos",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
    },
    {
      id: "skills4",
      name: "DevOps",
      skills: ["Docker", "GitHub Actions", "AWS", "Vercel", "Netlify"],
    },
  ],

  socialLinks: [
    {
      id: "social1",
      platform: "GitHub",
      url: "https://github.com/sebasurbina",
      icon: "github",
    },
    {
      id: "social2",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/sebastianurbina",
      icon: "linkedin",
    },
    {
      id: "social3",
      platform: "Twitter",
      url: "https://twitter.com/sebastianurbina",
      icon: "twitter",
    },
  ],
};
