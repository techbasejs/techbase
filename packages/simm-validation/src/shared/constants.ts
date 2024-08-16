const REGEXS = {
  KANA: /^[\u3040-\u30FF]+$/,
  ALPHANUMERIC: /^[\dA-Za-z]+$/,
  FULL_WIDTH_KANA: /^[\u3000ァ-ヺ・ー]+$/,
  HIRAGANA: /^[\u3040-\u309F]+$/,
  DEFAULT_PHONE_NUMBER:
    /^(0([1-9]-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d-?\d{2}|[1-9]{2}\d{2}-?\d)-?\d{4}|0[7-9]0(?:-?\d{4}){2}|050(?:-?\d{4}){2})$/,
  URL: /^(https?|ftp):\/\/(?:www\.)?((?:[\d!#$%&'()*+,./:;=?@[\]a-z~-]+(?:\.[\d!#$&'()*+,./:;=?@[\]a-z~-]*)*)|(?:\d{1,3}\.){3}\d{1,3})(?::\d{2,5})?(?:[#/?]\S*)?$/i,
};
export { REGEXS };