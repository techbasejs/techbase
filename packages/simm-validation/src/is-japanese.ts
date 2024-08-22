import { JAPANESE_REGEX } from "./constants";
import { checkRegExp } from "./utils/check-regexp";

export const isJapaneseText = (str: string | null): boolean => {
  return checkRegExp(str, JAPANESE_REGEX);
};
