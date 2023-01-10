const globalConfig = require("../../globalConfig");

module.exports = {
  app: {
    port: globalConfig.port,
    publicUrl: globalConfig.publicUrl,
  },
  auth: {
    authType: "basicAuth",
    key: globalConfig.credKey,
    prefixText: "Basic ",
    postText: ",bearer ",
  },
  headers: {
    "Content-Type": "application/json",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  },
  baseURI: globalConfig.baseURI,
  databaseURI: globalConfig.databaseURI,
  logType: globalConfig.logType,
  recaptchaKey: globalConfig.recaptchaKey,
};
