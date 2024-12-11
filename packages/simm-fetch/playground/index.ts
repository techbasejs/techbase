/* eslint-disable unicorn/no-null */
// import {APIClient, APIConfig} from '../src/index';
// function createAPIClient(config: APIConfig): APIClient {
//   const client = new APIClient(config.getConfig());
//   return client;
// }

// const newConfig = new APIConfig({
//   baseURL: '',
// })

// //Test handle query param
// //Todo
// newConfig.setBaseURL("http://localhost:4000");
// const client = createAPIClient(newConfig)
// const checkApiGetUser = async() => {
//   client.get('/user',  {
//     username: "A",
//     id: "1",
//     list: [0,1,2]
//   })
//     .then(response => {console.log(response.data)})
//     .catch(error => console.error(error));
// }
// checkApiGetUser();

// const checkApiGetUserWithArrayParamsBracket = async() => {
//   client.get('/user',  {
//     username: "A",
//     id: "1",
//     list: [0, null, 2],
//     address: null,
//     phone: undefined,
//   }, {
//     queryConfig: {
//       arrayFormat: 'bracket',
//       skipNull : true,
//       sort: false,
//     }
//   })
//     .then(response => {console.log(response.data)})
//     .catch(error => console.error(error));
// }


// const checkApiGetUserWithArrayParams = async() => {
//   client.get('/user',  {
//     username: "A",
//     id: "1",
//     list: [0,1,2],
//     address: null,
//     phone: undefined,
//   }, {
//     queryConfig: {
//       arrayFormat: 'index',
//       skipNull : true,
//       sort: false
//     }
//   })
//     .then(response => {console.log(response.data)})
//     .catch(error => console.error(error));
// }
// checkApiGetUserWithArrayParamsBracket();

// //Test Merge Header
// newConfig.setHeader('Authorization', 'Bearer Token check')
// const client1 = createAPIClient(newConfig);
// const checkMergeHeader = async() => {
//   client1.get('/user',  {
//     username: "A",
//     id: "1",
//   },
//   {
//     headers: {
//       'User-Agent': 'Nghia check header'
//     }
//   }
// )
//     .then(response => {console.log(response.data)})
//     .catch(error => console.error(error));
// }
// checkMergeHeader();

// // Test api Retry
// const retryApi = async() => {
//   await client.get('/retry',  {
//     username: "A",
//     id: "1",
//     list: [0,1,2]
//   },
//   {
//     isRetry: true,
//     retries: 3,
//   }
//   )
//     .then(response => {console.log(response)})
//     .catch(error => console.error(error));
// }
// retryApi()

// //Test formData
// const formBasic = new FormData();
// formBasic.append('userName', 'FORM');
// client.post('/upload', formBasic)
// .then(response => {console.log('upload form:', response.data)})
// .catch(error => console.error(error));

// //Test formData include File
// const fileData = new Blob(["text"], { type: "application/octet-stream" });;
// const bodyFormData = new FormData();
// bodyFormData.append('userName', 'FILE');
// bodyFormData.append('file', fileData)
// client.post('/send', bodyFormData, {
//   headers: {
//     "Content-Type": "multipart/form-data"
//   }
// })
// .then(response => {console.log('upload file:', response.data)})
// .catch(error => console.error(error));

// const newConfig2 = new APIConfig({
//   baseURL: 'https://jsonplaceholder.typicode.com/',
// })
// const client2 = createAPIClient(newConfig2)
// const testHandleRequestSuccess = async () => {
//   await client2.post("/posts", { title: "foo", body: "bar", userId: 1 },{
//     headers: {
//       'Content-Type': 'application/json',
//     },

//   } ).then(response => {console.log(response?.data)}).catch(error => {console.error(error)});
// }

// testHandleRequestSuccess();
import { AxiosError, AxiosResponse } from 'axios';
import { createAPIClient, APIConfig } from '../src/index';
import { CacheProvider, RefreshTokenConfig } from '../src/types';

// Simulated token storage (in a real app, this might be in localStorage or a secure storage)
let accessToken: string | null = null;
let refreshToken: string | null = null;
class InMemoryCache implements CacheProvider {
  private cache: Map<string, { value: any; expiry: number }> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const cachedItem = this.cache.get(key);

