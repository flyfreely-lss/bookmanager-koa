const Koa = require('koa');
const serve = require('koa-static');
const render = require('koa-swig');
const co = require('co');
const config = require('./config');
const log4js = require('log4js');
const errorHandler = require('./middlewares/errorHandler');

const app = new Koa();

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