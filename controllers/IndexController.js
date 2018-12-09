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
      //TODO 取到前端发来的数据
      const params = new URLSearchParams();
      params.append("Book[name]", "测试数据");
      params.append("Book[author]", "测试作者");
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