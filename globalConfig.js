module.exports = {
    port: process.env.PORT || "5000",
    publicUrl: process.env.REACT_APP_SSP_MID_PUBLIC_URL || "",
    credKey: process.env.SSP_MID_ENV_CRED,
    // baseURI: process.env.SSP_API_URL|| "https://accept5-front.centralindia.cloudapp.azure.com/restapi/api",
    // baseURI: process.env.SSP_API_URL|| "https://accept6-front.centralus.cloudapp.azure.com/restapi/api",
    baseURI: process.env.SSP_API_URL|| "https://accept5-front.centralindia.cloudapp.azure.com/restapi/api",

    databaseURI: process.env.SSP_DB_API_URL || "http://localhost:5001/api",
    logType: "file",
    recaptchaKey: process.env.SSP_MID_SECRET_RECAPTCHA_KEY || "6Lf-mcAiAAAAANnGge_hVFa5yLLoZFtsx3r-TvEC"
};