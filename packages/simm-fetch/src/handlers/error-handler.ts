import { HTTP_STATUS_CODE } from "../constants";

export const handleErrorResponse = (error: any) => {
  if (error.response) {
    const status = error.response.status;
    if (
      status === HTTP_STATUS_CODE.UNAUTHORIZED ||
      status === HTTP_STATUS_CODE.FORBIDDEN
    ) {
      // Handle token refresh logic here
    }
  }
  throw error;
};
