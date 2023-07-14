import { v4 } from 'uuid';

import { RedisService } from './redis.service';

describe('Redis 테스트. 실제 레디스를 갖다오므로 레디스 연결이 되어있지 않다면 실패합니다.', () => {
  let redisService: RedisService;
  const testKey = `test-key-${v4}`;

  beforeEach(() => {
    redisService = new RedisService();
  });

  afterEach(async () => {
    await redisService.setValue(testKey, '', 10);
  });

  it('set key & get value 테스트', async () => {
    const key = testKey;
    const value = 'testValue';

    // Set value in Redis
    await redisService.setValue(key, value, 10);

    // Get value from Redis
    const result = await redisService.getValue(key);

    expect(result).toBe(value);
  });

  it('존재하지 않는 키로 호출시 null', async () => {
    const key = `test-fail-key-${v4}`;

    // Get value from Redis
    const result = await redisService.getValue(key);

    expect(result).toBeNull();
  });
});
