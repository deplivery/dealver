import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { InputError } from '@shared/error/input.error';
import { CacheService } from './cache.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService extends CacheService {
  private readonly client: Redis;

  constructor(private configService: ConfigService) {
    super();
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    });
  }

  async setValue(key: string, value: string, ttlSeconds: number): Promise<void> {
    if (ttlSeconds <= 0) {
      throw new InputError('유효하지 않은 ttl 설정');
    }
    const multi = this.client.multi();
    multi.set(key, value);
    multi.expire(key, ttlSeconds);
    await multi.exec();
  }

  async getValue(key: string): Promise<string | null> {
    return this.client.get(key);
  }
}
