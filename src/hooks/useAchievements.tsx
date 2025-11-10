import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Achievement, AchievementsByYear } from "../types/Achievement";
import { groupBy, getSortedKeys } from "../utils/contentProcessor";
import { IconKey } from "../utils/iconMapper";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * Hook para gestionar los logros, consumiendo los datos y procesándolos para su visualización
 * Este hook separa la lógica de procesamiento de los datos estáticos
 */
export const useAchievements = () => {
  const { t } = useLanguage();

  // Cargar los logros con traducciones
  const achievements: Achievement[] = useMemo(
    () => [
      {
        id: "13",
        year: 2025,
        icon: "aws",
        content: <span>{t("achievements.items.expenseApi")}</span>,
        link: {
          text: t("achievements.items.sourceOnGithub"),
          url: "https://github.com/SebasUrbina/serverless-expense-api",
        },
      },
      {
        id: "1",
        year: 2025,
        icon: "aws",
        content: <span>{t("achievements.items.expenseBot")}</span>,
        link: {
          text: t("achievements.items.sourceOnGithub"),
          url: "https://github.com/SebasUrbina/expense-tracker-telegram-bot",
        },
      },
      {
        id: "2",
        year: 2024,
        icon: "code",
        content: (
          <span>
            {(() => {
              const text = t("achievements.items.learnedJS");
              const parts = text.split(/\{js\}|\{ts\}/);
              const matches = text.match(/\{js\}|\{ts\}/g) || [];
              const result: React.ReactNode[] = [];
              parts.forEach((part, index) => {
                if (part) result.push(part);
                if (matches[index] === "{js}") {
                  result.push(
                    <Link
                      key={`js-${index}`}
                      to="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                      style={{ color: "var(--color-accent)" }}
                    >
                      JavaScript
                    </Link>
                  );
                } else if (matches[index] === "{ts}") {
                  result.push(
                    <Link
                      key={`ts-${index}`}
                      to="https://www.typescriptlang.org/"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Typescript
                    </Link>
                  );
                }
              });
              return result;
            })()}
          </span>
        ),
      },
      {
        id: "5",
        year: 2016,
        icon: "stats",
        content: <span>{t("achievements.items.learnedPython")}</span>,
      },
      {
        id: "6",
        year: 2025,
        icon: "portfolio",
        content: <span>{t("achievements.items.portfolio")}</span>,
        link: {
          text: t("achievements.items.sourceOnGithub"),
          url: "https://github.com/SebasUrbina/sebasurbina.github.io",
        },
      },
      {
        id: "7",
        year: 2023,
        icon: "code",
        content: <span>{t("achievements.items.docker")}</span>,
      },
      {
        id: "8",
        year: 2024,
        icon: "code",
        content: <span>{t("achievements.items.developer")}</span>,
      },
      {
        id: "9",
        year: 2024,
        icon: "education",
        content: <span>{t("achievements.items.masters")}</span>,
      },
      {
        id: "10",
        year: 2024,
        icon: "education",
        content: <span>{t("achievements.items.bachelors")}</span>,
      },
      {
        id: "11",
        year: 2024,
        icon: "coursera",
        content: (
          <span>
            {t("achievements.items.metaJS")}{" "}
            <Link
              to="https://www.coursera.org/account/accomplishments/certificate/PLNJ1N2CBOC4"
              style={{ color: "var(--color-accent)" }}
            >
              {t("achievements.items.viewCertificate")}
            </Link>
          </span>
        ),
      },
      {
        id: "12",
        year: 2024,
        icon: "coursera",
        content: (
          <span>
            {t("achievements.items.metaFrontend")}{" "}
            <Link
              to="https://www.coursera.org/account/accomplishments/certificate/HKXNGYUECTKW"
              style={{ color: "var(--color-accent)" }}
            >
              {t("achievements.items.viewCertificate")}
            </Link>
          </span>
        ),
      },
    ],
    [t]
  );

  // Agrupar logros por año usando la utilidad genérica
  const achievementsByYear: AchievementsByYear = useMemo(() => {
    return groupBy(
      achievements,
      (achievement: Achievement) => achievement.year
    );
  }, [achievements]);

  // Obtener los años ordenados de forma descendente usando la utilidad genérica
  const years = useMemo(() => {
    return getSortedKeys(achievementsByYear);
  }, [achievementsByYear]);

  // Funcionalidad adicional: contar logros por tipo de icono
  const countByIcon = useMemo(() => {
    return achievements.reduce(
      (acc: Record<IconKey, number>, achievement: Achievement) => {
        const { icon } = achievement;
        acc[icon] = (acc[icon] || 0) + 1;
        return acc;
      },
      {} as Record<IconKey, number>
    );
  }, [achievements]);

  return {
    achievements,
    achievementsByYear,
    years,
    countByIcon,
  };
};

export default useAchievements;
