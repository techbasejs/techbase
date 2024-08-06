// src/utils/dataHandlers.ts


export function getContentType(data: any): string {
  //Todo return Content Type by data Input
  return 'application/json';
}

export function transformRequestData(data: any, contentType: string): any {
  switch (contentType) {
    case 'application/json': {
      return JSON.stringify(data);
    }
    case 'text/plain': {
      return data.toString();
    }
    default: {
      return data;
    }
  }
}

export function parseResponseData(data: any, contentType: string): any {
  if (contentType === 'application/json' && typeof data === 'string') {
    return JSON.parse(data);
  }
  return data;
}
