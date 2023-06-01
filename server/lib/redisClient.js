// 如果是集群，将 Redis 更换为 { Cluster }
import Redis from 'ioredis'
import configs from '../config'

const createRedisClient = (config) => {
  const redisOptions = JSON.parse(JSON.stringify(config.options))
  const redis = new Redis(config.nodes[0].port, config.nodes[0].host, redisOptions)
  redis
    .on('connect', () => {
      console.log('===========Redis is connected.============')
    })
    .on('ready', () => {
      console.log('===========Redis is ready.============')
    })
    .on('error', (err) => {
      console.log('===========Redis is error.============')
    })
    .on('close', () => {
      console.log('===========Redis is disconnected.============')
    })
    .on('reconnecting', () => {
      console.log('===========Redis is reconnecting.============')
    })
    .on('end', () => {
      console.log('===========Redis is end.============')
    })
    .on('wait', () => {
      console.log('===========Redis is wait.============')
    })
  return redis
}

const redisClient = createRedisClient(configs.redis)
export default redisClient