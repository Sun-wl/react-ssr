import superagent from "superagent";
import superagentUse from 'superagent-use';
import superagentProxy from 'superagent-proxy'
import { PROXY } from "../utils/constants";
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
        console.log('Http API call request')
        console.log('url', req.url)
        console.log('method', req.method)
        console.log('payload', maskSensitiveDataLog(req._data, maskedDataKey))
      })
      .on('response', res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('Http API call success')
          console.log('url', req.url)
          console.log('method', req.method)
          console.log('statusCode', res.statusCode)
        } else {
          console.log('Http API call failed')
          console.log('url', req.url)
          console.log('method', req.method)
          console.log('statusCode', res.statusCode)
          console.log('body', res.body)
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