    if (!cachedItem) return null;

    // Check if the cache has expired
    if (Date.now() > cachedItem.expiry) {
      this.cache.delete(key);

      return null;
    }

    return cachedItem.value;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const expiry = ttl ? Date.now() + ttl * 1000 : Number.POSITIVE_INFINITY; // Convert ttl to milliseconds
    this.cache.set(key, { value, expiry });
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}
const apiConfig = new APIConfig({
  baseURL: 'http://localhost:4000',
  cache: {
    provider: new InMemoryCache(),
    ttl: 3,
  },
  retry: {
    attempts: 3,
    delay: 7000,
    httpMethods: ['GET'],
    statusCodes: [500, 504]
  }
});

const refreshTokenConfig: RefreshTokenConfig = {
  refreshTokenUrl: '/refresh',
  getRefreshToken: async () => refreshToken,
  getAccessToken: async () => accessToken,
  extractAccessToken: (response) => response.accessToken,
  onRefreshSuccess: async (newToken, response) => {
    console.log(151, response)
    accessToken = newToken;
    console.log('Access token refreshed');

  },
  onRefreshFailure: async (error) => {
    console.error('Failed to refresh token:', error);
    accessToken = null;
    refreshToken = null;
  },
};


const client = createAPIClient(apiConfig.getConfig(), 'axios', refreshTokenConfig);
// client.addHook('beforeRequest', (config) => {
//   config.retry = {
//     attempts: 3,
//     delay: 1000,
//     httpMethods: ['GET'],
//     statusCodes: [500, 504]
//   }
//   // Modify config before request
//   return config;
// });


// client.addHook('afterResponse', (response) => {
//   // Process response data
//   response.data = 'change data from api before response';
//   return response;
// });

// client.addHook('beforeError', (error) => {
//   // Handle or transform error
//   return error;
// });
async function login() {
  try {
    const response: any = await client.post('/login');
    console.log(168, response)
    accessToken = response.accessToken;
    refreshToken = response.refreshToken;
    console.log('Logged in successfully');
  } catch (error) {
    console.error('Login failed:', error);
  }
}

async function accessProtectedResource() {
  try {
    const response: any = await client.get('/protected');
    console.log('Protected data:', response);
  } catch (error) {
    console.error('Failed to access protected resource:', error);
  }
}

async function runTest() {
  await login();

  // First request should succeed
  await accessProtectedResource();

  // Simulate token expiration
  accessToken = 'expired_token';

  // This request should trigger a token refresh and then succeed
  await accessProtectedResource();

  // This request should use the new token and succeed
  await accessProtectedResource();
}

// eslint-disable-next-line unicorn/prefer-top-level-await
runTest().catch(console.error);

async function testRetry() {

  try {
    console.log('Starting retry test...');
    const response = await client.get('/retry-test');
    console.log('Response:', response);
  } catch (error: any) {
    console.error('Final error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}
// eslint-disable-next-line unicorn/prefer-top-level-await
testRetry();



const hookConfig = new APIConfig({
  baseURL: 'https://jsonplaceholder.typicode.com',
  retry: {
    attempts: 5,
    delay: 1000,
  },
  hooks: {
    beforeRequest: [
      async (config) => {
        console.log('Before request:', config.url);
        return config;
      }
    ],
    afterResponse: [
      async (response) => {
        /* With FETCH adapter
          console.log('After response:', response);
        */
        console.log('After response:', response.data);
        return response;
      }
    ],
    beforeError: [
      async (error) => {
        console.log('Before error:', error.message);
        return error;
      }
    ],
    beforeRetry: [
      async (attempt, error) => {
        console.log(`Retrying ${attempt}:`, error.message);
        return true;
      }
    ]
  }
});

const hookClient = createAPIClient(hookConfig.getConfig(), 'axios');
/* With FETCH adapter
  const client = createAPIClient(config.getConfig(), 'fetch');
*/
const testHookAxios = async () => {
  try {
    const res: AxiosResponse = await hookClient.get('/todos/1');
    console.log('Response:', res.data);
    /* With FETCH adapter
      console.log('Response:', res);
    */
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log('Error message:', error.message);
    }
  }
}

testHookAxios();
