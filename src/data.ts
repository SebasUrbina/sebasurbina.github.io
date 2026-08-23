import firstPost from "./content/posts/my-first-step-on-javascript.md?raw";
import solidPost from "./content/posts/solid-principles.md?raw";
import financePost from "./content/posts/my-personal-finance-app.md?raw";
import type { Post } from "./types";

export const personalInfo = {
  role: "developer + builder",
  location: "Santiago, Chile",
  focus: "Generative AI",
  stack:
    "Python · TypeScript · JavaScript · SQL · Docker · FastAPI · AWS · GCP · Azure · Kubernetes",
  education: "M.Sc. Data Science · U. de Chile",
  status: "Always learning",
};

export const posts: Post[] = [
  {
    date: "08 JUN 2026",
    title: "Mi app de finanzas personales",
    tag: "serverless",
    excerpt:
      "Cómo una idea con Atajos de iOS y AWS Lambda evolucionó a una aplicación completa sobre Cloudflare.",
    content: financePost,
  },
  {
    date: "01 JUN 2025",
    title: "Principios SOLID en Python",
    tag: "python · oop",
    excerpt:
      "Cinco principios de diseño para crear software más mantenible, flexible y escalable.",
    content: solidPost,
  },
  {
    date: "02 MAY 2025",
    title: "Mi primer paso en JavaScript",
    tag: "javascript",
    excerpt:
      "Notas y ejercicios de mis primeros pasos aprendiendo JavaScript desde sus fundamentos.",
    content: firstPost,
  },
];

export const experience = [
  {
    icon: "B",
    name: "Bci Bank",
    role: "Machine Learning Engineer",
    period: "ago 2025 — presente",
    skills: "LangChain · LangGraph · RAG · LLMs · FastAPI · Azure · Kubernetes",
    color: "pink",
  },
  {
    icon: "E",
    name: "Entel",
    role: "Data Scientist Senior Specialist / AI Engineer",
    period: "mar — ago 2025",
    skills: "RAG · LLMs · Microservices · FastAPI · AWS",
    color: "gold",
  },
  {
    icon: "E",
    name: "Entel",
    role: "Data Scientist Specialist / AI Engineer",
    period: "mar 2024 — feb 2025",
    skills: "RAG · LLMs · Python · SQL · AWS",
    color: "blue",
  },
  {
    icon: "E",
    name: "Entel",
    role: "Data Scientist",
    period: "ago 2023 — feb 2024",
    skills: "Python · SQL · AWS",
    color: "lime",
  },
];
export const education = [
  {
    degree: "Magíster en Ciencia de Datos",
    period: "2023 — 2024",
    skills: "Machine Learning · Deep Learning · Data Analysis",
  },
  {
    degree: "Ingeniería Civil Industrial",
    period: "2018 — 2023",
    skills: "Estadística · Investigación de Operaciones · Gestión de Proyectos",
  },
];
export const achievements = [
  {
    year: "2025",
    text: "Construí una API serverless para registrar gastos personales con AWS Lambda y API Gateway.",
  },
  {
    year: "2025",
    text: "Implementé un bot de Telegram serverless con AWS Lambda y DynamoDB.",
  },
  {
    year: "2024",
    text: "Obtuve el Magíster en Ciencia de Datos y el título de Ingeniería Civil Industrial.",
  },
  {
    year: "2024",
    text: "Completé Programming with JavaScript e Introduction to Front-End Development de Meta.",
  },
  {
    year: "2024",
    text: "Comencé mi camino como desarrollador aprendiendo JavaScript, TypeScript y Docker.",
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/SebasUrbina",
    label: "GH",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/sebaurbina",
    label: "in",
  },
  {
    name: "Correo",
    url: "mailto:sebastian.urbina97@gmail.com",
    label: "@",
  },
];

