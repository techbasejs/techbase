/**
 * @description check if password has at least 8 characters,
 * contains number characters,
 * contains uppercase characters,
 * contains non-alphanumeric characters
 * @param value string
 * @returns boolean
 */
export const isStandardPassword = (
  value: string,
  passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!$%&()*?@^])[\d!$%&()*?@A-Z^a-z]{8,}$/,
) => {
  if (!passwordRegex.test(value)) {
    return false;
  }
  return true;
};
