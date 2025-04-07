import { useMemo } from "react";
import { Achievement, AchievementsByYear } from "../types/Achievement";
import { Link } from "react-router-dom";

export const useAchievements = () => {
  // Definir los logros de forma estática, pero podrían venir de una API
  const achievements: Achievement[] = useMemo(
    () => [
      {
        id: "1",
        year: 2024,
        icon: "code",
        content: (
          <span>
            Learnt{" "}
            <Link
              to="https://www.typescriptlang.org/"
              style={{ color: "var(--color-accent)" }}
            >
              Typescript
            </Link>{" "}
            and{" "}
            <Link
              to="https://nextjs.org/"
              style={{ color: "var(--color-accent)" }}
            >
              Next.js
            </Link>
          </span>
        ),
      },
      {
        id: "2",
        year: 2021,
        icon: "family",
        content: <span>Testing ❤️</span>,
      },
      {
        id: "3",
        year: 2021,
        icon: "blog",
        content: <span>Testing</span>,
        link: {
          text: "Blog",
          url: "/blog",
        },
      },
      {
        id: "4",
        year: 2021,
        icon: "github",
        content: <span>Testing</span>,
        link: {
          text: "20+ open-source repositories",
          url: "https://github.com/sebasurbina",
        },
      },
      {
        id: "5",
        year: 2021,
        icon: "stats",
        content: <span>Testing</span>,
        link: {
          text: "Dev.to",
          url: "https://dev.to/",
        },
      },
      {
        id: "6",
        year: 2021,
        icon: "portfolio",
        content: <span>Testing</span>,
        link: {
          text: "source on Github",
          url: "https://github.com/sebasurbina/portfolio",
        },
      },
      // Puedes agregar más logros en diferentes años
    ],
    []
  );

  // Agrupar logros por año
  const achievementsByYear: AchievementsByYear = useMemo(() => {
    return achievements.reduce((acc: AchievementsByYear, achievement) => {
      if (!acc[achievement.year]) {
        acc[achievement.year] = [];
      }
      acc[achievement.year].push(achievement);
      return acc;
    }, {});
  }, [achievements]);

  // Obtener los años ordenados de forma descendente
  const years = useMemo(() => {
    return Object.keys(achievementsByYear)
      .map(Number)
      .sort((a, b) => b - a);
  }, [achievementsByYear]);

  return {
    achievements,
    achievementsByYear,
    years,
  };
};

export default useAchievements;
