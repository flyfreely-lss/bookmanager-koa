const Koa = require('koa');
const router = require('koa-simple-router');
const serve = require('koa-static');
const path = require('path');
const render = require('koa-swig');
const co = require('co');

const app = new Koa();

// 静态文件
app.use(serve(path.join(__dirname + '/public')));

// 模板引擎
app.context.render = co.wrap(render({
  root: path.join(__dirname, './views'),
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  // locals: locals,
  // filters: filters,
  // tags: tags,
  // extensions: extensions,
  writeBody: false
}));

// 路由
app.use(router(_ => {
  _.get('/', (ctx, next) => {
    ctx.body = 'koa2'
  })
  _.get('/index', async(ctx, next) => {
    ctx.body = await ctx.render('index')
  })
}));

// 监听端口
app.listen(8888, () => {
  console.log('Server is running...');
});