import { has } from "lodash";

/**
 * Converts an object into a query string.
 *
 * @param {Object} obj - The object to convert into a query string.
 * @return {string} The query string generated from the object.
 */

export const objectToQueryString = (obj: {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | (undefined | string | number)[];
}): string => {
  const keyValuePairs: string[] = [];
  for (const key of Object.keys(obj)) {
    if (has(obj, key)) {
      const value = obj[key];
      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        (value as (string | number)[])?.length !== 0
      ) {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(String(value));
        keyValuePairs.push(`${encodedKey}=${encodedValue}`);
      }
    }
  }
  return keyValuePairs.join("&");
};
