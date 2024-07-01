export const simmUpload = () => {
  const renameFile = (file: File, newName: string): File => {
    const newFile = new File([file], newName, {
      type: file.type,
      lastModified: file.lastModified,
    });
    return newFile;
  };
  return {
    renameFile,
  };
};