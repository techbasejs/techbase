import { regexValidate } from "./shared/constants/regex";

/**
 * Checks if a value is a valid UUID.
 *
 * @param value - The value to be checked.
 * @returns `true` if the value is a valid UUID, `false` otherwise.
 * @example
 * isUuid("123e4567-e89b-12d3-a456-426614174000"); // true
 * isUuid("123e4567-e89b-12d3-a456-42661417400"); // false
 * isUuid("123e4567-e89b-12d3-a456-4266141740000"); // false
 * isUuid("123e4567-e89b-12d3-a456-42661417400g0"); // false
 */
export const isUUID = (value: any): boolean => {
  if (typeof value !== "string") {
    return false;
  }

  return regexValidate.UUID.test(value);
};
