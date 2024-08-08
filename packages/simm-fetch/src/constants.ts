export const BASE_URL_API = "https://api.example.com";
export const HTTP_STATUS_CODE = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  // ... other status codes
  //
};
// src/constants.ts

export const STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  // ... Add other status codes as needed
};

export const ERROR_MESSAGES = {
  [STATUS_CODES.BAD_REQUEST]: "Bad Request",
  [STATUS_CODES.UNAUTHORIZED]: "Unauthorized",
  [STATUS_CODES.FORBIDDEN]: "Forbidden",
  [STATUS_CODES.NOT_FOUND]: "Not Found",
  [STATUS_CODES.INTERNAL_SERVER_ERROR]: "Internal Server Error",
  // ... Add other messages as needed
};
