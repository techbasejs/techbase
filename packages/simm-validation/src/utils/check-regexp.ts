export const checkRegExp = (
  str: string | number | null,
  pattern: RegExp,
): boolean => {
  if (isEmpty(str)) {
    return false;
  }
  return pattern.test(str!.toString());
};

export const isEmpty = (str: string | number | null): boolean => {
  if (str === null || str === undefined) {
    return true;
  }
  return str.toString().trim().length === 0;
};
