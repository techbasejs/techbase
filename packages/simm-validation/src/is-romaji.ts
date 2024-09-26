/**
 * Checks if a string contains only Romaji characters (Latin letters and spaces).
 * @param value - The string to check.
 * @returns True if the string is Romaji, false otherwise.
 * @example
 * isRomaji("Hello"); // true
 * isRomaji("こんにちは"); // false
 * isRomaji("こんにちは, Hello"); // false
 */

import { REGEXS } from "./shared/constants";

export const isRomaji = (value: string | null | undefined): boolean => {
  if (value === null || value === undefined) {
    return false;
  }

  const romajiRegex = REGEXS.ROMAJI;
  
  return romajiRegex.test(value);
};
