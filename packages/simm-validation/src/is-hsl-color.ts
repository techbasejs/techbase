import { REGEXS } from "./shared/constants";

/**
 * Validates if the given string is HSL color or not.
 *
 * @param {any} input The string to validate.
 * @returns {boolean} Returns true if the string is HSL color, false otherwise.
 *
 * @example
 * ```typescript
 * isHSLColor("hsl(120,100%,50%)") // true
 * isHSLColor("hsl(120deg,100%,50%)")// true
 * isHSLColor("hsla(-0.5e2rad -100% -2.5%)") // true
 * ```
 *
 */
const isHSLColor = (input: any) => {
  // Returns false input is not a string
  if (typeof input !== "string") return false;

  // Strip duplicate spaces before calling the validation regex
  const strippedStr = input
    .replace(/\s+/g, " ")
    .replace(/\s?(hsla?\(|\)|,)\s?/gi, "$1");

  // If has comma, then check by comma format, otherwise check by space format
  const regex =
    strippedStr.indexOf(",") !== -1
      ? REGEXS.HSL_WITH_COMMA
      : REGEXS.HSL_WITH_SPACE;

  return regex.test(strippedStr);
};

export { isHSLColor };
