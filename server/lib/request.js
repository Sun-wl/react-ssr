import superagent from "superagent";
import superagentUse from 'superagent-use';
import superagentProxy from 'superagent-proxy'
import { PROXY } from "../utils/constants";
import logger from "./logger";
superagentProxy(superagent)

const maskSensitiveDataLog = (data = {}, sensitiveDataKey = []) => {
  const logData = { ...data }
  for (let key of sensitiveDataKey) {
    if (Object.keys(data).includes(key)) {
      logData[key] = '*masked*'
    }
  }
  return logData
}

const requestMiddlewire = (ctx, options) => {
  return (req) => {
    req
      .on('request', () => {
        const maskedDataKey = options?.maskedDataKey
        logger.info(ctx, 'Http API call request', {
          url: req.url,
          method: req.method,
          payload: maskSensitiveDataLog(req._data, maskedDataKey)
        })
      })
      .on('response', res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          logger.info(ctx, 'Http API call success', {
            url: req.url,
            method: req.method,
            status_code: res.statusCode
          })
        } else {
          logger.error(ctx, 'Http API call failed',{
            url: req.url,
            method: req.method,
            status_code:res.statusCode,
            body: res.body
          })
        }
      })
  }
}

const createClient = (ctx, options) => {
  const Request = superagentUse(superagent)
  Request.use(requestMiddlewire(ctx, options))
  return Request
}

const request = (req, { method, url, maskedDataKey = [] }) => {
  const options = { maskedDataKey }
  const Request = createClient(req, options)[method](url)

  if (PROXY?.enableProxy) {
    const proxyUrl = PROXY?.proxyUrl
    const requestProxy = Request.proxy(proxyUrl)
    return requestProxy
  }

  return Request
}

export {
  createClient,
  request,
}