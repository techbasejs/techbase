import { checkRegex } from './utils/check-regex';
/**
 * Checks if the provided value is a valid phone number.
 *
 * The phone number must match the pattern /^0\d{9,10}$/. This means it must start
 * with a '0' followed by 9 to 10 digits.
 *
 * @param {string | number | null} value - The value to be checked, which can be either a string or a number.
 * @returns {boolean} Returns `true` if the value is a valid phone number according to the pattern; `false` otherwise.
 * @example
 *  const result = isPhoneNumber('0123456789');
 *  console.log(result); // prints: true
 *  const result2 = isPhoneNumber('01234567890');
 *  console.log(result2); // prints: true
 *  const result3 = isPhoneNumber('1234567890');
 *  console.log(result3); // prints: false
 *  const result4 = isPhoneNumber('012345678');
 *  console.log(result4); // prints: false
 */

export const isPhoneNumber = (value: string | number | null): boolean => {
  return checkRegex(value, /^0\d{9,10}$/);
}
