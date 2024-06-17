export const simmValidation = () => {};

export const isRequired = (value: number) => {
  if (value === 1) return true;

  return false;
};
export const checkMinLength = (value: string | any[], minLength: number) => {
  if (value.length >= minLength) return true;
  return false;
};

export const checkMaxLength = (value: string | any[], maxLength: number) => {
  if (value.length <= maxLength) return true;
  return false;
};