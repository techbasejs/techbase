/**
 * @description check if email is valid
 * @param email string
 * @returns boolean
 */
export const isStandardEmail = (
  email: string,
  emailRegex = /^[\w%+.-]+@[\w.-]+(?:\.[A-Za-z]{2,}){1,2}$/,
) => {
  return emailRegex.test(email);
};
