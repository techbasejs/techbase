type FileEvent = Event;

interface FileError {
  file: File;
  error: string;
}

export class SimmUploader {
  private uploadedFiles: File[] = [];

  addFiles(files: File[], evt: FileEvent): void {
    evt.preventDefault();

    const validFiles: File[] = [];
    const rejectedFiles: FileError[] = [];

    for (const file of files) {
      if (file.size === 0) {
        rejectedFiles.push({ file, error: "Empty file" });
      } else if (this.isDuplicateFile(file)) {
        rejectedFiles.push({ file, error: "Duplicate file" });
      } else {
        this.uploadedFiles.push(file);
        validFiles.push(file);
      }
    }
  }

  private isDuplicateFile(file: File): boolean {
    return this.uploadedFiles.some(
      (uploadedFile) =>
        uploadedFile.name === file.name && uploadedFile.size === file.size,
    );
  }
}
