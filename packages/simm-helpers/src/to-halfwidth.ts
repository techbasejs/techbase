/* eslint-disable unicorn/numeric-separators-style */

const latinConvertRE = {
  full: /[！-～]/g,
  delta: 0xfee0,
};

const kanaMap: {
  full: Record<string, string>;
} = {
  full: {
    ガ: "ｶﾞ",
    ギ: "ｷﾞ",
    グ: "ｸﾞ",
    ゲ: "ｹﾞ",
    ゴ: "ｺﾞ",
    ザ: "ｻﾞ",
    ジ: "ｼﾞ",
    ズ: "ｽﾞ",
    ゼ: "ｾﾞ",
    ゾ: "ｿﾞ",
    ダ: "ﾀﾞ",
    ヂ: "ﾁﾞ",
    ヅ: "ﾂﾞ",
    デ: "ﾃﾞ",
    ド: "ﾄﾞ",
    バ: "ﾊﾞ",
    ビ: "ﾋﾞ",
    ブ: "ﾌﾞ",
    ベ: "ﾍﾞ",
    ボ: "ﾎﾞ",
    パ: "ﾊﾟ",
    ピ: "ﾋﾟ",
    プ: "ﾌﾟ",
    ペ: "ﾍﾟ",
    ポ: "ﾎﾟ",
    ヴ: "ｳﾞ",
    ヷ: "ﾜﾞ",
    ヺ: "ｦﾞ",
    ア: "ｱ",
    イ: "ｲ",
    ウ: "ｳ",
    エ: "ｴ",
    オ: "ｵ",
    カ: "ｶ",
    キ: "ｷ",
    ク: "ｸ",
    ケ: "ｹ",
    コ: "ｺ",
    サ: "ｻ",
    シ: "ｼ",
    ス: "ｽ",
    セ: "ｾ",
    ソ: "ｿ",
    タ: "ﾀ",
    チ: "ﾁ",
    ツ: "ﾂ",
    テ: "ﾃ",
    ト: "ﾄ",
    ナ: "ﾅ",
    ニ: "ﾆ",
    ヌ: "ﾇ",
    ネ: "ﾈ",
    ノ: "ﾉ",
    ハ: "ﾊ",
    ヒ: "ﾋ",
    フ: "ﾌ",
    ヘ: "ﾍ",
    ホ: "ﾎ",
    マ: "ﾏ",
    ミ: "ﾐ",
    ム: "ﾑ",
    メ: "ﾒ",
    モ: "ﾓ",
    ヤ: "ﾔ",
    ユ: "ﾕ",
    ヨ: "ﾖ",
    ラ: "ﾗ",
    リ: "ﾘ",
    ル: "ﾙ",
    レ: "ﾚ",
    ロ: "ﾛ",
    ワ: "ﾜ",
    ヲ: "ｦ",
    ン: "ﾝ",
    ァ: "ｧ",
    ィ: "ｨ",
    ゥ: "ｩ",
    ェ: "ｪ",
    ォ: "ｫ",
    ッ: "ｯ",
    ャ: "ｬ",
    ュ: "ｭ",
    ョ: "ｮ",
    "。": "｡",
    "、": "､",
    ー: "ｰ",
    "「": "｢",
    "」": "｣",
    "・": "･",
    "゛": "ﾞ",
    "゜": "ﾟ",
  },
};

const flipWidthLatin = (str: string) => {
  const { full, delta } = latinConvertRE;
  const d = -delta;
  return str.replace(full, (c) => String.fromCharCode(c.charCodeAt(0) + d));
};

const flipWidthWhiteSpace = (str: string) => {
  return str.replace(/\u3000/g, "\u0020");
};

const flipWidthKatakana = (str: string) => {
  const mapTo = kanaMap.full;
  const re = new RegExp(`(${Object.keys(kanaMap.full).join("|")})`, "g");

  return str.replace(re, (c) => mapTo[c]);
};

const toFlipWidth = (str: string): string => {
  let converted = str;
  converted = flipWidthLatin(converted);
  converted = flipWidthWhiteSpace(converted);
  converted = flipWidthKatakana(converted);
  return converted;
};

/**
 * Convert a string to half-width.
 *
 * @param str - The string to convert.
 * @returns The converted string.
 */
export const toHalfWidth = (str?: string | null): string | undefined | null => {
  if (!str) return str;
  return toFlipWidth(str);
};
