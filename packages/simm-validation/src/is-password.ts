/**
 * @description check if password has at least 8 characters,
 * contains at least number characters,
 * contains at least uppercase characters,
 * contains at least non-alphanumeric characters
 * @param value string - The password string to validate.
 * @param passwordRegex Regex - Optional custom regular expression for validation.
 * @returns boolean - Returns true if the password is valid, otherwise false.
 * @example
 * // Basic usage
 * const password = "StrongP@ss1";
 * const isValid = isPassword(password);
 * console.log(isValid); // true
 * 
 * // Custom regex usage
 * const customRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{10,}$/;
 * const isCustomValid = isPassword("Custom@Pass123", customRegex);
 * console.log(isCustomValid); // true
 */
export const isPassword = (
  value: string,
  passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!$%&()*+,./:;<>?@[\\\]^_`{|}~-])[\w!$%&()*+,./:;<>?@[\\\]^`{|}~-]{8,}$/,
) => passwordRegex.test(value);
