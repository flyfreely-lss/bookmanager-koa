const fetch = require('node-fetch');
const Index = require('../models/Index');
const { URLSearchParams } = require('url');

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
      ctx.body = await ctx.render('create', {
        title: '创建图书'
      });
    }
  }

  /**
   * 保存图书
   */
  actionSaveData() {
    return async (ctx, next) => {
      const indexModel = new Index();
      const params = new URLSearchParams();
      //取到前端发来的数据
      const book = ctx.request.body;
      params.append("Book[name]", book.bookName);
      params.append("Book[author]", book.bookAuthor);
      //调用model保存
      const result = await indexModel.saveBook({ params });
      //返回结果
      ctx.body = result;
    }
  }

  /**
   * 删除图书
   */
  actionDelete() {
    return async (ctx, next) => {
      const indexModel = new Index();
      // 取到前端发来的数据
      const bookId = ctx.params['id'];
      console.log(bookId);
      // 调用model删除
      const result = await indexModel.deleteBook(bookId)
      // 返回结果
      ctx.body = result;
    }
  }

}

module.exports = IndexController;