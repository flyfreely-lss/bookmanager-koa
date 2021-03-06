import path from 'path';
import _ from 'lodash';

let config = {
  "viewDir": path.join(__dirname, "..", "views"),
  "staticDir": path.join(__dirname, "..", "assets")
}

if (process.env.NODE_ENV === "development") {
  const localConfig = {
    baseUrl: "http://localhost:8081/index.php?r=",
    port: 8888
  }
  config = _.extend(config, localConfig);
}
if (process.env.NODE_ENV === "production") {
  const proConfig = {
    port: 9999
  }
  config = _.extend(config, proConfig);
}

module.exports = config;