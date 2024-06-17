import { isImageURL } from "./imageUrl/is-image-url";

export const simmValidation = () => {};

export const isRequired = (value: number) => {
  if (value === 1) return true;

  return false;
};

export { isImageURL };