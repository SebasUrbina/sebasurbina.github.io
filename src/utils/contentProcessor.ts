/**
 * Utilidad para procesar contenido en formato de colección
 * Esta abstracción permite reutilizar la lógica de procesamiento para diferentes tipos de datos
 */

/**
 * Agrupa elementos por una propiedad específica
 * @param items - Array de elementos a agrupar
 * @param getKey - Función para obtener la clave de agrupación
 * @returns Un objeto con los elementos agrupados por la clave especificada
 */
export function groupBy<T, K extends string | number>(
  items: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return items.reduce((acc: Record<K, T[]>, item: T) => {
    const key = getKey(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

/**
 * Obtiene un array de claves únicas ordenadas
 * @param record - Objeto con las claves a extraer
 * @param sortFunction - Función opcional para ordenar las claves (predeterminado: orden descendente)
 * @returns Array ordenado de claves únicas
 */
export function getSortedKeys<K extends string | number>(
  record: Record<K, unknown>,
  sortFunction: (a: K, b: K) => number = (a, b) =>
    typeof a === "number" && typeof b === "number"
      ? b - a
      : String(b).localeCompare(String(a))
): K[] {
  return (Object.keys(record) as K[]).sort(sortFunction);
}

/**
 * Filtra un array de elementos según una condición
 * @param items - Array de elementos a filtrar
 * @param predicate - Función de predicado para filtrar elementos
 * @returns Un nuevo array con los elementos que cumplen la condición
 */
export function filterItems<T>(
  items: T[],
  predicate: (item: T) => boolean
): T[] {
  return items.filter(predicate);
}

/**
 * Ordena un array de elementos según una función de comparación
 * @param items - Array de elementos a ordenar
 * @param compareFunction - Función de comparación para ordenar elementos
 * @returns Un nuevo array ordenado
 */
export function sortItems<T>(
  items: T[],
  compareFunction: (a: T, b: T) => number
): T[] {
  return [...items].sort(compareFunction);
}
