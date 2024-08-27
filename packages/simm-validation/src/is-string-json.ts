/**
 * Validates if the given string is JSON format or not by JSON.parse.
 *
 * @param {string} input - The string to validate.
 * @returns {boolean} - Returns true if the string is JSON format, false otherwise.
 */
const isStrictJSON = (input: string) => {
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates if the given input is JSON object or array of objects.
 *
 * @param {any} input The input to validate.
 * @returns {boolean} Returns true if the input is JSON object or array of objects, false otherwise.
 */
const isValidObject = (input: any) => {
  if (Array.isArray(input)) return input.every(isValidObject);
  return typeof input === "object" && input !== null;
};

/**
 * Validates if the given string is JSON format or not.
 *
 * The JSON string must be in type of key/value pairs.
 *
 * @param {any} input The string to validate.
 * @returns {boolean} Returns true if the string is JSON format, false otherwise.
 *
 * @example
 * ```typescript
 * isStringJson('{"email": "bar@email.com", "age": 26, "isMale": true}'); // true
 * isStringJson('{email: "bar@email.com"}'); // false
 * isStringJson('{}'); // true
 * isStringJson('[]'); // true
 * isStringJson('[{"x":1,"y":2},[{"z":3}]]'); // true
 * isStringJson('[1,2,3]'); // false
 * ```
 */
const isStringJson = (input: any) => {
  // Returns false input is not a string
  if (typeof input !== "string") return false;

  // Replace all whitespaces and newlines with empty string
  input = input.replace(/\s/g, "").replace(/\n|\r/, "");

  // Check if the string is JSON object
  const isObjectFormat = /^\{.*\}$/.test(input);
  if (isObjectFormat) return isStrictJSON(input);

  // Check if the string is JSON array
  const isArrayFormat = /^\[.*\]$/.test(input);
  if (isArrayFormat) {
    const isValidArray = isStrictJSON(input);
    if (!isValidArray) return false;
    const array = JSON.parse(input) as Array<any>;
    return isValidObject(array);
  }

  return false;
};

export { isStringJson };
