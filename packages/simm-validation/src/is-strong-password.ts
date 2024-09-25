import { REGEXS } from "./shared/constants";

interface Options {
  minLength: number;
  minLowercase?: number;
  minUppercase?: number;
  minNumbers?: number;
  minSymbols?: number;
}

/**
 * Check the total count of uppercase, lowercase, number, and symbol chars.
 *
 * @param {any} input The string to analyze.
 * @returns {boolean} Returns analyzed result.
 */
const analyzePassword = (input: string) => {
  let uppercaseCount = 0;
  let lowercaseCount = 0;
  let numberCount = 0;
  let symbolCount = 0;

  input.split("").forEach((char) => {
    if (REGEXS.UPPERCASE_REGEX.test(char)) {
      uppercaseCount++;
    } else if (REGEXS.LOWERCASE_REGEX.test(char)) {
      lowercaseCount++;
    } else if (REGEXS.NUMERIC_REGEX.test(char)) {
      numberCount++;
    } else if (REGEXS.SYMBOL_REGEX.test(char)) {
      symbolCount++;
    }
  });

  return { uppercaseCount, lowercaseCount, numberCount, symbolCount };
};

/**
 * Validates if the given string is strong password or not.
 *
 * @param {any} input The string to validate.
 * @param {number} options.minLength Minimum length.
 * @param {number} options.minLowercase Minimum lowercase characters.
 * @param {number} options.minUppercase Minimum uppercase characters.
 * @param {number} options.minNumbers Minimum number characters.
 * @param {number} options.minSymbols Minimum symbol characters.
 * @returns {boolean} Returns true if the string is strong password, false otherwise.
 */
const isStrongPassword = (input: any, options: Options) => {
  // Returns false input is not a string
  if (typeof input !== "string") return false;

  // Password must not contain spaces
  if (input.includes(" ")) return false;

  // Less than minLength
  if (input.length < options.minLength) return false;

  const { uppercaseCount, lowercaseCount, numberCount, symbolCount } =
    analyzePassword(input);

  // Password must contain uppercase letter
  if (
    options.minUppercase !== undefined &&
    uppercaseCount < options.minUppercase
  )
    return false;

  // Password must contain lowercase letter
  if (
    options.minLowercase !== undefined &&
    lowercaseCount < options.minLowercase
  )
    return false;

  // Password must contain number letter
  if (options.minNumbers !== undefined && numberCount < options.minNumbers)
    return false;

  // Password must contain symbol letter
  if (options.minSymbols !== undefined && symbolCount < options.minSymbols)
    return false;

  return true;
};

export { isStrongPassword };
