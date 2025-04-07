export interface Achievement {
  id: string;
  year: number;
  icon: "code" | "family" | "blog" | "github" | "stats" | "portfolio" | string;
  content: React.ReactNode;
  link?: {
    text: string;
    url: string;
  };
}

export type AchievementsByYear = Record<number, Achievement[]>;
