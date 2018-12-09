const router = require('koa-simple-router');
const IndexController = require('./IndexController');
const indexController = new IndexController();

module.exports = (app) => {
  app.use(router(_ => {
    _.get('/', (ctx, next) => {
      ctx.body = 'koa2'
    })
    _.get('/index', indexController.actionIndex())
    _.get('/create', indexController.actionCreate())
    _.get('/saveData', indexController.actionSaveData())
    _.post('/delete/:id', indexController.actionDelete())
    // _.post('/create', indexController.actionCreate())
  }));
}