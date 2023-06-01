import sessionCache from "../lib/cacheManager/sessionCache"
import timelyCache from "../lib/cacheManager/timelyCache"
import { getStatus, getUserInfo } from "./user"


export const getCachedUserInfo = async (req) => {
  // req.session.user
  // return await sessionCache.get(req, 'user', getUserInfo)
  return await sessionCache.get(req, 'user', getUserInfo, { id: '123' })
}

export const getCachedStatus = async (req) => {
  return await timelyCache.get(
    req,
    'status',
    getStatus,
    { id: '123' }, // params
    { ttl: 10 * 60 }, // 10分钟过期
  )
}