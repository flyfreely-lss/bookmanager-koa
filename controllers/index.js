


// 路由
app.use(router(_ => {
  _.get('/', (ctx, next) => {
    ctx.body = 'koa2'
  })
  _.get('/index', async(ctx, next) => {
    // ctx.body = await ctx.render('index')
    fetch('http://localhost:8080/index.php?r=book')
    .then(res => res.json())
    .then(json => console.log(json));
  })
}));