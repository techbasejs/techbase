import { fileTypes } from "../utils/file-types";
export const simmValidation = () => {};

export const isRequired = (value: number) => {
  if (value === 1) return true;

  return false;
};

export const isFileTypeAccepct = (file: File, fileFormats: string[] = fileTypes) => {
  const getFileExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === 0) return '';
    return fileName.slice(lastDotIndex + 1).toLowerCase();
  };

  const fileExtension = getFileExtension(file.name);
  return fileFormats.includes(fileExtension);
};

export const isValidFile = (file: File, maxSize: number = 1024*1024) => {
  if (file.size < maxSize) return true;
  return false;
};