/**
 * Checks if a string contains only Romaji characters (Latin letters and spaces).
 * @param value - The string to check.
 * @returns True if the string is Romaji, false otherwise.
 */
export const isRomaji = (value: string) => {
  const romajiRegex = /^[a-zA-Z\s]+$/;
  return romajiRegex.test(value);
};