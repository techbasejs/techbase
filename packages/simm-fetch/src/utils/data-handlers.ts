// src/utils/dataHandlers.ts

export function getContentType(data: any): string {
  switch (typeof data) {
    case "object": {
      if (data === null) {
        return "application/json";
      }
      return "application/json";
    }
    case "string": {
      return "text/plain";
    }
    case "number": {
      return "text/plain";
    }
    case "boolean": {
      return "text/plain";
    }
    default: {
      return "application/json";
    }
  }
}

export function transformRequestData(data: any, contentType: string): any {
  switch (contentType) {
    case "application/json": {
      return JSON.stringify(data);
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
