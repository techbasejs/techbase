export const simmValidation = () => {};

import { isFullWidthChar } from "./jpValidation/is-fullwidth-char";
import { isHalfWidthChar } from "./jpValidation/is-halfwidth-char";

const jpValidator = {
  isFullWidthChar,
  isHalfWidthChar,
};

export default jpValidator;
