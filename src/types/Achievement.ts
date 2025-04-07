import { IconKey } from "../utils/iconMapper";

export interface Achievement {
  id: string;
  year: number;
  icon: IconKey;
  content: React.ReactNode;
  link?: {
    text: string;
    url: string;
  };
}

export type AchievementsByYear = Record<number, Achievement[]>;
