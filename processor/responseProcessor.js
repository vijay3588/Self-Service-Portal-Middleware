const responseCreator = require("../creator/responseCreator");
const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const { logger } = require("../logger/logger");
//const fs = require("fs");

const createResponse = async (
  resObj,
  response,
  layoutName,
  reqUserInfo,
  header,
  regConfig
) => {
  try {
    
    let responseParsed = null;

    if (regConfig) {
      if (response && typeof response === "string") {
        response = JSON.parse(response.replace(regConfig, ',"extension":'));
      }
    }

    if (
      response &&
      response[constants.RESPONSE_ENTRY_PATH] &&
      (!Array.isArray(response[constants.RESPONSE_ENTRY_PATH]) ||
        (Array.isArray(response[constants.RESPONSE_ENTRY_PATH]) &&
          response[constants.RESPONSE_ENTRY_PATH].length > 0))
    ) {
      let userLayoutsFolder = reqUserInfo.split("/");
      if (userLayoutsFolder.length > 1) {
        userLayoutsFolder =
          constants.PATH_LAYOUTS_SEGMENTS + "/" + userLayoutsFolder[1];
      }
      let layoutObj = jsonHelper.getJSON(
        constants.LAYOUT_FRONT_OBJ_NAME,
        userLayoutsFolder,
        layoutName
      );
     
      if (layoutObj === null) {
        userLayoutsFolder =
          constants.PATH_LAYOUTS_SEGMENTS + "/" + constants.PATH_OUTER_SEGMENTS;
        layoutObj = jsonHelper.getJSON(
          constants.LAYOUT_FRONT_OBJ_NAME,
          userLayoutsFolder,
          layoutName
        );
      }
      if (layoutObj) {
      
        responseParsed = responseCreator.createResponse(
          response[constants.RESPONSE_ENTRY_PATH],
          layoutName,
          layoutObj,
          reqUserInfo,
          userLayoutsFolder
        );
      }
    }
    // else{
    //   response= response;
    // }
    if (responseParsed === null) {
      responseParsed = response;
    }
    if (responseParsed.status) {
      resObj.status(responseParsed.status).json(responseParsed);
    } else {
      resObj.json(responseParsed);
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

module.exports = { createResponse };
