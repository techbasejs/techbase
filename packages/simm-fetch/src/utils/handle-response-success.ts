import { AxiosResponse } from "axios";
import { executeAfterResponseHooks } from "./hooks";
import { getContentType, parseResponseData } from "./data-handlers";
import { APIClientConfig } from "../types";

export const handleResponseSuccess = async (
  response: AxiosResponse,
  clientConfig: APIClientConfig,
): Promise<AxiosResponse> => {
  //Todo Handle response Data
  //Using hook if have
  return response;
};
