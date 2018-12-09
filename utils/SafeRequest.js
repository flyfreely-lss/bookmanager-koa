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

    return new Promise((resolve, reject) => {
      let tempFetch = fetch(this.baseUrl + this.url);
      if (options.params) {
        tempFetch = fetch(this.baseUrl + this.url, {
          method: options.method,
          body: options.params
        });
      }
      tempFetch
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