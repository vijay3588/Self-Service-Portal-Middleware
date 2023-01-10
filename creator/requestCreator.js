const config = require("../appConfig/appConfig");
const constants = require("../utils/constants/apiConstants");
const { logger } = require("../logger/logger");
const { json } = require("express/lib/response");
const createRequest = (
  serviceName,
  header = "",
  isAuth,
  queryString = "",
  reqObj
) => {
  try {
    let requestInfo = { header: "", method: "", URL: "" };

    let authCode = "";
    if (config.auth && config.auth.authType === "basicAuth") {
      authCode = config.auth.prefixText || "";
      if (config.auth.key) {
        authCode += Buffer.from(config.auth.key).toString("base64");
      }
    }

    if (isAuth) {
      if (config.auth && config.auth.authType === "basicAuth") {
        authCode += (config.auth && config.auth.postText) || "";
      }
      authCode += (header && header.authorization) || "";
      requestInfo.header = {
        "Content-Type":
          (config.headers && config.headers["Content-Type"]) ||
          "application/json",
        Authorization: authCode,
      };
    } else {
      requestInfo.header = config.headers;
      requestInfo.header.Authorization = authCode;
    }

    let newBaseURI = config.baseURI;
    let newdataBaseURI = config.databaseURI;
    requestInfo.method = constants[serviceName].method;
    if (constants[serviceName].overrideBaseURI) {
      requestInfo.URL = constants[serviceName].URL + queryString;
    }
    //This code below is added to get the call to WydeMercer server to get data form db
    else if (constants[serviceName].databaseCall) {
      if (Object.keys(reqObj).length > 0) {
        let key = Object.keys(reqObj)[0];
        let callType = Object.keys(reqObj)[2];
        let callTypeObj = reqObj[callType];
        let reqObject = reqObj[key];
        let clientId = reqObject?.additonalInformation?.ClientId
        if (reqObject) {
          if (callTypeObj == "addTheme") {
            //Url to add theme
            //localhost: 5001/api/addTheme;
            requestInfo.URL = newdataBaseURI + constants[serviceName].URL;
          } else if (callTypeObj == "editTheme") {
            //url to edit theme
            //localhost:5001/api/editTheme/Theme Name
            requestInfo.URL =
              newdataBaseURI +
              constants[serviceName].URL +
              reqObject.Name.themeName;
          } else if (callTypeObj == "addClient") {
            //url to edit theme
            //localhost:5001/api/editTheme/Theme Name
            requestInfo.URL = newdataBaseURI + constants[serviceName].URL;
          }
          //Code to configure for first time
          // else if (callTypeObj == "configureTheme") {
          //http://localhost:5001/api/configureTheme
          //   //url to configure theme theme
          //   requestInfo.URL = newdataBaseURI + constants[serviceName].URL;
          // }
          else if (callTypeObj == "configureTheme") {
            //url to configure/update theme for a client
            //localhost:5001/api/configureUpdateTheme/0000000114
            requestInfo.URL =
              newdataBaseURI +
              constants[serviceName].URL +
              reqObject.Name.clientId;
          }

          else if (callTypeObj == "getAllClientData") {
            //url to configure/update theme for a client
            //localhost:5001/api/configureUpdateTheme/0000000114
            requestInfo.URL =
              newdataBaseURI +
              constants[serviceName].URL +
              reqObject.Name.clientId;
          } 
          
          
          else {
            //Url to get the theme data of the selected theme and get available themes base on clientId
            //localhost:5001/api/findTheme/Theme Name
           
            requestInfo.URL =
              newdataBaseURI + constants[serviceName].URL + queryString;

              // requestInfo.URL =
              // newdataBaseURI + constants[serviceName].URL + reqObject;
          }
        }
      } else {
        //url to get the theme names
        //localhost:5001/api/getAvailableThemeNames;
        requestInfo.URL = newdataBaseURI + constants[serviceName].URL;
      }
    } else {
      requestInfo.URL = newBaseURI + constants[serviceName].URL + queryString;
    }
    return requestInfo;
  } catch (error) {
    if (error && error.type === "throw") {
      throw { type: "throw", file: error.file };
    }
    logger.logCreator().error(error);
    throw { type: "throw", file: "logCreator" };
  }
};

module.exports = { createRequest };
