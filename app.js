const Koa = require('koa');
const router = require('koa-simple-router');
const serve = require('koa-static');
const path = require('path');
const render = require('koa-swig');
const co = require('co');
const fetch = require('node-fetch');

const app = new Koa();

// 静态文件
app.use(serve(path.join(__dirname + '/public')));

// 模板引擎
app.context.render = co.wrap(render({
  root: path.join(__dirname, './views'),
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody: false
}));

// 路由
app.use(router(_ => {
  _.get('/', (ctx, next) => {
    ctx.body = 'koa2'
  })
  _.get('/index', list)
  _.post('/delete/:id', remove)
  _.post('/create', create)
}));

/**
 * 新建图书
 * @param {*} ctx 
 * @param {*} next 
 */
async function create(ctx, next) {
  
}

/**
 * 删除图书
 * @param {*} ctx 
 * @param {*} next 
 */
async function remove(ctx, next) {
  const bookId = ctx.params['id'];
  console.log(bookId);
  // http://localhost:8080/index.php?r=book/delete&id=11
  let result = await fetch('')
    .then(res => json())
    .then(data => {
      console.log(data);
    });
}

/**
 * 图书列表
 * @param {*} ctx 
 * @param {*} next 
 */
async function list(ctx, next) {
    let result = await fetch('http://localhost:8081/index.php?r=book')
    .then(res => res.json())
    .then(data => data);

    ctx.body = await ctx.render('index', {
      title: '首页',
      books: result.dataProvider
    });
}

// 监听端口
app.listen(8888, () => {
  console.log('Server is running...');
});