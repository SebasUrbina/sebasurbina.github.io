import { changelog, education, experience, personalInfo, posts, projects, socialLinks, stackGroups } from "./data";
import { translations } from "./i18n";
import type { Language } from "./i18n";

export type DocKind = "profile" | "experience" | "project" | "education" | "stack" | "learning" | "post" | "contact";

export type Doc = {
  id: string;
  kind: DocKind;
  title: Record<Language, string>;
  text: Record<Language, string>;
  tokens: Set<string>;
};

export type Hit = { doc: Doc; score: number };

export type AgentResult = {
  route: "greeting" | "contact" | "retrieve";
  hits: Hit[];
  answer: string;
};

const STOPWORDS = new Set(
  (
    "a al algo and any are as at be como con cual cuales cuando de del do does donde el en eres es esta este esto for from ha has hace has have he his how i in is it know la las lo los me mi mis my of on or para por que qué sabe se sobre su sus tiene tienes the to tu tus un una usa use used uso using what where which who with you your y yo"
  ).split(" "),
);

const SYNONYMS: Record<string, string> = {
  trabajo: "experience", trabaja: "experience", trabajas: "experience", trabajado: "experience",
  experiencia: "experience", work: "experience", job: "experience", empresa: "experience",
  company: "experience", carrera: "experience", career: "experience", rol: "experience", role: "experience",
  proyecto: "project", built: "project", build: "project", construido: "project", construiste: "project",
  arquitectura: "project", architecture: "project", app: "project",
  estudio: "education", estudiaste: "education", universidad: "education", university: "education",
  magister: "education", master: "education", degree: "education", titulo: "education", educacion: "education",
  contacto: "contact", contactar: "contact", correo: "contact", email: "contact", mail: "contact",
  hire: "contact", contratar: "contact", reach: "contact", hablar: "contact", talk: "contact",
  tecnologia: "stack", technologie: "stack", technology: "stack", herramienta: "stack", tool: "stack",
  lenguaje: "stack", language: "stack", framework: "stack",
  aprendiendo: "learning", aprende: "learning", aprendes: "learning", aprendizaje: "learning",
  learn: "learning", curso: "learning", course: "learning", estudiando: "learning",
  agente: "agent", ia: "ai", genai: "ai", llm: "llm", articulo: "post", article: "post", blog: "post", escrito: "post",
  hola: "hello", hi: "hello", hey: "hello", buena: "hello",
};

const KIND_TOKEN: Record<DocKind, string> = {
  profile: "profile",
  experience: "experience",
  project: "project",
  education: "education",
  stack: "stack",
  learning: "learning",
  post: "post",
  contact: "contact",
};

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((token) => token && !STOPWORDS.has(token))
    .map((token) => (token.length > 3 && token.endsWith("s") ? token.slice(0, -1) : token))
    .filter((token) => !STOPWORDS.has(token))
    .map((token) => SYNONYMS[token] ?? token);
}

function doc(
  id: string,
  kind: DocKind,
  title: Record<Language, string>,
  text: Record<Language, string>,
  extra = "",
): Doc {
  const tokens = new Set([
    ...tokenize(`${title.es} ${title.en} ${text.es} ${text.en} ${extra}`),
    KIND_TOKEN[kind],
  ]);
  return { id, kind, title, text, tokens };
}

const firstSentence = (text: string) => text.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? text;

