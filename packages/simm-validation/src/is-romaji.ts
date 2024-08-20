/**
 * Checks if a string contains only Romaji characters (Latin letters and spaces).
 * @param value - The string to check.
 * @returns True if the string is Romaji, false otherwise.
 */
import { regexValidate } from "../src/shared/constants/regex";
export const isRomaji = (value: string | null | undefined): boolean => {
  if (value === null || value === undefined) {
    return false;
  }

  const romajiRegex = regexValidate.VALID_ROMAJI;
  return romajiRegex.test(value);
};
