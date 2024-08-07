/**
 * Determines if the input value is a valid date.
 * @param value The value to be checked if it represents a valid date.
 * @returns A boolean indicating whether the input value is a valid date.
 */
export const isDate = (value: number | string) => {
  return !Number.isNaN(new Date(value).valueOf());
};
