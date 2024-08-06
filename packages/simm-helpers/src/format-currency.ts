/**
 * Convert Currency to specified format.
 * @param input - The input value.
 * @param currency - The currency code (e.g., 'USD', 'JPY').
 * @param fixed - Optional number of decimal places for JPY.
 * @returns The converted string.
 */
export const formatCurrency = (
  input: string | number,
  currency: "USD" | "JPY",
  fixed?: number,
): string => {
  if (!input && input !== 0 && input !== "0") {
    return currency === "USD" ? "$0" : "￥0";
  }

  let numberInput = typeof input === "string" ? Number(input) : input;
  const isNegative = numberInput < 0;
  numberInput = Math.abs(numberInput);

  if (
    currency === "JPY" &&
    fixed !== undefined &&
    fixed !== null &&
    fixed >= 0
  ) {
    numberInput = Number.parseFloat(numberInput.toFixed(fixed));
  }

  const formattedCurrency = new Intl.NumberFormat(
    currency === "USD" ? "en-US" : "ja-JP",
    {
      style: "currency",
      currency: currency,
      minimumFractionDigits:
        currency === "JPY" && fixed !== undefined ? fixed : 2,
      maximumFractionDigits:
        currency === "JPY" && fixed !== undefined ? fixed : 2,
    },
  ).format(numberInput);

  if (isNegative) {
    return currency === "USD"
      ? `(-${formattedCurrency})`
      : `-${formattedCurrency}`;
  }
  return formattedCurrency;
};
