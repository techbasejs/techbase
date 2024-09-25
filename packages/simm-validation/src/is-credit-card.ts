import { isLuhnNumber } from "./is-luhn-number";
import { REGEXS } from "./shared/constants";

const creditCardRegexs = REGEXS.CREDIT_CARD;

type CreditCardType = keyof typeof creditCardRegexs;

const isCreditCard = (input: any, provider?: CreditCardType) => {
  // Returns false input is not a string
  if (typeof input !== "string") return false;

  // Remove all dashes and spaces
  input = input.replace(/[- ]+/g, "");

  // Check card format
  if (provider) {
    const cardRegex = creditCardRegexs[provider];

    // If provider does not exist
    if (!cardRegex) return false;

    // If card number is not valid format
    if (!cardRegex.test(input)) return false;
  } else {
    // If card number is not match any card regex
    if (
      Object.keys(creditCardRegexs).every(
        (cardProvider) =>
          !creditCardRegexs[cardProvider as CreditCardType].test(input)
      )
    )
      return false;
  }

  return isLuhnNumber(input);
};

export { isCreditCard, CreditCardType };
