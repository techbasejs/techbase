/* eslint-disable unicorn/no-null */
import { AxiosResponse } from 'axios';
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
  extractAccessToken: (response) => response.data.accessToken,
  onRefreshSuccess: async (newToken, response) => {
    accessToken = newToken;
  },
  onRefreshFailure: async () => {
    accessToken = null;
    refreshToken = null;
  },
};


const client = createAPIClient(apiConfig.getConfig(), 'axios', refreshTokenConfig);
async function login() {
  try {
    const response: any = await client.post('/login', {
      username: "thaohd",
      id: "1",
    });
    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
   console.log('Logged in successfully.....\n', { ACCESS_TOKEN: accessToken }, '\n', { REFRESH_TOKEN: refreshToken });
  } catch (error) {
    console.error('Login failed:', error);
  }
}

async function accessProtectedResource() {
  try {
    const response: AxiosResponse = await client.get('/protected');
    console.log('Data-CLIENT:', response.data.message);
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log( error.response.data.error + ' attempting to refresh...');
    }
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTest() {
  await login();
  await accessProtectedResource();
  console.log('\nWaiting for token to expire...');
  await delay(5000);
  await accessProtectedResource();
  console.log('\nWaiting for new access token:');
  await delay(1000);
  console.log({ ACCESS_TOKEN: accessToken });
  await accessProtectedResource();
  let counter = 0;
  const interval = setInterval(async () => {
    await accessProtectedResource();
    counter++;
    if (counter === 10) {
      clearInterval(interval);
    }
  }, 1000);
}


// eslint-disable-next-line unicorn/prefer-top-level-await
runTest().catch(console.error);
