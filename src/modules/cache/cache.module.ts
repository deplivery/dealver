import { Module } from '@nestjs/common';
import { RedisService } from './infra/redis.service';
import { CacheService } from './infra/cache.service';

@Module({
  providers: [{ provide: CacheService, useClass: RedisService }],
  exports: [{ provide: CacheService, useClass: RedisService }],
})
export class CacheModule {}
