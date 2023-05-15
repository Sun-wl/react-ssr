import proxy from 'express-http-proxy'

// dev 模式下，为 client bundle 设置代理，访问 client server
const setupWebpackProxy = (app) => {
  app.use(`/js/`, proxy(`localhost:${process.env.CLIENT_PORT || 7975}`))
}

export default setupWebpackProxy