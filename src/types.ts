export type Localized = Record<"es" | "en", string>;

export type Post = {
  date: string;
  title: string;
  tag: string;
  excerpt: string;
  content: string;
};

export type ArchNode = {
  label: string;
  detail: Localized;
  kind: "client" | "compute" | "data" | "ai";
};

export type Project = {
  id: string;
  name: string;
  year: string;
  status: Localized;
  summary: Localized;
  description: Localized;
  stack: string[];
  architecture: ArchNode[][];
  links: { label: string; url: string }[];
  post?: number;
};

export type Channel = {
  name: string;
  handle: string;
  initials: string;
  color: "lime" | "pink" | "blue" | "gold";
  topic: Localized;
  description: Localized;
};

export type StackItem = { name: string; level: 1 | 2 | 3 | 4 | 5; aliases?: string[] };

export type StackGroup = { id: string; label: string; items: StackItem[] };
