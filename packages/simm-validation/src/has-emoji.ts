/**
 * Checks if a given string contains any emoji characters.
 * @param {string | null | undefined} value - The string to check for emoji characters.
 * @return {boolean} Returns true if the string contains emoji characters, false otherwise.
 */
export const hasEmoji = (value: string | null | undefined): boolean => {
  if (!value) return false;
  const regexEmoji =
    /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{231B}\u{23E9}-\u{23EC}\u{23F0}\u{23F3}\u{25AA}-\u{25AB}\u{25B6}-\u{25C0}\u{25FB}-\u{25FE}]/gu;
  const regExpEmoji = new RegExp(regexEmoji);
  return regExpEmoji.test(value);
};
