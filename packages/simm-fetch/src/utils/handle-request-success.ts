import { APIClientConfig } from '../types';
import {mergeConfigs} from './merge-configs';

export const handleRequestSuccess = (config: APIClientConfig, clientConfig: APIClientConfig): any => {
  return mergeConfigs(config, clientConfig);
};
