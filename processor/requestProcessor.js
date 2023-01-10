const payloadCreator = require("../creator/payloadCreator");
const requestCreator = require("../creator/requestCreator");
const serviceHelper = require("../utils/helpers/serviceHelper");
const responseProcessor = require("./responseProcessor");
const { generateMidToken } = require("../utils/helpers/generateMidToken");
const apiConstants = require("../utils/constants/apiConstants");
const { logger } = require("../logger/logger");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const constants = require("../utils/constants/segmentConstants");
//const fs = require("fs");

const request = async (
  reqObj,
  resObj,
  serviceRequest,
  header = "",
  reqUserInfo = "",
  isAuth = true,
  hasParams = false,
) => {
  try {
    //If case is used to construct response object from UI request.
    if (serviceRequest.SERVICE === "") {
      let reqObject = reqObj;
      if (serviceRequest.DATAOBJ) {
        reqObject = reqObject[serviceRequest.DATAOBJ];
      }
      responseProcessor.createResponse(
        resObj,
        reqObject,
        serviceRequest.LAYOUT,
        reqUserInfo,
        header
      );
    } else {
      let requestBody = null;
      let requestInfo = null;

      let queryStrMap = serviceRequest.RequestConfig
        ? serviceRequest.RequestConfig.queryStrMap
        : "";
      let queryStr = "";

      const trailingURLValue = serviceRequest && serviceRequest.RequestConfig && serviceRequest.RequestConfig.queryStrMap && serviceRequest.RequestConfig.queryStrMap.trailingURL
        ? serviceRequest.RequestConfig.queryStrMap.trailingURL
        : "";
      if (queryStrMap) {
        if (queryStrMap.queryStr && queryStrMap.sectors) {
          queryStrMap.queryStr.forEach((str, index) => {
            let queryStrValue = "";
            if (queryStrMap.sectors[index]) {
              queryStrValue = jsonHelper.getObject(
                queryStrMap.dataPath,
                reqObj
              );
              queryStrValue = queryStrValue
                ? queryStrValue[queryStrMap.sectors[index]]
                : "";
            }
            queryStr = queryStr === "" ? "" : queryStr + "&";

            queryStr = queryStr + str + queryStrValue + trailingURLValue;

            //  queryStr = queryStr == "" ? "?" : queryStr + "&";
            //  queryStr = queryStr + str + "=" + queryStrValue;
          });
        }
      }

      //This code below is added to get the call to WydeMercer server to get data from db.
      //Here passing one extra parameter reqObj to get get the theme selected send from UI
      requestInfo = requestCreator.createRequest(
        serviceRequest.SERVICE,
        header,
        isAuth,
        queryStr,
        reqObj
      );

      if (isAuth && serviceRequest.LAYOUT !== "") {
        requestBody = payloadCreator.createPayload(
          reqObj,
          serviceRequest.LAYOUT,
          reqUserInfo
        );
      } else {
        if (reqObj.body) {
          requestBody = reqObj.body;
        } else {
          requestBody = reqObj;
        }
      }

      if ( hasParams ) {
        requestInfo.hasParams = hasParams;
      }

      if (requestBody.error || requestInfo.error) {
        resObj.json(requestBody.error ? requestBody.error : requestInfo.error);
      } else {
        logger.logCreator().trace(JSON.stringify(requestBody));
        logger.logCreator().trace(JSON.stringify(requestInfo));
        let response = await serviceHelper.requestMaker(
          requestBody,
          requestInfo,
        );
        
        logger.logCreator().trace(JSON.stringify(response));
        if (response && response.error) {
          if (response?.error?.response?.status) {
            resObj.status(response.error.response.status).json(response.error);
          } else {
            resObj.status(400).json(response.error);
            //commented below line and added above line to handle when Wyde Mercer is not connected
            //  resObj.json(response.error);
          }
        } else {
          let regConfig = serviceRequest.ResposeConfig
            ? serviceRequest.ResposeConfig.regConfig
            : "";
          if (isAuth === false) {
            let midToken = generateMidToken.getMidToken(
              reqObj.body ? reqObj.body.login : ""
            );
            response = {
              ...response,
              ...{ mid_token: midToken, user_name: reqObj?.body?.login },
            };
          }
          //The below code is added to handle the new response structure due to env change which doest not have entry point "_Result"
          if (
            constants.SERVICE_REQUEST.BEARER_TOKEN.SERVICE == "bearerToken" &&
            constants.SERVICE_REQUEST.BEARER_TOKEN.LAYOUT == ""
          ) {
            let responseData = {};
            responseData["_Result"] = response;
            response = responseData;
            //  response =response
          }

          responseProcessor.createResponse(
            resObj,
            response,
            serviceRequest.LAYOUT,
            reqUserInfo,
            header,
            regConfig
          );
        }
      }
    }
  } catch (error) {
    let traceInfo = "User Token: ";
    traceInfo += header && header.midtoken ? header.midtoken : "";
    if (error && error.type === "throw") {
      if (error.file === "logCreator") {
        logger.logCreator().trace(traceInfo);
      }
    } else {
      logger.logCreator().error(error);
      logger.logCreator().trace(traceInfo);
    }
    resObj.json(null);
  }
};

module.exports = { request };
