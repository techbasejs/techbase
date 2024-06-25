/**
 * @description check if email is valid
 * @param email string
 * @returns boolean
 */
export const isStandardEmail = (email: string, emailRegex = /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/) => {
    return emailRegex.test(email);
};