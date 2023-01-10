const globalConfig = require("../../globalConfig");

module.exports = {
  app: {
    port: process.env.SSP_MID_PORT || "5000",
    publicUrl: process.env.REACT_APP_SSP_MID_PUBLIC_URL || "",
  },
  auth: {
    authType: "basicAuth",
    key: process.env.SSP_MID_ENV_CRED,
    prefixText: "Basic ",
    postText: ",bearer ",
  },
  headers: {
    "Content-Type": "application/json",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  },
  baseURI: process.env.SSP_API_URL,
  databaseURI: process.env.SSP_DB_API_URL,
  logType: "file",
  recaptchaKey: globalConfig.recaptchaKey,
};
