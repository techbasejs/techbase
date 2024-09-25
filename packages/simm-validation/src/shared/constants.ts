const REGEXS = {
  KANA: /^[\u3040-\u30FF]+$/,
  ALPHANUMERIC: /^[\dA-Za-z]+$/,
  FULL_WIDTH_KANA: /^[\u3000ァ-ヺ・ー]+$/,
  HIRAGANA: /^[\u3040-\u309F]+$/,
  DEFAULT_PHONE_NUMBER:
    /^(0([1-9]-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d-?\d{2}|[1-9]{2}\d{2}-?\d)-?\d{4}|0[7-9]0(?:-?\d{4}){2}|050(?:-?\d{4}){2})$/,
  URL: /^(https?|ftp):\/\/(?:www\.)?((?:[\d!#$%&'()*+,./:;=?@[\]a-z~-]+(?:\.[\d!#$&'()*+,./:;=?@[\]a-z~-]*)*)|(?:\d{1,3}\.){3}\d{1,3})(?::\d{2,5})?(?:[#/?]\S*)?$/i,
  BASE64:
    /^(?:[\d+/A-Za-z]{4})*(?:[\d+/A-Za-z]{2}==|[\d+/A-Za-z]{3}=|[\d+/A-Za-z]{4})$/,
  rgbColor: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
  HEXCOLOR: /^#([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/,
  HEXCOLOR_OPACITY:
    /^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6}|[\dA-Fa-f]{8}|[\dA-Fa-f]{4})$/,
};
export { REGEXS };
