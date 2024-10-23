import { CacheProvider, RequestOptions } from "../types";

class CacheManager {
  private cacheProvider: CacheProvider;
  private ttl?: number;

  constructor(cacheProvider: CacheProvider, ttl?: number) {
    this.cacheProvider = cacheProvider;
    this.ttl = ttl;
  }

  private generateCacheKey(options: RequestOptions): string {
    const { url, params } = options;
    const prefix = ""; // You can customize this if needed
    const queryString = params ? new URLSearchParams(params).toString() : "";
    return `${prefix}${url}${queryString ? `?${queryString}` : ""}`;
  }

  public async get<T>(options: RequestOptions): Promise<T | null> {
    const cacheKey = this.generateCacheKey(options);
    return await this.cacheProvider.get<T>(cacheKey);
  }

  public async set<T>(options: RequestOptions, response: T): Promise<void> {
    const cacheKey = this.generateCacheKey(options);
    await this.cacheProvider.set(cacheKey, response, this.ttl);
  }

  public clear(): void {
    this.cacheProvider.clear();
  }
}

export default CacheManager;
