const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const { dataConfigHelper } = require("../utils/helpers/dataConfigHelper");
const { logger } = require("../logger/logger");

const createResponse = (
  inputObj,
  layoutName,
  layoutObj,
  reqUserInfo,
  userLayoutsFolder
) => {
  try {

   
    //Update the "Rear Front Mapping" config by providing the sector details
    //Return back the Front Data Segments which are going to map with rear response
    //Front and rear segment mapping details are in Form's Elements json file
    const frontRearSectorAddition = (
      frontRearMapParsed,
      layoutName,
      formElements,
      userLayoutsFolder
    ) => {
      let rearDataSegments = {};
      frontRearMapParsed.forEach((mapDataConfig, index) => {
        let frontSegment = jsonHelper.getJSON(
          mapDataConfig.frontSegment,
          userLayoutsFolder + "/" + layoutName,
          constants.PATH_FRONT_SEGMENTS
        );
        rearDataSegments = {
          ...rearDataSegments,
          [mapDataConfig.frontSegment]: frontSegment,
        };
        if (frontSegment) {
          let sectorMap = [];
          Object.entries(frontSegment).map(([element, type]) => {
            let findSectorObj = null;
            if (type.dataType == constants.DATA_TYPE_OBJECT) {
              findSectorObj = type;
            } else {
              if (formElements && mapDataConfig.cardElements) {
                findSectorObj = getFormCardElements(
                  formElements,
                  mapDataConfig,
                  element
                );
              }
              if (findSectorObj) {
                if (
                  (findSectorObj.preText || findSectorObj.postText) &&
                  type.dataConfig
                ) {
                  if (Array.isArray(type.dataConfig)) {
                    type.dataConfig.forEach((config) => {
                      if (
                        config.configType === "preText" &&
                        findSectorObj.preText
                      ) {
                        config.text = findSectorObj.preText;
                      }
                      if (
                        config.configType === "postText" &&
                        findSectorObj.postText
                      ) {
                        config.text = findSectorObj.postText;
                      }
                    });
                  } else {
                    if (
                      type.dataConfig.configType === "preText" &&
                      findSectorObj.preText
                    ) {
                      type.dataConfig.text = findSectorObj.preText;
                    }
                    if (
                      type.dataConfig.configType === "postText" &&
                      findSectorObj.postText
                    ) {
                      type.dataConfig.text = findSectorObj.postText;
                    }
                  }
                }

                findSectorObj = {
                  frontSector: element,
                  rearSector: findSectorObj.rearSector,
                  rearDataSegmentPath: findSectorObj.rearDataSegmentPath,
                  defaultValue: findSectorObj.defaultValue
                    ? findSectorObj.defaultValue
                    : type.defaultValue,
                };
              } else {
                if (mapDataConfig.defaultSectorMapping) {
                  findSectorObj = mapDataConfig.defaultSectorMapping.find(
                    (sector) => {
                      return sector.frontSector == element;
                    }
                  );
                }
                findSectorObj = findSectorObj
                  ? findSectorObj
                  : {
                      frontSector: element,
                      rearSector: "",
                      defaultValue: type.defaultValue,
                    };
              }
              if (type.dataConfig) {
                findSectorObj = {
                  ...findSectorObj,
                  dataConfig: type.dataConfig,
                };
              }
            }
            sectorMap.push(findSectorObj);
          });
          frontRearMapParsed[index] = {
            ...frontRearMapParsed[index],
            sectorMapping: sectorMap,
          };
        }
      });
      return rearDataSegments;
    };

    const getFormCardElements = (
      formElements,
      mapDataConfig,
      sectorElement
    ) => {
      let findSectorObj = null;
      let card = formElements.cards.find((card) => {
        return card.name === mapDataConfig.formName;
      });
      if (card) {
        let elementList = [];
        Array.isArray(card.cardMembers) &&
          card.cardMembers.forEach((cardMember) => {
            elementList = jsonHelper.getObject(
              mapDataConfig.cardElements,
              cardMember
            );
            if (elementList && Array.isArray(elementList)) {
              elementList.find((innerElement) => {
                let elementName = innerElement.name;
                if (
                  innerElement.value &&
                  innerElement.value.includes(sectorElement)
                ) {
                  elementName = innerElement.value.split(".");
                  elementName =
                    elementName.length > 0 ? elementName[1] : elementName[0];
                }
                if (elementName == sectorElement) {
                  findSectorObj = innerElement;
                  return true;
                }
              });
            }
          });
      }
      return findSectorObj;
    };

    //Map the rear response data to the front data segments with help of rearFrontMap configuration
    const mapDataOnFrontSegments = (rearFrontMap, inputObj, frontSegments) => {
      let mapDataSegment = {};
      // try {
      //Loop the "Data Mapping Configuration" object and assign UI data to the corresponding rear object
      rearFrontMap.forEach((config) => {
        if (!config.subSegment) {
          let mappingSegment = jsonHelper.getObject(
            config.frontSegment,
            frontSegments
          );
          let dataObject = jsonHelper.cloneObj(
            jsonHelper.getObject(config.dataParentSegment, inputObj)
          );
          if (dataObject && mappingSegment) {
            //Check whether Object type is Array or not
            if (
              config.dataSegmentType == constants.DATA_TYPE_ARRAY &&
              Array.isArray(dataObject)
            ) {
              if (dataObject.length == 0) {
                mapDataSegment[config.frontSegment] = [];
              } else {
                mappingSegment = [jsonHelper.cloneObj(mappingSegment)];
                //Loop the array of "Data Object" and assign the array object value to front object.
                dataObject.forEach((arrObj, index) => {
                  if (mappingSegment.length < index + 1) {
                    let tempMapObject = jsonHelper.cloneObj(
                      jsonHelper.getObject(config.frontSegment, frontSegments)
                    );
                    mappingSegment.push(jsonHelper.cloneObj(tempMapObject));
                  }
                  config.sectorMapping.forEach((element) => {
                    sectorMapping(
                      rearFrontMap,
                      element,
                      mappingSegment[index],
                      arrObj,
                      dataObject.length
                    );
                  });
                });
                if (mapDataSegment[config.frontSegment]) {
                  mapDataSegment[config.frontSegment].push(mappingSegment[0]);
                } else {
                  mapDataSegment[config.frontSegment] = mappingSegment;
                }
              }
            } else if (config.dataSegmentType == constants.DATA_TYPE_OBJECT) {
              config.sectorMapping.forEach((element) => {
                sectorMapping(
                  rearFrontMap,
                  element,
                  mappingSegment,
                  dataObject,
                  dataObject.length
                );
              });
              mapDataSegment[config.frontSegment] = mappingSegment;
            }
          }
        }
      });
      // } catch (error) {
      //    console.error(error);
      // }
      return mapDataSegment;
    };

    //Mapping sector data(Rear response data to front segment)
    const sectorMapping = (
      config,
      element,
      mappingSegment,
      dataObject,
      objLength
    ) => {
      //To assign data for sub segment
      let parsedData = null;
      let dataSegment =
        Array.isArray(dataObject) && dataObject.length > 0
          ? { ...dataObject[0] }
          : { ...dataObject };

      if (element.rearDataSegmentPath) {
        dataSegment = jsonHelper.getObject(
          element.rearDataSegmentPath,
          dataObject
        );
        if (Array.isArray(dataSegment)) {
          dataSegment = dataSegment.length > 0 ? dataSegment[0] : {};
        }
      }
      if (element.dataType == constants.DATA_TYPE_OBJECT) {
        let subConfig = config.find((segment) => {
          return segment.frontSegment === element.name;
        });

        if (subConfig) {
          let subDataSegment = jsonHelper.getObject(
            subConfig.dataParentSegment,
            dataObject
          );
          let tempMapObject = jsonHelper.cloneObj(
            jsonHelper.getObject(element.name, frontSegments)
          );
          if (Array.isArray(subDataSegment)) {
            if (subDataSegment.length === 0) {
              mappingSegment[element.name] = [];
            } else {
              mappingSegment[element.name] = [tempMapObject];
              subDataSegment.forEach((arrObj, index) => {
                if (mappingSegment[element.name].length < index + 1) {
                  tempMapObject = jsonHelper.cloneObj(
                    jsonHelper.getObject(element.name, frontSegments)
                  );
                  mappingSegment[element.name].push(
                    jsonHelper.cloneObj(tempMapObject)
                  );
                }
                subConfig.sectorMapping.forEach((subElement) => {
                  sectorMapping(
                    config,
                    subElement,
                    mappingSegment[element.name][index],
                    arrObj,
                    subDataSegment.length
                  );
                });
              });
            }
          } else {
            mappingSegment[element.name] = tempMapObject;
            subConfig.sectorMapping.forEach((subElement) => {
              sectorMapping(
                config,
                subElement,
                mappingSegment[element.name],
                subDataSegment,
                subDataSegment.length
              );
            });
          }
        } else {
          mappingSegment[element.name] = "";
        }
      } else {
        if (element.dataConfig) {
          if (Array.isArray(element.dataConfig)) {
            parsedData = "";
            element.dataConfig.forEach((config) => {
              parsedData = dataConfigHelper.applyConfigOnData(
                element,
                config,
                mappingSegment,
                config == "arrayAddition"
                  ? dataObject
                  : parsedData
                  ? { [element.rearSector]: parsedData }
                  : dataSegment,
                objLength
              );
            });
          } else {
            parsedData = dataConfigHelper.applyConfigOnData(
              element,
              element.dataConfig,
              mappingSegment,
              element.dataConfig.configType == "arrayAddition"
                ? dataObject
                : dataSegment,
              objLength
            );
          }
        }
        mappingSegment[element.frontSector] = parsedData
          ? parsedData
          : dataSegment[element.rearSector]
          ? dataSegment[element.rearSector]
          : element.defaultValue
          ? element.defaultValue
          : "";
      }
    };

    //Create the front data object with help of the layout Object and map rear response data
    const createFrontDataObj = (
      layoutObj,
      frontDataSegments,
      rearFrontMap,
      userLayoutsFolder
    ) => {
      let frontSegments = {};
      layoutObj &&
        Object.entries(layoutObj).map(([element, data]) => {
          if (data.dataType == constants.DATA_TYPE_OBJECT) {
            if (
              jsonHelper.checkFrontRearMapForRearSegment(
                rearFrontMap,
                data.name,
                constants.OBJ_FRONT_ELEMENT_NAME
              )
            ) {
              frontSegments = {
                ...frontSegments,
                [element]: frontDataSegments[data.name],
              };
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
                let tempRearSegments = jsonHelper.getObject(
                  parentObj,
                  frontSegments
                );
                tempRearSegments[currentObj] = getSubSegments(
                  subSegmentList,
                  frontDataSegments,
                  rearFrontMap,
                  userLayoutsFolder
                );
              } while (subSegmentList.length > 0);
            }
          } else {
            frontSegments = { ...frontSegments, [element]: data.defaultValue };
          }
        });

      return frontSegments;
    };

    //Create the sub segment for front data object and map rear response data
    const getSubSegments = (
      subSegmentList,
      frontDataSegments,
      rearFrontMap,
      userLayoutsFolder
    ) => {
      let frontSegment = {};
      if (subSegmentList && subSegmentList.length > 0) {
        let lookUpObj = subSegmentList[0].name;
        let lookUpElement = subSegmentList[0].element;
        let parentObj = subSegmentList[0].parentObj;
        let rearSubSegment = jsonHelper.getJSON(
          lookUpObj,
          userLayoutsFolder + "/" + layoutName,
          constants.PATH_FRONT_SEGMENTS
        );
        subSegmentList.splice(0, 1);
        Object.entries(rearSubSegment).map(([element, data]) => {
          if (data.dataType == constants.DATA_TYPE_OBJECT) {
            if (
              jsonHelper.checkFrontRearMapForRearSegment(
                rearFrontMap,
                data.name,
                constants.OBJ_FRONT_ELEMENT_NAME
              )
            ) {
              frontSegment = {
                ...frontSegment,
                [element]: frontDataSegments[data.name],
              };
            } else {
              let tempName = parentObj
                ? parentObj + "." + lookUpElement
                : lookUpElement;
              subSegmentList.push({
                name: data.name,
                element: element,
                parentObj: tempName,
                subObj: element,
              });
            }
          } else {
            frontSegment = { ...frontSegment, [element]: data.defaultValue };
          }
        });
      }
      return frontSegment;
    };

    let rearFrontMap = jsonHelper.getJSON(
      constants.LAYOUT_REAR_FRONT_MAP,
      userLayoutsFolder,
      layoutName
    );

    let rearFrontMapParsed = jsonHelper.cloneObj(rearFrontMap);

    let formElements = jsonHelper.getJSON(
      layoutName,
      constants.PATH_FORM_ELEMENT + reqUserInfo,
      layoutName
    );

    if (formElements === null) {
      let formName =
        rearFrontMap.length > 0 ? rearFrontMap[0].layoutName : null;

      if (formName) {
        formElements = jsonHelper.getJSON(
          formName,
          constants.PATH_FORM_ELEMENT + reqUserInfo,
          formName
        );
      }
    }

    let frontSegments = frontRearSectorAddition(
      rearFrontMapParsed,
      layoutName,
      formElements,
      userLayoutsFolder
    );
    let frontDataSegments = mapDataOnFrontSegments(
      rearFrontMapParsed,
      inputObj,
      frontSegments
    );
    let frontDataObj = createFrontDataObj(
      layoutObj,
      frontDataSegments,
      rearFrontMapParsed,
      userLayoutsFolder
    );
    return frontDataObj;
  } catch (error) {
    if (error && error.type === "throw") {
      throw { type: "throw", file: error.file };
    }
    logger.logCreator().error(error);
    throw { type: "throw", file: "logCreator" };
  }
};

module.exports = { createResponse };
