import { AxiosError } from "axios";
import { CustomError, BadRequestError, UnauthorizedError } from "../errors";
import { STATUS_CODES, ERROR_MESSAGES } from "../constants";

export const handleRequestError = (error: AxiosError): CustomError => {
  //Todo Handle error
  return new CustomError("No response received from server", 0);
};
