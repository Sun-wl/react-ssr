import proxy from 'express-http-proxy'
import serveStatic from 'serve-static'
import { getClientBundlePath, ifProd } from './common'

// dev 模式下，为 client bundle 设置代理，访问 client server
const setupWebpackProxy = (app) => {
  if (ifProd()) {
    // prod 模式
    app.use(serveStatic('client/', { redirect: false, maxAge: 3600000 }))
  } else {
    // dev 模式
    app.use(
      `${getClientBundlePath()}/`,
      proxy(`localhost:${process.env.CLIENT_PORT || 7975}`),
    )
  }
}

export default setupWebpackProxy
