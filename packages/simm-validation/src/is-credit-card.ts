import { isLuhnNumber } from "./is-luhn-number";
import { REGEXS } from "./shared/constants";

const creditCardRegexs = REGEXS.CREDIT_CARD;

type CreditCardType = keyof typeof creditCardRegexs;

/**
 * Validates if the given string is credit card number or not.
 *
 * @param {any} input The string to validate.
 * @param {CreditCardType} provider The credit card's provider.
 * @returns {boolean} Returns true if the string is credit card number, false otherwise.
 *
 * @example
 * ```typescript
 * isCreditCard("6212345678900000003"); // true
 * isCreditCard("4012888888881881", "VISA"); // true
 * ```
 */
const isCreditCard = (input: any, provider?: CreditCardType) => {
  // Returns false input is not a string
  if (typeof input !== "string") return false;

  // Remove all dashes and spaces
  input = input.replace(/[\s-]+/g, "");

  // Check card format
  if (provider) {
    const cardRegex = creditCardRegexs[provider];

    // If card number is not valid format
    if (!cardRegex.test(input)) return false;
  } else {
    // If card number is not match any card regex
    if (
      Object.keys(creditCardRegexs).every(
        (cardProvider) =>
          !creditCardRegexs[cardProvider as CreditCardType].test(input),
      )
    )
      return false;
  }

  return isLuhnNumber(input);
};

export { isCreditCard, CreditCardType };
