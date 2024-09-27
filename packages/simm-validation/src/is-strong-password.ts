import { REGEXS } from "./shared/constants";

interface MinimumCharacter {
  min: number;
}

interface Options {
  minLength: number;
  lowercase?: true | MinimumCharacter;
  uppercase?: true | MinimumCharacter;
  number?: true | MinimumCharacter;
  symbol?: true | MinimumCharacter;
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

  for (const char of input) {
    if (REGEXS.UPPERCASE_REGEX.test(char)) {
      uppercaseCount++;
    } else if (REGEXS.LOWERCASE_REGEX.test(char)) {
      lowercaseCount++;
    } else if (REGEXS.NUMERIC_REGEX.test(char)) {
      numberCount++;
    } else if (REGEXS.SYMBOL_REGEX.test(char)) {
      symbolCount++;
    }
  }

  return { uppercaseCount, lowercaseCount, numberCount, symbolCount };
};

/**
 * Returns the default minimum characters based on the provided input.
 *
 * @param {undefined | true | MinimumCharacter} minimumChars - The input value to determine the default minimum characters.
 * @returns {number} The default minimum characters, either 0, 1, or the input value itself.
 */
const getDefaultMinimumCharacters = (
  minimumChars: undefined | true | MinimumCharacter
) => {
  if (minimumChars === undefined) return 0;
  if (minimumChars === true) return 1;
  return minimumChars.min;
};

/**
 * Validates if the given string is strong password or not.
 *
 * @param {any} input The string to validate.
 * @param {number} options.minLength Minimum length.
 * @param {boolean | MinimumCharacter} options.lowercase Determine lowercase characters.
 * @param {boolean | MinimumCharacter} options.uppercase Determine uppercase characters.
 * @param {boolean | MinimumCharacter} options.number Determine number characters.
 * @param {boolean | MinimumCharacter} options.symbol Determine symbol characters.
 * @returns {boolean} Returns true if the string is strong password, false otherwise.
 *
 *  * @example
 * ```typescript
 * isStrongPassword("Abcdef@123", {
 *   minLength: 8,
 *   uppercase: { min: 1 },
 *   lowercase: { min: 4 },
 *   number: true,
 *   symbol: true,
 * }); // true
 * ```
 */
const isStrongPassword = (input: any, options: Options) => {
  // Returns false input is not a string
  if (typeof input !== "string") return false;

  // Set default minimum characters
  const minUppercase = getDefaultMinimumCharacters(options.uppercase);
  const minLowercase = getDefaultMinimumCharacters(options.lowercase);
  const minNumbers = getDefaultMinimumCharacters(options.number);
  const minSymbols = getDefaultMinimumCharacters(options.symbol);

  // Password must not contain spaces
  if (input.includes(" ")) return false;

  // Less than minLength
  if (input.length < options.minLength) return false;

  const { uppercaseCount, lowercaseCount, numberCount, symbolCount } =
    analyzePassword(input);

  // Password must contain uppercase letter
  if (minUppercase && uppercaseCount < minUppercase) return false;

  // Password must contain lowercase letter
  if (minLowercase && lowercaseCount < minLowercase) return false;

  // Password must contain number letter
  if (minNumbers && numberCount < minNumbers) return false;

  // Password must contain symbol letter
  if (minSymbols && symbolCount < minSymbols) return false;

  return true;
};

export { isStrongPassword };
