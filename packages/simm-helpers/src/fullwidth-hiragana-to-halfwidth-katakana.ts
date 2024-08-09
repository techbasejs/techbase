const FIRST_FULL_WIDTH_HIRAGANA = "ぁ";
const LAST_FULL_WIDTH_HIRAGANA = "ゖ";

const REGEXP_HIRAGANA = new RegExp(
  "[" + FIRST_FULL_WIDTH_HIRAGANA + "-" + LAST_FULL_WIDTH_HIRAGANA + "　・ー]",
  "g",
);

const mapFullWidthHiraganaToHalfWidthKatakana = new Map<string, string>([
  ["ぁ", "ｧ"],
  ["あ", "ｱ"],
  ["ぃ", "ｨ"],
  ["い", "ｲ"],
  ["ぅ", "ｩ"],
  ["う", "ｳ"],
  ["ぇ", "ｪ"],
  ["え", "ｴ"],
  ["ぉ", "ｫ"],
  ["お", "ｵ"],
  ["か", "ｶ"],
  ["が", "ｶﾞ"],
  ["き", "ｷ"],
  ["ぎ", "ｷﾞ"],
  ["く", "ｸ"],
  ["ぐ", "ｸﾞ"],
  ["け", "ｹ"],
  ["げ", "ｹﾞ"],
  ["こ", "ｺ"],
  ["ご", "ｺﾞ"],
  ["さ", "ｻ"],
  ["ざ", "ｻﾞ"],
  ["し", "ｼ"],
  ["じ", "ｼﾞ"],
  ["す", "ｽ"],
  ["ず", "ｽﾞ"],
  ["せ", "ｾ"],
  ["ぜ", "ｾﾞ"],
  ["そ", "ｿ"],
  ["ぞ", "ｿﾞ"],
  ["た", "ﾀ"],
  ["だ", "ﾀﾞ"],
  ["ち", "ﾁ"],
  ["ぢ", "ﾁﾞ"],
  ["っ", "ｯ"],
  ["つ", "ﾂ"],
  ["づ", "ﾂﾞ"],
  ["て", "ﾃ"],
  ["で", "ﾃﾞ"],
  ["と", "ﾄ"],
  ["ど", "ﾄﾞ"],
  ["な", "ﾅ"],
  ["に", "ﾆ"],
  ["ぬ", "ﾇ"],
  ["ね", "ﾈ"],
  ["の", "ﾉ"],
  ["は", "ﾊ"],
  ["ば", "ﾊﾞ"],
  ["ぱ", "ﾊﾟ"],
  ["ひ", "ﾋ"],
  ["び", "ﾋﾞ"],
  ["ぴ", "ﾋﾟ"],
  ["ふ", "ﾌ"],
  ["ぶ", "ﾌﾞ"],
  ["ぷ", "ﾌﾟ"],
  ["へ", "ﾍ"],
  ["べ", "ﾍﾞ"],
  ["ぺ", "ﾍﾟ"],
  ["ほ", "ﾎ"],
  ["ぼ", "ﾎﾞ"],
  ["ぽ", "ﾎﾟ"],
  ["ま", "ﾏ"],
  ["み", "ﾐ"],
  ["む", "ﾑ"],
  ["め", "ﾒ"],
  ["も", "ﾓ"],
  ["ゃ", "ｬ"],
  ["や", "ﾔ"],
  ["ゅ", "ｭ"],
  ["ゆ", "ﾕ"],
  ["ょ", "ｮ"],
  ["よ", "ﾖ"],
  ["ら", "ﾗ"],
  ["り", "ﾘ"],
  ["る", "ﾙ"],
  ["れ", "ﾚ"],
  ["ろ", "ﾛ"],
  ["ゎ", "ﾜ"],
  ["わ", "ﾜ"],
  ["ゐ", "ｲ"],
  ["ゑ", "ｴ"],
  ["を", "ｦ"],
  ["ん", "ﾝ"],
  ["ゔ", "ｳﾞ"],
  ["ゕ", "ｶ"],
  ["ゖ", "ｹ"],
  ["・", "･"],
  ["ー", "ｰ"],
  ["　", " "],
]);

/**
 * Replaces full-width Hiragana characters with half-width Katakana characters in the input string.
 * @param {string} inputStr - The input string containing full-width Hiragana characters.
 * @return {string} The string with full-width Hiragana characters replaced by half-width Katakana characters.
 */
export const convertFullWidthHiraganaToHalfWidthKatakana = (
  inputStr: string | undefined | null,
): string => {
  if (!inputStr) {
    return "";
  }
  return inputStr.replace(REGEXP_HIRAGANA, (char) => {
    return mapFullWidthHiraganaToHalfWidthKatakana.get(char) as string;
  });
};
