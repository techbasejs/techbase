import { regexValidate } from "./shared/constants/regex";

type PhoneLocale = keyof typeof regexValidate.PHONE_NUMBER;

/**
 * Validates if the given string is phone number or not.
 *
 * @param {any} input The string to validate.
 * @param {PhoneLocale} locale The locale of phone.
 * @returns {boolean} Returns true if the string is phone, false otherwise.
 */
const isPhone = (input: any, locale: PhoneLocale | PhoneLocale[]) => {
  // Returns false input is not a string
  if (typeof input !== "string") return false;

  // If passing multiple locales
  if (Array.isArray(locale)) {
    return locale.some((key) => {
      if (regexValidate.PHONE_NUMBER.hasOwnProperty(key)) {
        const phoneRegex = regexValidate.PHONE_NUMBER[key];
        if (phoneRegex.test(input)) return true;
      }
      return false;
    });
  }

  // If passing just a single locale
  const phoneRegex = regexValidate.PHONE_NUMBER[locale as PhoneLocale];
  if (!phoneRegex) return false;
  return phoneRegex.test(input);
};

export { isPhone, PhoneLocale };
