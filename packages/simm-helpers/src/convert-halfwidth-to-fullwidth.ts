/* eslint-disable unicorn/numeric-separators-style */

const flipLatinCharRegex = {
  half: /[!-~]/g,
  delta: 0xfee0,
};

const katakanaMapping: Record<string, string> = {
  ｶﾞ: "ガ",
  ｷﾞ: "ギ",
  ｸﾞ: "グ",
  ｹﾞ: "ゲ",
  ｺﾞ: "ゴ",
  ｻﾞ: "ザ",
  ｼﾞ: "ジ",
  ｽﾞ: "ズ",
  ｾﾞ: "ゼ",
  ｿﾞ: "ゾ",
  ﾀﾞ: "ダ",
  ﾁﾞ: "ヂ",
  ﾂﾞ: "ヅ",
  ﾃﾞ: "デ",
  ﾄﾞ: "ド",
  ﾊﾞ: "バ",
  ﾋﾞ: "ビ",
  ﾌﾞ: "ブ",
  ﾍﾞ: "ベ",
  ﾎﾞ: "ボ",
  ﾊﾟ: "パ",
  ﾋﾟ: "ピ",
  ﾌﾟ: "プ",
  ﾍﾟ: "ペ",
  ﾎﾟ: "ポ",
  ｳﾞ: "ヴ",
  ﾜﾞ: "ヷ",
  ｦﾞ: "ヺ",
  ｱ: "ア",
  ｲ: "イ",
  ｳ: "ウ",
  ｴ: "エ",
  ｵ: "オ",
  ｶ: "カ",
  ｷ: "キ",
  ｸ: "ク",
  ｹ: "ケ",
  ｺ: "コ",
  ｻ: "サ",
  ｼ: "シ",
  ｽ: "ス",
  ｾ: "セ",
  ｿ: "ソ",
  ﾀ: "タ",
  ﾁ: "チ",
  ﾂ: "ツ",
  ﾃ: "テ",
  ﾄ: "ト",
  ﾅ: "ナ",
  ﾆ: "ニ",
  ﾇ: "ヌ",
  ﾈ: "ネ",
  ﾉ: "ノ",
  ﾊ: "ハ",
  ﾋ: "ヒ",
  ﾌ: "フ",
  ﾍ: "ヘ",
  ﾎ: "ホ",
  ﾏ: "マ",
  ﾐ: "ミ",
  ﾑ: "ム",
  ﾒ: "メ",
  ﾓ: "モ",
  ﾔ: "ヤ",
  ﾕ: "ユ",
  ﾖ: "ヨ",
  ﾗ: "ラ",
  ﾘ: "リ",
  ﾙ: "ル",
  ﾚ: "レ",
  ﾛ: "ロ",
  ﾜ: "ワ",
  ｦ: "ヲ",
  ﾝ: "ン",
  ｧ: "ァ",
  ｨ: "ィ",
  ｩ: "ゥ",
  ｪ: "ェ",
  ｫ: "ォ",
  ｯ: "ッ",
  ｬ: "ャ",
  ｭ: "ュ",
  ｮ: "ョ",
  "｡": "。",
  "､": "、",
  ｰ: "ー",
  "｢": "「",
  "｣": "」",
  "･": "・",
  ﾟ: "゜",
  ﾞ: "゛",
};

const flipWidthLatin = (str: string) => {
  const { half, delta } = flipLatinCharRegex;
  return str.replace(half, (c) => String.fromCharCode(c.charCodeAt(0) + delta));
};

const flipWidthWhiteSpace = (str: string) => {
  return str.replace(/\u0020/g, "\u3000");
};

const flipWidthKatakana = (str: string) => {
  const re = new RegExp(`(${Object.keys(katakanaMapping).join("|")})`, "g");

  return str.replace(re, (c) => katakanaMapping[c]);
};

const convertToFullWidth = (str: string): string => {
  let converted = str;
  converted = flipWidthLatin(converted);
  converted = flipWidthWhiteSpace(converted);
  converted = flipWidthKatakana(converted);
  return converted;
};

/**
 * Convert a string to full-width.
 *
 * @param str - The string to convert.
 * @returns The converted string.
 */
const convertHalfwidthToFullwidth = (str: string): string =>
  convertToFullWidth(str);

export { convertHalfwidthToFullwidth };
