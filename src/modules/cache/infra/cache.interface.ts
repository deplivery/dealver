export interface CacheService {
  setValue(key: string, value: string, ttlSeconds: number): Promise<void>;
  getValue(key: string): Promise<string | null>;
}
