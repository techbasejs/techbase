import { isURL } from "./is-url";
import { regexValidate } from "../src/shared/constants/regex";
/**
 * Check if the given string is a valid image URL.
 * @param str - The string to check.
 * @returns {boolean} True if the string is a valid image URL, otherwise false.
 * @example
 *  const result = isImageURL('https://tinyjpg.com/images/social/website.jpg');
 *  console.log(result); // prints: true
 *  const result2 = isImageURL('abc');
 *  console.log(result2); // prints: false
 *  const result3 = isImageURL(null);
 *  console.log(result3); // prints: false
 */
export const isImageURL = (str: string | null | undefined): boolean => {
  if (!str || !isURL(str)) return false;

  const imageURLFormats = regexValidate.URL_IMG_REGEX;

  return imageURLFormats.test(str);
};
