const constants = require("../constants/segmentConstants");
const { logger } = require("../../logger/logger");
const fs = require("fs");
class jsonHelper {
  //Get the specified object(nested object name given as dot separated value)
  //from the object collection

  static arrayValFinder = (token, val) => {
    var splitName = token.split("[");
    var arrName = splitName[0];
    splitName = splitName[1].split("]");
    var arrIndex = splitName[0];
    val = val[arrName];

    val = val[arrIndex];
    return val;
  };
  static isArrayInArray = (arr, item) => {
    var item_as_string = JSON.stringify(item);

    var contains = arr.some(function (ele) {
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  };
  static keyObtainer = (path, inputData) => {
    var tokens = path.split(".");
    var val = inputData[tokens[0]];

    if (tokens.length < 2) {
      if (tokens[0].indexOf("[") != -1) {
        val = arrayValFinder(tokens[0], inputData);
      }

      return val;
    }
    if (tokens.length >= 2) {
      if (tokens[0].indexOf("[") != -1) {
        val =
          inputData[tokens[0].split("[")[0]][
            tokens[0].split("[")[1].split("]")[0]
          ];
      }
    }

    for (var i = 1; i < tokens.length; i++) {
      if (tokens[i].indexOf("[") != -1) {
        val = arrayValFinder(tokens[i], val);
      } else {
        val = val[tokens[i]];
      }
    }
    return val;
  };

  static getObject = (objName, dataObject) => {
    let subSegment = dataObject;
    try {
      objName &&
        objName.split(".").forEach((name) => {
          // if (name) {
          //   if (Array.isArray(subSegment)) {
          //     subSegment = subSegment.length > 0 ? subSegment[0] : subSegment;
          //   }
          //   if (subSegment[name]) {
          //     subSegment = subSegment[name];
          //   }
          // }

          if (name) {
            if (subSegment[name]) {
              subSegment = subSegment[name];
            } else if (name.indexOf("[") != -1) {
              if (
                subSegment[name.split("[")[0]][name.split("[")[1].split("]")[0]]
              )
                subSegment =
                  subSegment[name.split("[")[0]][
                    name.split("[")[1].split("]")[0]
                  ];
            }

            if (Array.isArray(subSegment)) {
              subSegment = subSegment.length > 0 ? subSegment[0] : subSegment;
            }
          }
        });
    } catch (error) {
      logger.logHelper().error(error);
      logger
        .logHelper()
        .trace(
          "\n Error at getObject function in jsonHelper file for object Name: " +
            objName +
            "\n Data Object: " +
            JSON.stringify(dataObject)
        );
    }
    return subSegment;
  };

  //Deep clone JSON object
  static cloneObj = (obj) => {
    try {
      return obj ? JSON.parse(JSON.stringify(obj)) : obj;
    } catch (error) {
      logger.logHelper().error(error);
      logger
        .logHelper()
        .trace(
          "Error at cloneObj function in jsonHelper file for object: " + obj
        );
      return obj;
    }
  };

  //Get JSON object from given path.
  static getJSON = (objName, path, subFolder = "", getInnerPath) => {
    let obj = null;
    try {
      path = path && path[path.length - 1] == "/" ? path : path + "/";
      if (getInnerPath) path = path + getInnerPath;
      if (subFolder) {
        path = path + subFolder + "/";
      }
      path +=
        objName && objName.includes(constants.EXT_JSON_FILE)
          ? objName
          : objName + constants.EXT_JSON_FILE;

      obj = require(`${path}`);
      //  obj = require(`../../forms//UserRegistration/en/AddUserRegistration/EmployeeValidation.json`);
    } catch (error) {
      return obj;
    }
    return jsonHelper.cloneObj(obj);
  };

  //if RearSegment name is in frontRearMap JSON, return true else false.
  static checkFrontRearMapForRearSegment = (
    frontRearMap,
    objName,
    element,
    elementName
  ) => {
    try {
      let findObject = frontRearMap
        ? frontRearMap.find((indUnit) => {
            //return (indUnit[element] === objName || indUnit[elementName] === objName);
            return (
              (indUnit[element] === objName ||
                indUnit[elementName] === objName) &&
              indUnit.mappingSectorOnly !== true
            );
          })
        : null;
      return findObject ? true : false;
    } catch (error) {
      logger.logHelper().error(error);
      logger
        .logHelper()
        .trace(
          "\n Error at checkFrontRearMapForRearSegment function in jsonHelper file for object name: " +
            objName +
            "\n  Element name: " +
            elementName +
            "\n Front Rear Mapping : " +
            JSON.stringify(frontRearMap)
        );
      return false;
    }
  };

  static dateDiff = (fromDate, ToDate) => {
    try {
      let date1 = new Date(fromDate);
      let date2 = new Date(ToDate);
      let diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
      return diffDays;
    } catch (error) {
      logger.logHelper().error(error);
      logger
        .logHelper()
        .trace(
          "Error at dateDiff function in jsonHelper file. From date: " +
            fromDate +
            " and To date: " +
            ToDate
        );
      return 0;
    }
  };

  static reqUserInfo = (reqHeader) => {
    try {
      let strUserInfo = "";
      if (reqHeader && reqHeader.usertype)
        strUserInfo = strUserInfo + "/" + reqHeader.usertype + "/";
      //Added below line for User Registration
      else strUserInfo = strUserInfo + "/" + "UserRegistration" + "/";
      if (reqHeader && reqHeader.language)
        strUserInfo = strUserInfo + reqHeader.language + "/";

      return strUserInfo;
    } catch (error) {
      logger.logHelper().error(error);
      logger
        .logHelper()
        .trace(
          "Error at reqUserInfo function in jsonHelper file for reading Object: " +
            JSON.stringify(reqHeader)
        );
      return "";
    }
  };
}

module.exports = { jsonHelper };
