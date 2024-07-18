export const isImageURL = (str: string | null): boolean => {
  if (!str) {
    return false;
  }

  function isValidUrl(str: string) {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  }

  if (isValidUrl(str)) {
    const imageURLFormats = /\.(jpeg|jpg|gif|png|bmp|webp)$/i;
    return imageURLFormats.test(str);
  } else {
    return false
  }
};
