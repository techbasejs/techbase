import Cookies from 'js-cookie';
//import { executeBeforeRequestHooks } from './hooks';
import { getContentType, transformRequestData } from './data-handlers';
import { APIClientConfig } from '../types';
import { setContentTypeHeader } from './manage-headers';
import mergeConfigs from './merge-configs';

export const handleRequestSuccess = (config: APIClientConfig, clientConfig: APIClientConfig): any => {
  //Todo merege Config 
  //Handle Config
  return config;
};
