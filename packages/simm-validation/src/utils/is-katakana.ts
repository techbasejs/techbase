/**
 * Checks if the input string contains only Katakana characters.
 *
 * @param {string} input - The string to check.
 * @return {boolean} Returns true if the input string contains only Katakana characters, false otherwise.
 */
export function isKatakana(input: string): boolean {
  // eslint-disable-next-line unicorn/better-regex
  const katakanaRegex = /^[\u30A0-\u30FF\uFF65-\uFF9F\u31F0-\u31FF]+$/;
  return katakanaRegex.test(input);
}
