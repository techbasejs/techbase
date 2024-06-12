export const simmValidation = () => {};

export const isRequired = (value: number) => {
  if (value === 1) return true;

  return false;
};
/**
 * @description check if password has at least 8 characters,
 * contains number characters,
 * contains uppercase characters,
 * contains non-alphanumeric characters
 * @param value string
 * @returns boolean
 */
export const isStandardPassword = (value: string) => {
  if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[!$%&()*?@^])[\d!$%&()*?@A-Z^a-z]{8,}$/.test(
      value,
    )
  ) {
    return false;
  }
  return true;
};

/**
 * @description check if email is valid
 * @param email string
 * @returns boolean
 */
export const isStandardEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
