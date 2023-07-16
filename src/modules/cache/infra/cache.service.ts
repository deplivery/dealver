export abstract class CacheService {
  abstract setValue(key: string, value: string, ttlSeconds: number): Promise<void>;
  abstract getValue(key: string): Promise<string | null>;
}
