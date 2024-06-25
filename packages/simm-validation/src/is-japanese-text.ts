import { JAPANESE_REGEX } from "./utils/regex";
import { simmCheckRegexp } from "./utils/simm-check-regexp";

export const isJapaneseText = (str: string | null): boolean => {
  return simmCheckRegexp(str, JAPANESE_REGEX);
};
