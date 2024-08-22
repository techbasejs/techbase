// \u3040-\u309F: Hiragana.
// \u30A0-\u30FF: Katakana.
// \uFF00-\uFF9F: Full-width và half-width Katakana.
// \u4E00-\u9FFF: Kanji.
export const JAPANESE_REGEX = /^[\u3040-\u30FF\u4E00-\u9FFF\uFF00-\uFF9F]+$/;
