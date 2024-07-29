/**
 * Converts an object to a query string.
 *
 * @template T - The type of the values in the object.
 *
 * @param {Record<string, T>} obj - The object to convert to a query string.
 * @param {string} [parentKey] - Optional parent key for nested objects.
 * @returns {string} The result query string.
 */
export function objectToQueryString<T>(
  obj: Record<string, T>,
  parentKey?: string,
): string {
  const queryParams: string[] = [];
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const encodeKey = parentKey
        ? `${parentKey}_${encodeURIComponent(key)}`
        : encodeURIComponent(key);
      if (value === null || value === undefined) {
        queryParams.push(`${encodeKey}=`);
      } else if (typeof value === "object" && !Array.isArray(value)) {
        const nestedParams = objectToQueryString(value as Record<string, T>, encodeKey);
        queryParams.push(nestedParams);
      } else if (Array.isArray(value)) {
        for (const item of value) {
          queryParams.push(`${encodeKey}=${encodeURIComponent(item)}`);
        }
      } else {
        queryParams.push(`${encodeKey}=${encodeURIComponent(value as string)}`);
      }
    }
  }
  return queryParams.join("&") || "";
}
