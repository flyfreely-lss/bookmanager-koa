const fetch = require('node-fetch');
const Index = require('../models/Index');

class IndexController {
  constructor() {

  }

  /**
   * 图书列表页
   */
  actionIndex() {
    return async (ctx, next) => {
      const indexModel = new Index();
      let result = await indexModel.getBooks();

      ctx.body = await ctx.render('index', {
        title: '首页',
        books: result.data
      });
    }
  }

  /**
   * 新建图书页
   */
  actionCreate() {
    return async (ctx, next) => {

    }
  }


  /**
   * 删除图书
   */
  actionDelete() {
    return async (ctx, next) => {
      const bookId = ctx.params['id'];
      console.log(bookId);
      // http://localhost:8080/index.php?r=book/delete&id=11
      let result = await fetch('')
        .then(res => json())
        .then(data => {
          console.log(data);
        });
    }
  }

}

module.exports = IndexController;