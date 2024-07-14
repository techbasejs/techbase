import Cookies from "js-cookie";
//import { executeBeforeRequestHooks } from './hooks';
import { getContentType, transformRequestData } from "./data-handlers";
import { APIClientConfig } from "../types";
import { setContentTypeHeader } from "./manage-headers";
import { mergeConfigs } from "./merge-configs";

export const handleRequestSuccess = (
  config: APIClientConfig,
  clientConfig: APIClientConfig,
): any => {
  config = mergeConfigs(config, clientConfig);
  const contentType = getContentType(config.headers);
  const transformedData = transformRequestData(config.data, contentType);
  config.data = transformedData;
  return config;
};
