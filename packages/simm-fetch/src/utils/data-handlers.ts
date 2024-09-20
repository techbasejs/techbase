// src/utils/dataHandlers.ts

export function getContentType(data: any): string {
  switch (typeof data) {
    case "string":
    case "number":
    case "boolean": {
      return "text/plain";
    }
    case "object": {
      // if (data instanceof FormData) {
      //   return "multipart/form-data";
      // }
      // if (Object.prototype.toString.call(data) === "[object FormData]") {
      //   return "multipart/form-data";
      // }
      // if (data instanceof File || data instanceof Blob) {
      //   return "application/octet-stream";
      // }
      return "application/json";
    }
    default: {
      return "application/json";
    }
  }
}

export function transformRequestData(data: any, contentType: string): any {
  switch (contentType) {
    case "application/json": {
      return data && JSON.stringify(data);
    }
    case "text/plain": {
      return data.toString();
    }
    default: {
      return data;
    }
  }
}

export function parseResponseData(data: any, contentType: string): any {
  switch (contentType) {
    case "application/json": {
      if (typeof data === "string") {
        return JSON.parse(data);
      }
      return data;
    }
    case "text/plain": {
      return data.toString();
    }
    default: {
      return data;
    }
  }
}
