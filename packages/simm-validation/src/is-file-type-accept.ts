import { fileTypes } from "../utils/file-types";

const getFileExtension = (fileName: string): string => {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1 || lastDotIndex === 0) return "";
  return fileName.slice(lastDotIndex + 1).toLowerCase();
};

export const isFileTypeAccepct = (
  file: File,
  fileFormats: string[] = fileTypes,
) => {
  const fileExtension = getFileExtension(file.name);
  return fileFormats.includes(fileExtension);
};
