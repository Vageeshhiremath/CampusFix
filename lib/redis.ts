import { createClient, RedisClientType } from 'redis';

const redisUrl = process.env.REDIS_URL as string;

// Explicitly type it as RedisClientType to fix the TS(7005) error
let redisClient: RedisClientType;

if (process.env.NODE_ENV === 'development') {
  let globalWithRedis = global as typeof globalThis & {
    _redisClient?: RedisClientType;
  };

  if (!globalWithRedis._redisClient) {
    globalWithRedis._redisClient = createClient({ 
      url: redisUrl,
      socket: { connectTimeout: 2000 } 
    });
    globalWithRedis._redisClient.connect().catch(console.error);
  }
  redisClient = globalWithRedis._redisClient;
} else {
  redisClient = createClient({ 
    url: redisUrl,
    socket: { connectTimeout: 2000 }
  });
  redisClient.connect().catch(console.error);
}

export default redisClient;