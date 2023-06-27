import { logger as _logger } from 'node-public-tools'

const logger = new Proxy(_logger, {
  get: (target, prop, receiver) => {
    if (prop === 'log') {
      return (levelOrInfoMsg, req, message, ...args) => {
        const requestMeta = {
          // trace_id: '',
          path: req.url || '',
          user: req?.session?.user,
          ua: req.get('user-agent') || '',
          ...args[0],
        }
        if (levelOrInfoMsg === 'error') {
          Object.assign(requestMeta, {
            stack: args[0]?.stack,
          })
        }
        if (['info', 'warn', 'error', 'verbose'].includes(levelOrInfoMsg)) {
          _logger.log.call(receiver, levelOrInfoMsg, message, requestMeta)
        } else {
          _logger.info.call(receiver, levelOrInfoMsg, message, requestMeta)
        }
      }
    }
    return Reflect.get(target, prop, receiver)
  }
})

export default logger