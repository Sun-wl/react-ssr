import session from 'express-session'
// import { get } from 'lodash'
import connectRedis from 'connect-redis'
import { v1 } from 'uuid'
import redisClient from '../lib/redisClient'
import { isDev } from '../utils/common'
import configs from '../config'
const RedisStore = connectRedis(session)


/**
 * settings:
 * name: 用于设置存储在客户端的会话 ID 的 Cookie 的名称
 * resave: 强制将会话保存回会话存储，即使会话没有被修改。默认为 true。在大多数情况下，应将其设置为 false，以避免不必要的保存操作。
 * saveUninitialized: 强制将未初始化的会话保存到存储中。默认为 true。建议将其设置为 false，以避免在会话未修改时创建不必要的会话。
 * rolling: 每次响应时重置会话的 maxAge 值，以避免会话过期。默认为 false。
 * secret: 用于对会话数据进行加密的密钥。它可以是一个字符串或一个数组，用于提供多个密钥以增加安全性。
 * store: 指定会话存储的实例。您可以使用内存存储、数据库存储或第三方存储模块。
 * cookie:
 * cookie.secure: 指定是否仅通过 HTTPS 发送 Cookie。
 * cookie.httpOnly: 指定是否将 Cookie 标记为 HTTP Only，防止客户端脚本访问 Cookie。
 * cookie.path: 指定 Cookie 的路径。
 * cookie.domain: 指定 Cookie 的域名
 * cookie.maxAge: 设置 Cookie 的过期时间（以毫秒为单位）。
 */
export default (optionSettings) => {
  // const secret = get(redisClient, 'options.redisOptions.password', '')
  return (req, res, next) => {
    const settings = {
      name: 'connect.sid',
      resave: false,
      saveUninitialized: true,
      rolling: true,
      secret: 'iuangsleiahalwekfa',
      ...optionSettings,
    }
    settings.cookie = {
      secure: true,
      httpOnly: true,
      path: '/',
      domain: 'localhost',
      maxAge: (settings?.expiryMinute || 30) * 60 * 1000,
    }
    if (isDev()) {
      settings.cookie.secure = false
    }
    // 将数据存储到 redis
    settings.store = new RedisStore({ client: redisClient })
    settings.genid = () => {
      return `${configs.serviceName}:${req.headers.host}:${v1()}`
    }

    const redisSession = session(settings)
    return redisSession(req, res, next)
  }
}
