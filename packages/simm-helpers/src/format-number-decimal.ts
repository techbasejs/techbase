/**
 * Convert data to decimal.
 * @param input - The input value.
 * @param fixed - Optional number of decimal places.
 * @returns The converted number.
 */
export const formatDecimal = (input: number, fixed?: number): number => {
  if (input === null || input === undefined || Number.isNaN(input)) {
    return 0;
  }
  if (typeof fixed === "number") {
    return Number(input.toFixed(fixed));
  }
  return input;
};
