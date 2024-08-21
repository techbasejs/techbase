/**
 * Renames a given file with a new name, optionally appending a timestamp.
 *
 * @param {File} file - The original file to be renamed.
 * @param {string} newName - The new name for the file.
 * @param {boolean} [hasTimestamp=false] - Whether to append a timestamp to the new name. Defaults to false.
 * @returns {File} - A new File object with the specified name and original file content.
 *
 * @example
 * const file = new File(["content"], "oldName.txt", { type: "text/plain" });
 * const renamedFile = renameFile(file, "newName", true);
 * // renamedFile.name could be "newName_2024-08-20T14-56-22-123Z.txt"
 */
export const renameFile = (
  file: File,
  newName: string,
  hasTimestamp: boolean = false,
): File => {
  let finalName = newName;
  if (hasTimestamp) {
    const timestamp = new Date().toISOString().replace(/[.:]/g, "-");
    finalName = `${newName}_${timestamp}`;
  }

  const newFile = new File([file], finalName, {
    type: file.type,
    lastModified: file.lastModified,
  });
  return newFile;
};
