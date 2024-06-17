export const isImageURL = (str: string | null): boolean => {
  if (str == null) {
    return false;
  }

  const imageURLFormats = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
  return imageURLFormats.test(str);
};
