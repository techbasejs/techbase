import APIClient from './api-client';
import APIConfig from './api-config';
export * from './constants';
export * from './errors';
export * from './types';
export * from './utils/data-handlers';
export * from './utils/query-params';
export * from './utils/hooks';
export * from './utils/index'

function createAPIClient(config: APIConfig): APIClient {
    const client = new APIClient(config.getConfig());
    return client;
  }

export {
  createAPIClient
};

export {default as APIClient} from './api-client';
export {default as APIConfig} from './api-config';
