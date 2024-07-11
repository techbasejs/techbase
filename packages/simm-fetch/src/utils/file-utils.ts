
export function isFile(value: any): boolean {
  return (
    typeof File !== 'undefined' && value instanceof File ||
    typeof Blob !== 'undefined' && value instanceof Blob ||
    typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer ||
    typeof Buffer !== 'undefined' && value instanceof Buffer
  );
}

export function transformFileData(data: any): FormData {
  const formData = new FormData();

  if (Array.isArray(data)) {
    data.forEach((file: any, index) => {
      if (isFile(file)) {
        formData.append(`file${index}`, file);
      }
    });
  } else {
    if (isFile(data)) {
      formData.append('file', data);
    }
  }

  return formData;
}


export function validateFile(file: File, allowedTypes: string[], maxSize: number): boolean {
  if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return false;
  }
  if (maxSize && file.size > maxSize) {
    return false;
  }
  return true;
}
  