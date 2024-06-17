export const simmValidation = () => {};

export const isRequired = (value: number) => {
  if (value === 1) return true;

  return false;
};

export const minLength = (value: string | any[], minLength: number) => {
  if (value.length >= minLength) return true;
  return false;
};

export const maxLength = (value: string | any[], maxLength: number) => {
  if (value.length <= maxLength) return true;
  return false;
};

export const isInRange = (min: number, max: number) => {
  return (value: number) => value >= min && value <= max;
};