const MIME_TYPE = {
  COMMON:
    /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+_]{1,100}$/i,
  TEXT: /^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i,
  MULTIPART:
    /^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i,
};

/**
 * Validates if the given string is mime type or not.
 *
 * @param {any} input The string to validate.
 * @returns {boolean} Returns true if the string is mime type, false otherwise.
 *
 * @example
 * ```typescript
 * isMimeType("image/jpeg"); // true
 * isMimeType("text/plain; charset=UTF-8"); // true
 * isMimeType("multipart/form-data; boundary=aBoundaryString"); // true
 * ```
 */
const isMimeType = (input: any) => {
  if (typeof input !== "string") return false;
  return Object.values(MIME_TYPE).some((regex) => regex.test(input));
};

export { isMimeType };
