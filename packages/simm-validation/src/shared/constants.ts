const REGEXS = {
  ALPHANUMERIC: /^[\dA-Za-z]+$/,

  // Japanese text regex
  KANA: /^[\u3040-\u30FF]+$/,
  FULL_WIDTH_KANA: /^[\u3000ァ-ヺ・ー]+$/,
  HIRAGANA: /^[\u3040-\u309F]+$/,
  ROMAJI: /^[\sA-Za-z]+$/,
  KANJI: /[\u4E00-\u9FFF]/,
  KATAKANA: /^[\u30A0-\u30FF\u31F0-\u31FF\uFF65-\uFF9F]+$/,

  DEFAULT_PHONE_NUMBER:
    /^(0([1-9]-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d-?\d{2}|[1-9]{2}\d{2}-?\d)-?\d{4}|0[7-9]0(?:-?\d{4}){2}|050(?:-?\d{4}){2})$/,
  URL: /^(https?|ftp):\/\/(?:www\.)?((?:[\d!#$%&'()*+,./:;=?@[\]a-z~-]+(?:\.[\d!#$&'()*+,./:;=?@[\]a-z~-]*)*)|(?:\d{1,3}\.){3}\d{1,3})(?::\d{2,5})?(?:[#/?]\S*)?$/i,
  BASE64:
    /^(?:[\d+/A-Za-z]{4})*(?:[\d+/A-Za-z]{2}==|[\d+/A-Za-z]{3}=|[\d+/A-Za-z]{4})$/,
  rgbColor: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
  HEXCOLOR: /^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/,
  HEXCOLOR_OPACITY:
    /^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6}|[\dA-Fa-f]{8}|[\dA-Fa-f]{4})$/,

  EMOJI:
    /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{231B}\u{23E9}-\u{23EC}\u{23F0}\u{23F3}\u{25AA}-\u{25AB}\u{25B6}-\u{25C0}\u{25FB}-\u{25FE}]/gu,
};

export { REGEXS };
