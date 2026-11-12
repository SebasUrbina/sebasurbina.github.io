import transformersPost from "./content/posts/entre-transformers-y-emociones.md?raw";
import firstPost from "./content/posts/my-first-step-on-javascript.md?raw";
import solidPost from "./content/posts/solid-principles.md?raw";
import financePost from "./content/posts/my-personal-finance-app.md?raw";
import type { Channel, Post, Project, StackGroup } from "./types";

export const personalInfo = {
  role: "ML Engineer @ Bci",
  location: "Santiago, Chile",
  focus: "GenAI · Agents · RAG",
  stack: "Python · LangChain · LangGraph · MCP · FastAPI · AWS · Docker · Kubernetes",
};

export const posts: Post[] = [
  {
    date: "12 NOV 2026",
    title: "Entre Transformers y emociones",
    tag: "ia · reflexión",
    excerpt:
      "Sobre cómo ha cambiado nuestra forma de trabajar, el valor de los fundamentos y la importancia de no perder aquello que nos hace humanos.",
    content: transformersPost,
  },
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

export const projects: Project[] = [
  {
    id: "bank-sales-agent",
    name: "Bank Sales Agent",
    year: "2026",
    status: { es: "template", en: "template" },
    summary: {
      es: "Template de backend de agente para Google Chat con LangChain, MCP y Databricks.",
      en: "Agent backend template for Google Chat with LangChain, MCP and Databricks.",
    },
    description: {
      es: "Agente para ejecutivos bancarios con FastAPI y LangChain create_agent bajo Clean Architecture. Las tools viven en un servidor FastMCP que autoriza por rol con JWT, consulta Databricks con alcance por cartera y devuelve cards de Google Chat que un middleware publica en el hilo. Suma skills con carga progresiva y memoria conversacional en MongoDB.",
      en: "An agent for bank executives built with FastAPI and LangChain create_agent following Clean Architecture. Tools live in a FastMCP server that authorizes by role with JWT, queries Databricks scoped to each portfolio, and returns Google Chat cards that a middleware posts to the thread. It adds progressively loaded skills and conversational memory in MongoDB.",
    },
    stack: [
      "Python",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "MCP",
      "FastMCP",
      "Agents",
      "LLMs",
      "Databricks",
      "MongoDB",
      "Google Apps Script",
      "Clean Architecture",
    ],
    architecture: [
      [
        { label: "Google Chat", detail: { es: "ejecutivo", en: "executive" }, kind: "client" },
        { label: "Apps Script", detail: { es: "normaliza eventos", en: "normalizes events" }, kind: "client" },
      ],
      [{ label: "FastAPI", detail: { es: "202 + BackgroundTasks", en: "202 + BackgroundTasks" }, kind: "compute" }],
      [
        { label: "create_agent", detail: { es: "LangChain · middleware", en: "LangChain · middleware" }, kind: "ai" },
        { label: "LLM Gateway", detail: { es: "APIM", en: "APIM" }, kind: "ai" },
        { label: "MongoDB", detail: { es: "checkpoints", en: "checkpoints" }, kind: "data" },
      ],
      [{ label: "FastMCP", detail: { es: "JWT · roles · cardsV2", en: "JWT · roles · cardsV2" }, kind: "compute" }],
      [{ label: "Databricks", detail: { es: "SQL Warehouse", en: "SQL Warehouse" }, kind: "data" }],
    ],
    links: [{ label: "repo", url: "https://github.com/SebasUrbina/bank-sales-agent" }],
  },
  {
    id: "portfolio",
    name: "sebasurbina.github.io",
    year: "2026",
    status: { es: "en vivo", en: "live" },
    summary: {
      es: "Este sitio: un escritorio Linux en el navegador.",
      en: "This site: a Linux desktop in your browser.",
    },
    description: {
      es: "React 19, TypeScript y Vite, sin librerías de UI. Cada push a main se construye con pnpm en GitHub Actions y se publica en GitHub Pages.",
      en: "React 19, TypeScript and Vite, no UI libraries. Every push to main is built with pnpm on GitHub Actions and published to GitHub Pages.",
    },
    stack: ["React", "TypeScript", "Vite", "GitHub Actions", "GitHub Pages"],
    architecture: [
      [{ label: "git push", detail: { es: "rama main", en: "main branch" }, kind: "client" }],
      [{ label: "GitHub Actions", detail: { es: "pnpm build", en: "pnpm build" }, kind: "compute" }],
      [{ label: "GitHub Pages", detail: { es: "sitio estático", en: "static site" }, kind: "data" }],
    ],
    links: [{ label: "repo", url: "https://github.com/SebasUrbina/sebasurbina.github.io" }],
  },
  {
    id: "debra",
    name: "DEBRA Chile",
    year: "2026",
    status: { es: "entregado", en: "delivered" },
    summary: {
      es: "Automatización de facturas con Gemini para una fundación.",
      en: "Gemini-powered invoice automation for a foundation.",
    },
    description: {
      es: "Reemplaza el procesamiento manual de facturas de Fundación DEBRA Chile por un flujo automatizado en Google Apps Script. Gemini procesa la información y una interfaz web permite operar el proceso de punta a punta.",
      en: "Replaces Fundación DEBRA Chile's manual invoice processing with an automated Google Apps Script workflow. Gemini processes the information and a web interface runs the process end to end.",
    },
    stack: ["Google Apps Script", "Gemini", "LLMs", "JavaScript", "Automation"],
    architecture: [
      [{ label: "Web UI", detail: { es: "servida por Apps Script", en: "served by Apps Script" }, kind: "client" }],
      [{ label: "Apps Script", detail: { es: "orquesta el flujo", en: "orchestrates the workflow" }, kind: "compute" }],
      [{ label: "Gemini", detail: { es: "procesa las facturas", en: "processes invoices" }, kind: "ai" }],
    ],
    links: [{ label: "repo", url: "https://github.com/SebasUrbina/worfklow-facturacion-appscript" }],
  },
  {
    id: "seva",
    name: "Seva",
    year: "2025 — 2026",
    status: { es: "en uso", en: "live" },
    summary: {
      es: "App de finanzas personales 100% serverless sobre Cloudflare.",
      en: "100% serverless personal finance app on Cloudflare.",
    },
    description: {
      es: "Cada pago con Apple Wallet dispara un Atajo de iOS que llama a una API en Cloudflare Workers y guarda la transacción en D1. Incluye un frontend completo en Cloudflare Pages, todo dentro de la capa gratuita.",
      en: "Every Apple Wallet payment triggers an iOS Shortcut that calls an API on Cloudflare Workers and stores the transaction in D1. It ships a full frontend on Cloudflare Pages, all within the free tier.",
    },
    stack: ["Cloudflare Workers", "Cloudflare D1", "Cloudflare Pages", "iOS Shortcuts", "Serverless", "SQL"],
    architecture: [
      [
        { label: "iOS Shortcut", detail: { es: "trigger: Apple Wallet", en: "trigger: Apple Wallet" }, kind: "client" },
        { label: "Frontend", detail: { es: "Cloudflare Pages", en: "Cloudflare Pages" }, kind: "client" },
      ],
      [{ label: "Worker API", detail: { es: "edge · V8 isolates", en: "edge · V8 isolates" }, kind: "compute" }],
      [{ label: "D1", detail: { es: "SQLite serverless", en: "serverless SQLite" }, kind: "data" }],
    ],
    links: [
      { label: "repo", url: "https://github.com/SebasUrbina/serverless-expense-api" },
      { label: "app", url: "https://seva-app-web.pages.dev/" },
    ],
    post: 1,
  },
  {
    id: "expense-v1",
    name: "Expense API v1",
    year: "2025",
    status: { es: "evolucionó a Seva", en: "evolved into Seva" },
    summary: {
      es: "La primera versión: Atajos de iOS, AWS Lambda y Google Sheets.",
      en: "The first version: iOS Shortcuts, AWS Lambda and Google Sheets.",
    },
    description: {
      es: "Un Atajo de iOS enviaba cada pago a un endpoint de API Gateway. Una función Lambda en Python escribía una fila por transacción en Google Sheets a través de su API.",
      en: "An iOS Shortcut sent every payment to an API Gateway endpoint. A Python Lambda function wrote one row per transaction to Google Sheets through its API.",
    },
    stack: ["AWS Lambda", "API Gateway", "Python", "Google Sheets API", "iOS Shortcuts", "Serverless"],
    architecture: [
      [{ label: "iOS Shortcut", detail: { es: "request HTTP", en: "HTTP request" }, kind: "client" }],
      [{ label: "API Gateway", detail: { es: "endpoint público", en: "public endpoint" }, kind: "compute" }],
      [{ label: "AWS Lambda", detail: { es: "Python", en: "Python" }, kind: "compute" }],
      [{ label: "Google Sheets", detail: { es: "Sheets API", en: "Sheets API" }, kind: "data" }],
    ],
    links: [{ label: "repo", url: "https://github.com/SebasUrbina/serverless-expense-api/tree/feat/aws-lambda" }],
    post: 1,
  },
  {
    id: "telegram-bot",
    name: "Telegram bot",
    year: "2025",
    status: { es: "implementado", en: "shipped" },
    summary: {
      es: "Bot de Telegram serverless sobre AWS.",
      en: "Serverless Telegram bot on AWS.",
    },
    description: {
      es: "Un bot de Telegram que corre sobre AWS Lambda y guarda sus datos en DynamoDB, sin servidores que administrar.",
      en: "A Telegram bot running on AWS Lambda that stores its data in DynamoDB, with no servers to manage.",
    },
    stack: ["AWS Lambda", "DynamoDB", "Telegram Bot API", "Serverless"],
    architecture: [
      [{ label: "Telegram", detail: { es: "mensajes", en: "messages" }, kind: "client" }],
      [{ label: "AWS Lambda", detail: { es: "lógica del bot", en: "bot logic" }, kind: "compute" }],
      [{ label: "DynamoDB", detail: { es: "NoSQL", en: "NoSQL" }, kind: "data" }],
    ],
    links: [],
  },
  {
    id: "speech-to-text",
    name: "Speech to Text",
    year: "2024",
    status: { es: "proyecto en equipo", en: "team project" },
    summary: {
      es: "Pipeline de transcripción y anonimización de audios con Whisper sobre AWS.",
      en: "Audio transcription and anonymization pipeline with Whisper on AWS.",
    },
    description: {
      es: "Sistema que transcribe audios a escala con OpenAI Whisper en tareas ECS con GPU, orquestado con AWS Step Functions. Lambdas registran la metadata en RDS, reparten los audios en lotes, miden los silencios de cada llamada y anonimizan las transcripciones con Presidio y spaCy antes de guardarlas en S3.",
      en: "A system that transcribes audio at scale with OpenAI Whisper on GPU-backed ECS tasks, orchestrated with AWS Step Functions. Lambdas register metadata in RDS, split audio into batches, measure silences in each call, and anonymize transcripts with Presidio and spaCy before storing them in S3.",
    },
    stack: [
      "Python",
      "Whisper",
      "PyTorch",
      "Transformers",
      "AWS Step Functions",
      "AWS ECS",
      "AWS Lambda",
      "Amazon RDS",
      "S3",
      "Presidio",
      "Docker",
    ],
    architecture: [
      [{ label: "S3 · audios", detail: { es: "audio + metadata.csv", en: "audio + metadata.csv" }, kind: "data" }],
      [
        { label: "Lambda metadata", detail: { es: "registra los audios", en: "registers audio files" }, kind: "compute" },
        { label: "RDS", detail: { es: "metadata · estados", en: "metadata · status" }, kind: "data" },
      ],
      [{ label: "Lambda splitter", detail: { es: "lotes de audios", en: "audio batches" }, kind: "compute" }],
      [
        { label: "ECS · Whisper", detail: { es: "Step Functions · GPU", en: "Step Functions · GPU" }, kind: "ai" },
        { label: "Lambda silencios", detail: { es: "métricas → RDS", en: "metrics → RDS" }, kind: "compute" },
      ],
      [{ label: "Anonimizador", detail: { es: "Lambda · Presidio", en: "Lambda · Presidio" }, kind: "ai" }],
      [{ label: "S3 · transcripts", detail: { es: "texto anonimizado", en: "anonymized text" }, kind: "data" }],
    ],
    links: [],
  },
];

export const stackGroups: StackGroup[] = [
  {
    id: "genai",
    label: "genai",
    items: [
      { name: "LangChain", level: 5 },
      { name: "LangGraph", level: 5 },
      { name: "LangSmith", level: 1 },
      { name: "Langfuse", level: 4 },
      { name: "RAG", level: 3 },
      { name: "LLMs", level: 4 },
      { name: "Agents", level: 5 },
      { name: "MCP", level: 5 },
      { name: "FastMCP", level: 4 },
      { name: "Gemini", level: 5 },
    ],
  },
  {
    id: "backend",
    label: "backend",
    items: [
      { name: "Python", level: 5 },
      { name: "FastAPI", level: 5 },
      { name: "Django", level: 2 },
      { name: "Microservices", level: 3 },
      { name: "TypeScript", level: 3 },
      { name: "JavaScript", level: 3, aliases: ["JavaScript", "Google Apps Script"] },
      { name: "SQL", level: 5, aliases: ["SQL", "D1", "Databricks"] },
      { name: "MongoDB", level: 4 },
      { name: "Clean Architecture", level: 4 },
    ],
  },
  {
    id: "cloud",
    label: "cloud",
    items: [
      { name: "AWS", level: 4, aliases: ["AWS", "Lambda", "DynamoDB", "API Gateway"] },
      { name: "Azure", level: 2 },
      { name: "GCP", level: 3, aliases: ["GCP", "Google Sheets API"] },
      { name: "Cloudflare", level: 2 },
      { name: "Serverless", level: 4 },
    ],
  },
  {
    id: "infra",
    label: "infra · devops",
    items: [
      { name: "Docker", level: 4 },
      { name: "Kubernetes", level: 3 },
      { name: "GitHub Actions", level: 3 },
      { name: "Linux", level: 4, aliases: ["Linux", "Omarchy"] },
    ],
  },
  {
    id: "ml",
    label: "data · ml",
    items: [
      { name: "Databricks", level: 3 },
      { name: "Machine Learning", level: 4 },
      { name: "MLflow", level: 4 },
      { name: "Deep Learning", level: 3 },
      { name: "Data Analysis", level: 5, aliases: ["Data Analysis", "Data Science"] },
      { name: "Statistics", level: 4, aliases: ["Statistics", "Estadística"] },
    ],
  },
  {
    id: "frontend",
    label: "frontend",
    items: [
      { name: "React", level: 2 },
      { name: "Vite", level: 2 },
      { name: "Flutter", level: 1 },
      { name: "Dart", level: 1 },
    ],
  },
];

export const channels: Channel[] = [
  {
    name: "Dot CSV",
    handle: "DotCSV",
    initials: "CSV",
    color: "lime",
    topic: { es: "inteligencia artificial", en: "artificial intelligence" },
    description: {
      es: "Divulgación de inteligencia artificial en español, desde los fundamentos hasta lo último en modelos.",
      en: "AI explained in Spanish, from the fundamentals to the latest models.",
    },
  },
  {
    name: "midudev",
    handle: "midudev",
    initials: "MD",
    color: "gold",
    topic: { es: "desarrollo web", en: "web development" },
    description: {
      es: "JavaScript, desarrollo web y comunidad; sus cursos me acompañan en mi camino full stack.",
      en: "JavaScript, web development, and community; his courses are part of my full-stack path.",
    },
  },
  {
    name: "Veritasium",
    handle: "veritasium",
    initials: "V",
    color: "pink",
    topic: { es: "ciencia", en: "science" },
    description: {
      es: "Ciencia e ingeniería explicadas con experimentos y mucha curiosidad.",
      en: "Science and engineering explained through experiments and plenty of curiosity.",
    },
  },
  {
    name: "Nate Gentile",
    handle: "NateGentile7",
    initials: "NG",
    color: "blue",
    topic: { es: "tecnología", en: "technology" },
    description: {
      es: "Tecnología, hardware y la industria tech contadas con criterio y humor.",
      en: "Technology, hardware, and the tech industry told with judgment and humor.",
    },
  },
  {
    name: "HolaMundo",
    handle: "HolaMundoDev",
    initials: "HM",
    color: "lime",
    topic: { es: "programación", en: "programming" },
    description: {
      es: "Programación y carrera en desarrollo de software, explicadas de forma directa.",
      en: "Programming and software development careers, explained straight to the point.",
    },
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
    date: "SEP 2026",
    type: "project",
    title: {
      es: "Template de agente para Google Chat",
      en: "Agent template for Google Chat",
    },
    description: {
      es: "Publiqué Bank Sales Agent, un backend de agente con FastAPI, LangChain create_agent y un servidor FastMCP que autoriza tools por rol, consulta Databricks y publica cards en Google Chat. Lo diseñé con Clean Architecture, ADRs y tests para que sirva como base de agentes empresariales.",
      en: "Published Bank Sales Agent, an agent backend with FastAPI, LangChain create_agent, and a FastMCP server that authorizes tools by role, queries Databricks, and posts cards to Google Chat. I designed it with Clean Architecture, ADRs, and tests so it can serve as a foundation for enterprise agents.",
    },
    tags: ["LangChain", "MCP", "FastAPI", "Databricks", "Google Chat", "Clean Architecture"],
    resources: [{ name: "Source code", url: "https://github.com/SebasUrbina/bank-sales-agent" }],
    link: { label: "GitHub · bank-sales-agent", url: "https://github.com/SebasUrbina/bank-sales-agent" },
  },
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
