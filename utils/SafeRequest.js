const fetch = require('node-fetch');
const config = require('../config');

class SafeRequest {
  constructor(url) {
    this.url = url;
    this.baseUrl = config.baseUrl;
  }

  fetch(options = {}) {
    let result = {
      code: 200,
      message: "",
      data: []
    }

    return new Promise((resolve,reject) => {
      fetch(this.baseUrl + this.url)
        .then(res => res.json())
        .then(json => {
          result.data = json;
          resolve(result);
        })
        .catch((error) => {
          result.code = 1;
          result.message = "fetch请求失败,后端报警";
          reject(result);
        });
    })
  }
}

module.exports = SafeRequest;