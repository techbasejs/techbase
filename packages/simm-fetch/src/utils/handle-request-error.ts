import { AxiosError } from "axios";

export const handleRequestError = (error: AxiosError): Promise<any> => {
  // return new CustomError("No response received from server", 0);
};
