import path from 'path'
import express from 'express'
import es6Renderer from 'express-es6-template-engine'
import setupWebpackProxy from './utils/setupWebpackProxy'
import indexRouter from './routes/index'

const app = express()

setupWebpackProxy(app)

app.use('/', indexRouter)

// 静态资源
app.use(express.static('public'))

// 模版引擎
app.engine('html', es6Renderer)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, '/views'))

const port = process.env.PORT || 80
app.listen(port, () => {
  const address = `http://localhost:${port}`
  // eslint-disable-next-line no-console
  console.log(
    `[${new Date()}] [${
      process.env.NODE_ENV || 'DEVELOPMENT'
    }] app is listening on: ${address}`,
  )
})

export default app
