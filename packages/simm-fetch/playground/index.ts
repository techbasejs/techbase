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
import { createAPIClient, APIConfig } from '../src/index';
import { RefreshTokenConfig } from '../src/types';

// Simulated token storage (in a real app, this might be in localStorage or a secure storage)
let accessToken: string | null = null;
let refreshToken: string | null = null;

const apiConfig = new APIConfig({
  baseURL: 'http://localhost:4000',
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
