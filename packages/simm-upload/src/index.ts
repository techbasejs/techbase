export const simmUpload = () => {
  const renameFile = (
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

  return {
    renameFile,
  };
};
