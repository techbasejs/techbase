import { isURL } from "./is-url";
/**
 * Check if the given string is a valid image URL.
 * @param str - The string to check.
 * @returns {boolean} True if the string is a valid image URL, otherwise false.
 */
export const isImageURL = (str: string | null | undefined): boolean => {
  if (!str || !isURL(str)) return false;

  const imageURLFormats = /.(jpeg|jpg|gif|png|bmp|webp)$/i;

  return imageURLFormats.test(str);
};
