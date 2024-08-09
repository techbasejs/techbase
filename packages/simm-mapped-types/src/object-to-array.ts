/**
 * Converts an object to an array of key-value pair objects.
 * If the value is a nested object, it recursively converts it to an array.
 *
 * @template T - The type of the values in the object.
 *
 * @param {Record<string, T>} obj - The object to convert to an array.
 * @returns {unknown[]} The result array of key-value pair objects.
 */

export function convertObjectToArray<T>(
  obj: Record<string, T>
): unknown[] {
  return Object.entries(obj).map(([key, value]) => {
    return typeof value === "object" && value !== null && !Array.isArray(value)
      ? { [key]: convertObjectToArray(value as Record<string, T>) }
      : { [key]: value };
  });
}
