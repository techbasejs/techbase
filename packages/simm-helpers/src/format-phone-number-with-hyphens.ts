/**
 * Convert phone number with hyphens using regex.
 * @param input - The input value.
 * @returns The converted string | number | undefined.
 */
export const formatPhoneNumberWithHyphens = (
  input: string | number | undefined,
): string | number | undefined => {
  if (!input) return input;

  const phoneNumber = input.toString();
  const isStartPlus = phoneNumber.startsWith("+");
  const phoneNumberDigits = isStartPlus ? phoneNumber.slice(1) : phoneNumber;
  const formattedNumber = phoneNumberDigits.replace(
    /(\d{3})(\d{3})(\d{4})(\d+)?/,
    (match, p1, p2, p3, p4) => {
      if (p4) {
        return `${p1}-${p2}-${p3}-${p4}`;
      } else if (p3) {
        return `${p1}-${p2}-${p3}`;
      } else if (p2) {
        return `${p1}-${p2}`;
      } else {
        return p1;
      }
    },
  );

  return isStartPlus ? `+${formattedNumber}` : formattedNumber;
};