export const changelog = [
  {
    date: "22 AGO 2026",
    type: "project",
    title: {
      es: "Renovación completa de mi sitio web",
      en: "Complete website redesign",
    },
    description: {
      es: "Rediseñé y migré completamente mi sitio web hacia una experiencia inspirada en Omarchy y los escritorios Linux. Incorporé un diseño más atractivo, command palette, soporte bilingüe, blog, trayectoria, descarga interactiva del CV y esta bitácora de aprendizaje.",
      en: "Completely redesigned and migrated my website into an experience inspired by Omarchy and Linux desktops. Added a more engaging design, command palette, bilingual support, blog, career history, interactive CV download, and this learning changelog.",
    },
    tags: ["React", "TypeScript", "Vite", "Omarchy", "UI/UX", "GitHub Pages"],
    resources: [
      {
        name: "Source code",
        url: "https://github.com/SebasUrbina/sebasurbina.github.io",
      },
      {
        name: "Live site",
        url: "https://sebasurbina.github.io/",
      },
    ],
    link: {
      label: "GitHub · sitio web",
      url: "https://github.com/SebasUrbina/sebasurbina.github.io",
    },
  },
  {
    date: "21 AGO 2026",
    type: "achievement",
    title: {
      es: "Automatización de facturación para Fundación DEBRA Chile",
      en: "Invoice automation for Fundación DEBRA Chile",
    },
    description: {
      es: "Construí y entregué una solución que reemplaza el procesamiento manual de facturas por un flujo automatizado sobre Google Apps Script. La aplicación utiliza Gemini para procesar la información y sirve una interfaz web para operar el proceso de punta a punta.",
      en: "Built and delivered a solution that replaces manual invoice processing with an automated workflow on Google Apps Script. The application uses Gemini to process the information and serves a web interface to operate the end-to-end workflow.",
    },
    tags: ["Google Apps Script", "Gemini", "Automation", "Frontend", "Social impact"],
    resources: [
      {
        name: "Source code",
        url: "https://github.com/SebasUrbina/worfklow-facturacion-appscript",
      },
    ],
    link: {
      label: "GitHub · workflow facturación",
      url: "https://github.com/SebasUrbina/worfklow-facturacion-appscript",
    },
  },
  {
    date: "AGO 2026",
    type: "learning",
    title: {
      es: "Curso full stack de desarrollo con midudev",
      en: "Full-stack development course with midudev",
    },
    description: {
      es: "Estoy completando un curso full stack de desarrollo de más de 24 horas creado por midudev. Lo estoy utilizando para complementar y consolidar mi aprendizaje previo, mientras descubro nuevas herramientas para desarrollo, despliegue y visualización web.",
      en: "I am completing a full-stack development course by midudev that runs for more than 24 hours. I am using it to complement and consolidate my previous learning while discovering new tools for web development, deployment, and visualization.",
    },
    tags: ["JavaScript", "Full stack", "Babel", "GoJS", "npm trends", "Netlify Drop", "Unavatar"],
    resources: [
      { name: "Aprende JavaScript", url: "https://www.aprendejavascript.dev/" },
      { name: "Babel", url: "https://babeljs.io/" },
      { name: "GoJS", url: "https://gojs.net/latest/" },
      { name: "npm trends", url: "https://npmtrends.com/" },
      { name: "Netlify Drop", url: "https://app.netlify.com/drop" },
      { name: "Unavatar", url: "https://unavatar.io/" },
    ],
    link: {
      label: "YouTube · midudev",
      url: "https://www.youtube.com/watch?v=mXpWhmJXV0o&t=10679s",
    },
  },
  {
    date: "JUN 2026",
    type: "learning",
    title: {
      es: "Instalación de Omarchy Linux en dual boot",
      en: "Omarchy Linux dual-boot installation",
    },
    description: {
      es: "Instalé Omarchy Linux junto a mi sistema existente mediante dual boot. La experiencia me permitió profundizar en Arch Linux, conocer mejor sus herramientas y adoptar un entorno de desarrollo más nativo de Linux.",
      en: "Installed Omarchy Linux alongside my existing operating system using dual boot. The experience helped me go deeper into Arch Linux, understand its tooling, and adopt a more Linux-native development environment.",
    },
    tags: ["Omarchy", "Arch Linux", "Dual boot", "Linux", "Developer environment"],
  },
  {
    date: "2026",
    type: "mastery",
    title: {
      es: "Especialización en LangChain y LangGraph",
      en: "LangChain and LangGraph specialization",
    },
    description: {
      es: "Completé la documentación de LangChain y LangGraph, profundizando en agentes, grafos, memoria, herramientas, RAG, evaluación y observabilidad.",
      en: "Completed the LangChain and LangGraph documentation, going deep into agents, graphs, memory, tools, RAG, evaluation, and observability.",
    },
    tags: ["LangChain", "LangGraph", "Agents", "RAG", "LangSmith"],
    resources: [
      { name: "LangChain Docs", url: "https://docs.langchain.com/oss/python/langchain/overview" },
      { name: "LangGraph Docs", url: "https://docs.langchain.com/oss/python/langgraph/overview" },
      { name: "LangSmith Docs", url: "https://docs.langchain.com/langsmith/home" },
    ],
    link: { label: "LangChain Docs", url: "https://docs.langchain.com/" },
  },
  {
    date: "2025",
    type: "project",
    title: {
      es: "Aplicación de finanzas serverless",
      en: "Serverless personal finance application",
    },
    description: {
      es: "Construí una solución para registrar gastos que evolucionó desde AWS Lambda y Google Sheets hacia Cloudflare Workers y D1.",
      en: "Built an expense tracking solution that evolved from AWS Lambda and Google Sheets to Cloudflare Workers and D1.",
    },
    tags: ["AWS Lambda", "Cloudflare Workers", "D1", "Serverless"],
  },
  {
    date: "2024",
    type: "achievement",
    title: {
      es: "Magíster en Ciencia de Datos",
      en: "Master's Degree in Data Science",
    },
    description: {
      es: "Obtuve mi grado de Magíster en Ciencia de Datos en la Universidad de Chile.",
      en: "Earned my Master's Degree in Data Science from Universidad de Chile.",
    },
    tags: ["Machine Learning", "Deep Learning", "Data Science"],
  },
] as const;
