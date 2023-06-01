import CacheManager from "./cacheManager";
import redisClient from '../redisClient'

const genereteCacheKey = (req, key) => {
  const sessionId = req?.session?.id
  return `${sessionId}:${key}`
}

const redisStore = {
  get: async (req, key) => {
    if (!req.session) {
      throw new Error('no req.session')
    }
    const cacheKey = genereteCacheKey(req, key)
    const data = await redisClient.get(cacheKey)
    return JSON.parse(data)
  },

  // ttl 当前为秒数
  set: (req, key, data, ttl = 30 * 60) => {
    const cacheKey = genereteCacheKey(req, key)
    return redisClient.set(cacheKey, JSON.stringify(data), 'EX', ttl)
  }
}
const timelyCache = new CacheManager({
  store: redisStore
})
export default timelyCache