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
  IP_V4:
    /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/,
  IP_V6:
    /^(?:^|(?<=\s))(([\dA-Fa-f]{1,4}:){7}[\dA-Fa-f]{1,4}|([\dA-Fa-f]{1,4}:){1,7}:|([\dA-Fa-f]{1,4}:){1,6}:[\dA-Fa-f]{1,4}|([\dA-Fa-f]{1,4}:){1,5}(:[\dA-Fa-f]{1,4}){1,2}|([\dA-Fa-f]{1,4}:){1,4}(:[\dA-Fa-f]{1,4}){1,3}|([\dA-Fa-f]{1,4}:){1,3}(:[\dA-Fa-f]{1,4}){1,4}|([\dA-Fa-f]{1,4}:){1,2}(:[\dA-Fa-f]{1,4}){1,5}|[\dA-Fa-f]{1,4}:((:[\dA-Fa-f]{1,4}){1,6})|:((:[\dA-Fa-f]{1,4}){1,7}|:)|fe80:(:[\dA-Fa-f]{0,4}){0,4}%[\dA-Za-z]+|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}\d){0,1}\d)\.){3}(25[0-5]|(2[0-4]|1{0,1}\d){0,1}\d)|([\dA-Fa-f]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}\d){0,1}\d)\.){3}(25[0-5]|(2[0-4]|1{0,1}\d){0,1}\d))(?=\s|$)/,
  rgbColor: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
  HEXCOLOR: /^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/,
  HEXCOLOR_OPACITY:
    /^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6}|[\dA-Fa-f]{8}|[\dA-Fa-f]{4})$/,
  HSL_WITH_COMMA:
    /^hsla?\(((\+|\-)?(\d+(\.\d+)?(e(\+|\-)?\d+)?|\.\d+(e(\+|\-)?\d+)?))(deg|grad|rad|turn)?(,(\+|\-)?(\d+(\.\d+)?(e(\+|\-)?\d+)?|\.\d+(e(\+|\-)?\d+)?)%){2}(,((\+|\-)?(\d+(\.\d+)?(e(\+|\-)?\d+)?|\.\d+(e(\+|\-)?\d+)?)%?))?\)$/i,
  HSL_WITH_SPACE:
    /^hsla?\(((\+|\-)?(\d+(\.\d+)?(e(\+|\-)?\d+)?|\.\d+(e(\+|\-)?\d+)?))(deg|grad|rad|turn)?(\s(\+|\-)?(\d+(\.\d+)?(e(\+|\-)?\d+)?|\.\d+(e(\+|\-)?\d+)?)%){2}\s?(\/\s((\+|\-)?(\d+(\.\d+)?(e(\+|\-)?\d+)?|\.\d+(e(\+|\-)?\d+)?)%?)\s?)?\)$/i,
  UPPERCASE_REGEX: /^[A-Z]$/,
  LOWERCASE_REGEX: /^[a-z]$/,
  NUMERIC_REGEX: /^[0-9]$/,
  SYMBOL_REGEX: /^[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/\\ ]$/,
  EMOJI:
    /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{2B55}\u{231A}-\u{231B}\u{23E9}-\u{23EC}\u{23F0}\u{23F3}\u{25AA}-\u{25AB}\u{25B6}-\u{25C0}\u{25FB}-\u{25FE}]/gu,
  CREDIT_CARD: {
    AMEX: /^3[47][0-9]{13}$/,
    DINERSCLUB: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    DISCOVER: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
    MASTERCARD:
      /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
    UNIONPAY: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,
    VISA: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/,
  },
};

export { REGEXS };
