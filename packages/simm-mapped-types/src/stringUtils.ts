
/**
 * Convert full-width Katakana to full-width Hiragana.
 * @param input - The input value.
 * @returns The converted string.
 */
export function katakanaToHiragana(input: string): string {
  return input.replace(/[\u30A1-\u30F6]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) - 0x60)
  );
}

/**
 * Convert full-width Hiragana to full-width Katakana.
 * @param input - The input value.
 * @returns The converted string.
 */
export function hiraganaToKatakana(input: string): string {
  return input.replace(/[\u3041-\u3096]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) + 0x60)
  );
}

/**
 * Convert full-width Hiragana to half-width Katakana.
 * @param input - The input value.
 * @returns The converted string.
 */
export function hiraganaToHalfWidthKatakana(input: string): string {
  return hiraganaToKatakana(input).replace(/[\u30A1-\u30F6]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) - 0xcf_25)
  );
}

/**
 * Convert full-width Katakana to half-width Hiragana.
 * @param input - The input value.
 * @returns The converted string.
 */
export function katakanaToHalfWidthHiragana(input: string): string {
  return katakanaToHiragana(input).replace(/[\u3041-\u3096]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) - 0xcf_25)
  );
}
