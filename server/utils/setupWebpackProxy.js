import proxy from 'express-http-proxy'

const setupWebpackProxy = (app) => {
  app.use(`/js/`, proxy(`localhost:${process.env.CLIENT_PORT || 7975}`))
}

export default setupWebpackProxy