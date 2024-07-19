/**
 * Checks if a string contains any Kanji characters.
 *
 * @param {string} text - The string to check.
 * @returns {boolean} - Returns `true` if the string contains at least one Kanji character, otherwise returns `false`.
`
 */
export const isKanji = (text: string): boolean => {
  const kanjiRegex = /[\u4E00-\u9FFF]/;
  return kanjiRegex.test(text);
}
