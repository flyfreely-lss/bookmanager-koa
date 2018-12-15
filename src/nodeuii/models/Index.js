const SafeRequest = require('../utils/SafeRequest');

/**
 * 实现Book数据模型
 */
class Index {
  /**
   * 构造函数
   */
  constructor() {

  }

  /**
   * 获取后台全部图书数据
   * return new Promise
   */
  getBooks() {
    const safeRequest = new SafeRequest("book/index");
    return safeRequest.fetch();
  }

  /**
   * 保存图书
   * @param {Object} options 配置项
   * @example
   * return new Promise
   * saveBook({ params })
   */
  saveBook(options) {
    const safeRequest = new SafeRequest("book/create");
    return safeRequest.fetch({
      method: 'post',
      body: options.params
    });
  }

  /**
   * 删除图书
   * @param {*} bookId 
   */
  deleteBook(bookId) {
    const safeRequest = new SafeRequest("book/delete&id=" + bookId);
    return safeRequest.fetch({
      method: 'post'
    });
  }

}

module.exports = Index;