function buildIndex(): Doc[] {
  const es = translations.es;
  const en = translations.en;
  const docs: Doc[] = [
    doc(
      "profile",
      "profile",
      { es: "Perfil", en: "Profile" },
      {
        es: `${es.bio} Rol: ${personalInfo.role}. Enfoque: ${personalInfo.focus}. Ubicación: ${personalInfo.location}. ${es.profile.education}.`,
        en: `${en.bio} Role: ${personalInfo.role}. Focus: ${personalInfo.focus}. Location: ${personalInfo.location}. ${en.profile.education}.`,
      },
    ),
    doc(
      "contact",
      "contact",
      { es: "Contacto", en: "Contact" },
      {
        es: `Correo: sebastian.urbina97@gmail.com · LinkedIn: ${socialLinks[1].url} · GitHub: ${socialLinks[0].url}. Siempre abierto a conversar.`,
        en: `Email: sebastian.urbina97@gmail.com · LinkedIn: ${socialLinks[1].url} · GitHub: ${socialLinks[0].url}. Always open to a conversation.`,
      },
    ),
  ];

  experience.forEach((item, index) => {
    docs.push(
      doc(
        `exp-${index}`,
        "experience",
        { es: `${item.role} @ ${item.name}`, en: `${item.role} @ ${item.name}` },
        {
          es: `${es.periods[index]}. Stack: ${item.skills}.`,
          en: `${en.periods[index]}. Stack: ${item.skills}.`,
        },
      ),
    );
  });

  for (const project of projects) {
    const flow = project.architecture.map((column) => column.map((node) => node.label).join(" + ")).join(" → ");
    docs.push(
      doc(
        `project-${project.id}`,
        "project",
        { es: project.name, en: project.name },
        {
          es: `${project.summary.es} Arquitectura: ${flow}.`,
          en: `${project.summary.en} Architecture: ${flow}.`,
        },
        `${project.description.es} ${project.description.en} ${project.stack.join(" ")}`,
      ),
    );
  }

  education.forEach((item, index) => {
    docs.push(
      doc(
        `edu-${index}`,
        "education",
        { es: es.degrees[index], en: en.degrees[index] },
        {
          es: `Universidad de Chile, ${item.period}. ${item.skills}.`,
          en: `Universidad de Chile, ${item.period}. ${item.skills}.`,
        },
      ),
    );
  });

  for (const group of stackGroups) {
    const names = group.items.map((item) => item.name).join(", ");
    docs.push(doc(`stack-${group.id}`, "stack", { es: `Stack ${group.label}`, en: `${group.label} stack` }, { es: names, en: names }));
  }

  for (const item of changelog) {
    if (item.type !== "learning" && item.type !== "mastery") continue;
    docs.push(
      doc(
        `log-${item.title.en}`,
        "learning",
        item.title,
        {
          es: `${firstSentence(item.description.es)} (${item.date})`,
          en: `${firstSentence(item.description.en)} (${item.date})`,
        },
        `${item.description.es} ${item.description.en} ${item.tags.join(" ")}`,
      ),
    );
  }

  posts.forEach((_post, index) => {
    docs.push(
      doc(
        `post-${index}`,
        "post",
        { es: es.postText[index][0], en: en.postText[index][0] },
        { es: es.postText[index][1], en: en.postText[index][1] },
      ),
    );
  });

  return docs;
}

export const knowledgeBase = buildIndex();

const documentFrequency = new Map<string, number>();
for (const item of knowledgeBase) {
  for (const token of item.tokens) documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
}

const KIND_TOKENS = new Set(Object.values(KIND_TOKEN));

export function retrieve(query: string, k = 3): Hit[] {
  const tokens = [...new Set(tokenize(query))];
  const total = knowledgeBase.length;
  return knowledgeBase
    .map((item) => {
      let score = 0;
      for (const token of tokens) {
        if (!item.tokens.has(token)) continue;
        const idf = Math.log(total / (documentFrequency.get(token) ?? total)) + 1;
        score += KIND_TOKENS.has(token) && KIND_TOKEN[item.kind] === token ? idf + 2 : idf;
      }
      return { doc: item, score };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

export function runAgent(query: string, language: Language): AgentResult {
  const t = translations[language].agent;
  const tokens = tokenize(query);
  if (tokens.length > 0 && tokens.every((token) => token === "hello")) {
    return { route: "greeting", hits: [], answer: t.greeting };
  }
  const route = tokens.includes("contact") ? "contact" : "retrieve";
  const hits = route === "contact" ? retrieve("contact", 1) : retrieve(query);
  if (!hits.length) return { route, hits, answer: t.fallback };
  const lines = hits.map((hit) => `• ${hit.doc.title[language]}: ${hit.doc.text[language]}`);
  return { route, hits, answer: `${t.intro[hits[0].doc.kind]}\n${lines.join("\n")}` };
}
