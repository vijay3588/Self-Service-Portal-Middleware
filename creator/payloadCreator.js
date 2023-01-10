const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const { dataConfigHelper } = require("../utils/helpers/dataConfigHelper");
const { logger } = require("../logger/logger");

const createPayload = (inputObj, layoutName, reqUserInfo) => {
  try {
    //Create the rear data segment by assigning all the sub segments except front Data Map segment
    const createInitialPayload = (frontRearMap, layoutObj) => {
      let rearSegments = {};

      layoutObj &&
        Object.entries(layoutObj).map(([element, data]) => {
          if (
            data.name &&
            (data.dataType === constants.DATA_TYPE_OBJECT ||
              data.dataType === constants.DATA_TYPE_ARRAY)
          ) {
            if (data.reduxObject) {
              let objPath = data.reduxDataSegmentPath
                ? data.reduxDataSegmentPath + "." + data.name
                : data.name;
              reduxObj = jsonHelper.getObject(objPath, inputObj);
              rearSegments = { ...rearSegments, [element]: reduxObj };
            } else {
              if (
                jsonHelper.checkFrontRearMapForRearSegment(
                  frontRearMap,
                  data.name,
                  constants.OBJ_REAR_ELEMENT,
                  constants.OBJ_REAR_ELEMENT_CLASS
                )
              ) {
                rearSegments = { ...rearSegments, [element]: "" };
              } else {
                let subSegmentList = [
                  {
                    name: data.name,
                    element: element,
                    parentObj: "",
                    subObj: element,
                  },
                ];
                do {
                  let parentObj = subSegmentList[0].parentObj
                    ? subSegmentList[0].parentObj
                    : subSegmentList[0].name;
                  let currentObj = subSegmentList[0].subObj;
                  let objectType = subSegmentList[0].objectType;
                  let tempRearSegments = jsonHelper.getObject(
                    parentObj,
                    rearSegments
                  );
                  if (objectType === constants.DATA_TYPE_ARRAY) {
                    if (Array.isArray(tempRearSegments)) {
                      tempRearSegments[0][currentObj] = [
                        getSubSegments(subSegmentList, frontRearMap),
                      ];
                    } else {
                      tempRearSegments[currentObj] = [
                        getSubSegments(subSegmentList, frontRearMap),
                      ];
                    }
                  } else {
                    if (Array.isArray(tempRearSegments)) {
                      tempRearSegments[0][currentObj] = getSubSegments(
                        subSegmentList,
                        frontRearMap
                      );
                    } else {
                      tempRearSegments[currentObj] = getSubSegments(
                        subSegmentList,
                        frontRearMap
                      );
                    }
                  }
                } while (subSegmentList.length > 0);
              }
            }
          } else {
            rearSegments = { ...rearSegments, [element]: data.defaultValue };
          }
        });

      return rearSegments;
    };

    //create and return the sub segment
    const getSubSegments = (subSegmentList, frontRearMap) => {
      let rearSegment = {};
      if (subSegmentList && subSegmentList.length > 0) {
        let lookUpObj = subSegmentList[0].name;
        let lookUpElement = subSegmentList[0].element;
        let parentObj = subSegmentList[0].parentObj;
        let rearSubSegment = {};

        if (lookUpElement === "") {
          throw (
            "Configuration Error: The rear object '" +
            lookUpObj +
            "' element is empty"
          );
        }
        if (lookUpObj) {
          rearSubSegment = jsonHelper.getJSON(
            lookUpObj,
            constants.PATH_REAR_SEGMENTS
          );
        } else {
          throw (
            "Configuration Error: The rear object '" +
            lookUpElement +
            "' does not have the name property"
          );
        }

        subSegmentList.splice(0, 1);
        Object.entries(rearSubSegment).map(([element, data]) => {
          if (
            data.name &&
            (data.dataType === constants.DATA_TYPE_OBJECT ||
              data.dataType === constants.DATA_TYPE_ARRAY)
          ) {
            if (data.name) {
              if (
                jsonHelper.checkFrontRearMapForRearSegment(
                  frontRearMap,
                  data.name,
                  constants.OBJ_REAR_ELEMENT,
                  constants.OBJ_REAR_ELEMENT_CLASS
                )
              ) {
                rearSegment = { ...rearSegment, [element]: "" };
              } else {
                let tempName = "";
                if (parentObj) {
                  // if (parentObj.split(".").find(objName => objName == lookUpElement)){
                  //     throw "Configuration Error: Recursive rear object '" + lookUpElement + "' is configured" ;
                  // }
                  // else{
                  tempName = parentObj + "." + lookUpElement;
                  //}
                } else {
                  tempName = lookUpElement;
                }
                data.dataType === constants.DATA_TYPE_ARRAY
                  ? subSegmentList.push({
                      name: data.name,
                      element: element,
                      parentObj: tempName,
                      subObj: element,
                      objectType: constants.DATA_TYPE_ARRAY,
                    })
                  : subSegmentList.push({
                      name: data.name,
                      element: element,
                      parentObj: tempName,
                      subObj: element,
                    });
              }
            } else {
              throw (
                "Configuration Error: The rear object '" +
                lookUpObj +
                "' does not have the name property"
              );
            }
          } else {
            rearSegment = { ...rearSegment, [element]: data.defaultValue };
          }
        });
      }
      return rearSegment;
    };

    //Update the "Front Rear Mapping" config by providing the sector details of front and rear segment
    //Return back the Rear Data Segments which are going to map with front end data
    //Front and rear segment mapping details are in Elements json file
    const frontRearSectorAddition = (
      frontRearMapParsed,
      layoutName,
      userLayoutsFolder
    ) => {
      let rearDataSegments = {};

      frontRearMapParsed.forEach((mapData, index) => {
        if (mapData.frontDataSegment) {
          let rearSegment = {};
          if (mapData.reduxObject) {
            let objPath = mapData.reduxDataSegmentPath
              ? mapData.reduxDataSegmentPath + "." + mapData.rearDataSegment
              : mapData.rearDataSegment;
            rearSegment = jsonHelper.getObject(objPath, inputObj);
            if (Array.isArray(rearSegment)) {
              rearSegment = rearSegment[0];
            }
          } else {
            let dataSegment = mapData.rearDataSegmentClass
              ? mapData.rearDataSegmentClass
              : mapData.rearDataSegment;
            if (dataSegment) {
              rearSegment = jsonHelper.getJSON(
                dataSegment,
                constants.PATH_REAR_SEGMENTS
              );
            } else {
              rearSegment = jsonHelper.getJSON(
                constants.LAYOUT_REAR_OBJ_NAME,
                userLayoutsFolder,
                layoutName
              );
            }
          }
          let formElements = jsonHelper.getJSON(
            mapData.frontSegmentForm
              ? mapData.frontSegmentForm
              : mapData.frontDataSegment,
            constants.PATH_FORM_ELEMENT + reqUserInfo,
            layoutName
          );

          if (mapData.rearDataSegment) {
            rearDataSegments = {
              ...rearDataSegments,
              [mapData.rearDataSegment]: rearSegment,
            };
          } else {
            if (Object.keys(rearDataSegments).length === 0) {
              rearDataSegments = rearSegment;
            } else {
              Object.entries(rearSegment).map(([element, type]) => {
                if (
                  rearDataSegments[element] === undefined &&
                  mapData.mappingSectorOnly !== true
                ) {
                  rearDataSegments = { ...rearDataSegments, [element]: type };
                }
              });
            }
          }

          if (rearSegment) {
            let sectorMap = [];
            Object.entries(rearSegment).map(([element, type]) => {
              if (
                mapData.mappingSectorOnly === true &&
                type.name &&
                (type.dataType === constants.DATA_TYPE_OBJECT ||
                  type.dataType === constants.DATA_TYPE_ARRAY)
              ) {
                rearSegment[element] = "";
              } else {
                let isSubSegment =
                  type &&
                  type.name &&
                  (type.dataType === constants.DATA_TYPE_ARRAY ||
                    type.dataType === constants.DATA_TYPE_OBJECT)
                    ? true
                    : false;
                if (mapData.reduxObject) {
                  if (type && typeof type === constants.DATA_TYPE_OBJECT) {
                    isSubSegment = true;
                  } else {
                    isSubSegment = false;
                    type = { defaultValue: type };
                  }
                }
                if (isSubSegment) {
                  let subSectors = [
                    {
                      name: type.name ? type.name : element,
                      parentObj: element,
                      element: element,
                    },
                  ];
                  let lookupObj = null;
                  do {
                    let elementName = subSectors[0].element;
                    if (mapData.reduxObject) {
                      lookupObj = jsonHelper.getObject(
                        elementName,
                        lookupObj ? lookupObj : rearSegment
                      );
                    }
                    let rearDataSegment = subSectordAddition(
                      subSectors,
                      sectorMap,
                      formElements,
                      lookupObj,
                      mapData.defaultSectorMapping
                    );
                    rearDataSegments = {
                      ...rearDataSegments,
                      [elementName]: rearDataSegment,
                    };
                  } while (subSectors.length > 0);
                } else {
                  sectorMap.push(
                    createSectorMapConfig(
                      formElements,
                      element,
                      type,
                      mapData.rearDataSegment,
                      null,
                      mapData.defaultSectorMapping
                    )
                  );
                }
              }
            });
            frontRearMapParsed[index] = {
              ...frontRearMapParsed[index],
              sectorMapping: sectorMap,
            };
          }
        } else {
          if (mapData.reduxObject && mapData.rearSegmentData === undefined) {
            let objPath = mapData.reduxDataSegmentPath
              ? mapData.reduxDataSegmentPath + "." + mapData.rearDataSegment
              : mapData.rearDataSegment;
            let rearSegment = jsonHelper.getObject(objPath, inputObj);
            rearDataSegments = {
              ...rearDataSegments,
              [mapData.rearDataSegment]: rearSegment,
            };
          } else if (mapData.reduxObject) {
            rearDataSegments = {
              ...rearDataSegments,
              [mapData.rearDataSegment]: mapData.rearSegmentData,
            };
          }
        }
      });
      return rearDataSegments;
    };

    //Update the "Front Rear Mapping" config for Sub sector Addition
    const subSectordAddition = (
      subSectors,
      sectorMap,
      formElements,
      lookupObj,
      defaultSectorMap
    ) => {
      let lookUpObjName = subSectors[0].name;
      let parentObj = subSectors[0].parentObj;
      let rearSegmentName = subSectors[0].element;
      let rearSegment = lookupObj
        ? lookupObj
        : jsonHelper.getJSON(lookUpObjName, constants.PATH_REAR_SEGMENTS);
      subSectors.splice(0, 1);
      Object.entries(rearSegment).map(([element, type]) => {
        let isSubSegment =
          type &&
          type.name &&
          (type.dataType === constants.DATA_TYPE_ARRAY ||
            type.dataType === constants.DATA_TYPE_OBJECT)
            ? true
            : false;
        if (lookupObj) {
          if (type && typeof type === constants.DATA_TYPE_OBJECT) {
            isSubSegment = true;
          } else {
            isSubSegment = false;
            type = { defaultValue: type };
          }
        }
        if (isSubSegment) {
          let tempName = parentObj ? parentObj + "." + element : element;
          subSectors.push({
            name: type.name ? type.name : element,
            parentObj: tempName,
            element: element,
          });
        } else {
          sectorMap.push(
            createSectorMapConfig(
              formElements,
              element,
              type,
              rearSegmentName,
              parentObj,
              defaultSectorMap
            )
          );
        }
      });
      return rearSegment;
    };

    //Creating the configuration info for rear and front sector from the Form-Elements config
    const createSectorMapConfig = (
      formElements,
      element,
      elementData,
      rearSegmentName,
      parentObj,
      defaultSectorMap = null
    ) => {
      let findSectorObj = null;
      if (
        formElements &&
        formElements.elements &&
        Array.isArray(formElements.elements)
      ) {
        findSectorObj = getFormElements(formElements, element, rearSegmentName);
      }
      if (findSectorObj) {
        findSectorObj = {
          frontSector: findSectorObj.name,
          rearSector: findSectorObj.rearSector,
          frontDataSegmentPath: findSectorObj.frontDataSegmentPath
            ? findSectorObj.frontDataSegmentPath
            : "",
          defaultValue: findSectorObj.defaultValue
            ? findSectorObj.defaultValue
            : typeof elementData.defaultValue === "boolean" ||
              elementData.defaultValue
            ? elementData.defaultValue
            : "",
          dataConfig: findSectorObj.dataConfig
            ? findSectorObj.dataConfig
            : undefined,
        };
        if (parentObj) {
          findSectorObj = { ...findSectorObj, rearSubSector: parentObj };
        }
      } else {
        if (defaultSectorMap) {
          findSectorObj = defaultSectorMap.find((sector) => {
            if (
              (sector.rearSector === element && !sector.rearDataSegment) ||
              (sector.rearSector === element &&
                sector.rearDataSegment === rearSegmentName)
            ) {
              findSectorObj = sector;
              return true;
            }
          });
        }
        findSectorObj = findSectorObj
          ? findSectorObj
          : {
              frontSector: "",
              rearSector: element,
              defaultValue:
                //(typeof elementData.defaultValue === 'boolean' || elementData.defaultValue) ? elementData.defaultValue : ""
                elementData.defaultValue === "" ? "" : elementData.defaultValue,
            };
        findSectorObj = parentObj
          ? { ...findSectorObj, rearSubSector: parentObj }
          : findSectorObj;
      }
      //If there is no dataConfig in mapping file and will add dataConfig from rear obj(If rear obj has dataConfig)
      if (elementData.dataConfig && findSectorObj.dataConfig === undefined) {
        findSectorObj = {
          ...findSectorObj,
          dataConfig: elementData.dataConfig,
        };
      }
      return findSectorObj;
    };

    const getFormElements = (formElements, sectorElement, rearSegmentName) => {
      let findSectorObj = null;
      formElements.elements.find((element) => {
        return (
          Array.isArray(element) &&
          element.find((sector) => {
            if (
              (sector.rearSector === sectorElement &&
                !sector.rearDataSegment) ||
              (sector.rearSector === sectorElement &&
                sector.rearDataSegment === rearSegmentName)
            ) {
              findSectorObj = sector;
              return true;
            }
          })
        );
      });
      return findSectorObj;
    };

    //Map the front data to the rear data segments with help of configuration
    const mapDataOnRearSegments = (
      frontRearMap,
      inputObj,
      rearDataSegments,
      mapDataSegment
    ) => {
      // try {
      //Loop the "Data Mapping Configuration" object and assign front data to the corresponding rear object
      frontRearMap.forEach((config) => {
        if (config.frontDataSegment) {
          let dataSegmentPath =
            config.frontDataSegmentPath && config.reduxObject === undefined
              ? config.frontDataSegmentPath + "." + config.frontDataSegment
              : config.frontDataSegment;
          let dataObject = jsonHelper.getObject(dataSegmentPath, inputObj);
          let mappingSegment = jsonHelper.cloneObj(
            jsonHelper.getObject(config.rearDataSegment, rearDataSegments)
          );
          if (dataObject && mappingSegment) {
            //Check whether Object type is Array or not
            if (config.rearDataSegmentType === constants.DATA_TYPE_ARRAY) {
              mappingSegment = [mappingSegment];
              if (!Array.isArray(dataObject)) {
                dataObject = [dataObject];
              }
              //Loop the array of "front Data Object" and assign the array object value to rear object.
              dataObject.forEach((arrObj, index) => {
                if (mappingSegment.length < index + 1) {
                  let tempMapObject = jsonHelper.cloneObj(
                    jsonHelper.getObject(
                      config.rearDataSegment,
                      rearDataSegments
                    )
                  );
                  mappingSegment.push(jsonHelper.cloneObj(tempMapObject));
                }
                config.sectorMapping.forEach((element) => {
                  sectorMapping(
                    element,
                    mappingSegment[index],
                    arrObj,
                    rearDataSegments
                  );
                });
              });

              let rearObj = jsonHelper.getObject(
                config.rearDataSegmentPath,
                mapDataSegment
              );
              if (Array.isArray(rearObj)) {
                rearObj = rearObj[0];
              }
              rearObj[config.rearDataSegment] = mappingSegment;
            } else if (
              config.rearDataSegmentType === constants.DATA_TYPE_OBJECT
            ) {
              config.sectorMapping.forEach((element) => {
                sectorMapping(
                  element,
                  mappingSegment,
                  dataObject,
                  rearDataSegments
                );
              });
              if (config.rearDataSegment) {
                let rearObj = jsonHelper.getObject(
                  config.rearDataSegmentPath,
                  mapDataSegment
                );
                if (Array.isArray(rearObj)) {
                  rearObj = rearObj[0];
                }
                if (
                  rearObj[config.rearDataSegment] ||
                  rearObj[config.rearDataSegment] === ""
                ) {
                  rearObj[config.rearDataSegment] = mappingSegment;
                } else if (
                  config.rearDataSegmentPath &&
                  config.rearDataSegmentPath.split(".").length === 1
                ) {
                  mapDataSegment[config.rearDataSegmentPath.split(".")[0]] =
                    mappingSegment;
                }
              } else {
                Object.entries(mappingSegment).map(([element, type]) => {
                  if (typeof type !== constants.DATA_TYPE_OBJECT) {
                    mapDataSegment[element] = type;
                  }
                });
              }
            }
          }
        } else {
          let rearObj = jsonHelper.getObject(
            config.rearDataSegmentPath,
            mapDataSegment
          );
          rearObj[config.rearDataSegment] =
            rearDataSegments[config.rearDataSegment];
        }
      });

      // } catch (error) {
      //    console.error(error);
      // }

      return mapDataSegment;
    };

    //Mapping sector data from front to rear segment
    const sectorMapping = (
      element,
      mappingSegment,
      dataObject,
      rearSegments
    ) => {
      let dataObj = element.frontDataSegmentPath
        ? jsonHelper.getObject(element.frontDataSegmentPath, dataObject)
        : dataObject;
      if (Array.isArray(dataObj) && dataObj.length > 0) {
        dataObj = dataObj[0];
      }
      //To assign data for sub segment of rear object
      if (element.rearSubSector) {
        let subMapSegment = jsonHelper.getObject(
          element.rearSubSector,
          mappingSegment
        );
        //if condition to check & add sub segment on rear segment
        if (
          subMapSegment.dataType &&
          subMapSegment.name &&
          (subMapSegment.dataType === constants.DATA_TYPE_ARRAY ||
            subMapSegment.dataType === constants.DATA_TYPE_OBJECT)
        ) {
          let subObjName = element.rearSubSector.split(".");
          subObjName = subObjName[subObjName.length - 1];
          subMapSegment = jsonHelper.cloneObj(rearSegments[subObjName]);
          let tempMappingSegment = jsonHelper.getObject(
            element.rearSubSector.replace(subObjName, ""),
            mappingSegment
          );
          tempMappingSegment[subObjName] = subMapSegment;
        }
        subMapSegment[element.rearSector] = element.dataConfig
          ? dataConfigHelper.applyConfigOnData(
              element,
              element.dataConfig,
              mappingSegment,
              dataObject
            )
          : dataObj[element.frontSector] || element.defaultValue;
      } else {
        mappingSegment[element.rearSector] = element.dataConfig
          ? dataConfigHelper.applyConfigOnData(
              element,
              element.dataConfig,
              mappingSegment,
              dataObject
            )
          : dataObj[element.frontSector] || element.defaultValue;
      }
    };

    let userLayoutsFolder = reqUserInfo.split("/");
    if (userLayoutsFolder.length > 1) {
      userLayoutsFolder =
        constants.PATH_LAYOUTS_SEGMENTS + "/" + userLayoutsFolder[1];
    }

    let layoutObj = jsonHelper.getJSON(
      constants.LAYOUT_REAR_OBJ_NAME,
      userLayoutsFolder,
      layoutName
    );
    if (layoutObj === null) {
      userLayoutsFolder =
        constants.PATH_LAYOUTS_SEGMENTS + "/" + constants.PATH_OUTER_SEGMENTS;
      layoutObj = jsonHelper.getJSON(
        constants.LAYOUT_REAR_OBJ_NAME,
        userLayoutsFolder,
        layoutName
      );
    }

    let payload = {};
    if (layoutObj) {
      let frontRearMap = jsonHelper.getJSON(
        constants.LAYOUT_FRONT_REAR_MAP,
        userLayoutsFolder,
        layoutName
      );
      let initialPayload = createInitialPayload(frontRearMap, layoutObj);
      let frontRearMapParsed = jsonHelper.cloneObj(frontRearMap);
      if (
        Object.keys(frontRearMapParsed).length === 0 &&
        frontRearMapParsed.constructor === Object
      ) {
        payload = initialPayload;
      } else {
        let rearDataSegments = frontRearSectorAddition(
          frontRearMapParsed,
          layoutName,
          userLayoutsFolder
        );
        payload = mapDataOnRearSegments(
          frontRearMapParsed,
          inputObj,
          rearDataSegments,
          initialPayload
        );
      }
    }

  
    return payload;
  } catch (error) {
    if (error && error.type === "throw") {
      throw { type: "throw", file: error.file };
    }
    logger.logCreator().error(error);
    throw { type: "throw", file: "logCreator" };
  }
};

module.exports = { createPayload };
