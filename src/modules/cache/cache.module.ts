import { Module } from '@nestjs/common';

import { CacheService } from './infra/cache.service';
import { RedisService } from './infra/redis.service';

@Module({
  providers: [{ provide: CacheService, useClass: RedisService }],
  exports: [{ provide: CacheService, useClass: RedisService }],
})
export class CacheModule {}
