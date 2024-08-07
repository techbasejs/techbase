/**
 * @description check if password has at least 8 characters,
 * contains number characters,
 * contains uppercase characters,
 * contains non-alphanumeric characters
 * @param value string
 * @returns boolean
 */
export const isPassword = (
  value: string,
  passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!$%&()*+,./:;<>?@[\\\]^_`{|}~-])[\w!$%&()*+,./:;<>?@[\\\]^`{|}~-]{8,}$/,
) => passwordRegex.test(value);
