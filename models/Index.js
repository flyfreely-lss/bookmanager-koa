const SafeRequest = require('../utils/SafeRequest');

class Index {
  constructor() {

  }

  getBooks() {
    const safeRequest = new SafeRequest("book/index");
    return safeRequest.fetch();
  }

}

module.exports = Index;