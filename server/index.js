import express from 'express';
import es6Renderer from 'express-es6-template-engine';
import path from 'path'
import setupWebpackProxy from './utils/setupWebpackProxy';
import indexRouter from './routes/index'

const app = express();


setupWebpackProxy(app)

app.use('/', indexRouter)

// 静态资源
app.use(express.static('public'));

// 模版引擎
app.engine('html', es6Renderer);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'))


const port = process.env.PORT || 9999
app.listen(port, () => console.log(`app is running on: http://localhost:${port}`));

export default app;