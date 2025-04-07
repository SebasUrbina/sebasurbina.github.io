import { useMemo } from "react";
import { Achievement, AchievementsByYear } from "../types/Achievement";
import { achievementsData } from "../content/achievements/data";
import { groupBy, getSortedKeys } from "../utils/contentProcessor";
import { IconKey } from "../utils/iconMapper";

/**
 * Hook para gestionar los logros, consumiendo los datos y procesándolos para su visualización
 * Este hook separa la lógica de procesamiento de los datos estáticos
 */
export const useAchievements = () => {
  // Cargar los logros desde la fuente de datos
  const achievements: Achievement[] = useMemo(() => achievementsData, []);

  // Agrupar logros por año usando la utilidad genérica
  const achievementsByYear: AchievementsByYear = useMemo(() => {
    return groupBy(achievements, (achievement) => achievement.year);
  }, [achievements]);

  // Obtener los años ordenados de forma descendente usando la utilidad genérica
  const years = useMemo(() => {
    return getSortedKeys(achievementsByYear);
  }, [achievementsByYear]);

  // Funcionalidad adicional: contar logros por tipo de icono
  const countByIcon = useMemo(() => {
    return achievements.reduce((acc: Record<IconKey, number>, achievement) => {
      const { icon } = achievement;
      acc[icon] = (acc[icon] || 0) + 1;
      return acc;
    }, {} as Record<IconKey, number>);
  }, [achievements]);

  return {
    achievements,
    achievementsByYear,
    years,
    countByIcon,
  };
};

export default useAchievements;
