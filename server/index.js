import express from 'express';
import ejs from 'ejs'
import indexRouter from './routes/index'

const app = express();

app.use('/', indexRouter)

// 静态资源
app.use(express.static('public'));
app.use(express.static('.build/js'));

// 模版引擎
app.engine('.html', ejs.__express)
app.set('view engine', 'html');


const port = process.env.PORT || 5555
app.listen(port, () => console.log(`app is running on: http://localhost:${port}`));

export default app;