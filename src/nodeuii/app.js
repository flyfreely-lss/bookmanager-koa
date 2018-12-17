import Koa from 'koa';
import serve from 'koa-static';
import render from 'koa-swig';
import co from 'co';
import config from './config';
import log4js from 'log4js';
import errorHandler from './middlewares/errorHandler';
import bodyParser from 'koa-bodyparser'; //获取post请求参数

const app = new Koa();
// 解析post请求数据，需放在路由前
app.use(bodyParser());

// 配置静态资源文件
app.use(serve(config.staticDir));

// 配置模板引擎
app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody: false
}));

// 记录日志 必须放在路由前面
log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/book-manager.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');
errorHandler.error(app, logger);

//路由
require('./controllers')(app);

// 监听端口
app.listen(config.port, () => {
  console.log('Server is running...');
});