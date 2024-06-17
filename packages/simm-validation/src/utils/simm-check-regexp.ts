export const simmCheckRegexp = (
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

  if (typeof str === "number") {
    return str.toString().trim().length === 0;
  }

  return str.trim().length === 0;
};
