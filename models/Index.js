const SafeRequest = require('../utils/SafeRequest');

class Index {
  constructor() {

  }

  getBooks() {
    const safeRequest = new SafeRequest("book/index");
    return safeRequest.fetch();
  }

  saveBook(options) {
    const safeRequest = new SafeRequest("/book/create");
    return safeRequest.fetch({
      method: 'post',
      params: options.params
    })
  }

}

module.exports = Index;