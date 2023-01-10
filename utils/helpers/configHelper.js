const { jsonHelper } = require("./jsonHelper");
const axios = require("axios");
const appConfig = require("../../appConfig/appConfig");

// getClientId Api call
const configApiResponse = async (clientId, formName) => {
  try {
    let url =
      formName === "DependentInformation"
        ? `/getclientDependent/${clientId}`
        : `/getClient/${clientId}`;

    const apiResponse = await axios.get(appConfig.databaseURI + url);

    const res = apiResponse.data;

    return res;
  } catch (err) {
    console.error(err);
  }
};

const checkConfigAndUpdateElements = async (
  element,
  config,
  updtingElementsModal
) => {
  try {
    if (config.requiredSection) {
      element["noGroupStart"] = 13;
    } else {
      element["noGroupStart"] = 11;
    }
    if (config.hideableEyeIcon) {
      delete element?.imageToggle;
    } else {
      element.imageToggle = "icon-eye.png";
    }
    //hideableField condtion
    if (config.hideableField) {
      element.hideElement = true;
    } else {
      delete element.hideElement;
    }
    //editableLabelField
    if (config.editableLabelField && config.editableLabelFieldValue) {
      element.label = config.editableLabelFieldValue;
      element.labelTitle = config.editableLabelFieldValue;
    }
    //optionsField condition
    if (config.optionsField) {
      let tempOptions = [];
      for (let optionItem in config.optionsField) {
        if (typeof config.optionsField[optionItem] !== "function") {
          if (!config.optionsField[optionItem].hideOption) {
            tempOptions.push({
              value: config.optionsField[optionItem].optionKey,
              text: config.optionsField[optionItem].optionValue,
            });
          }
        }
      }
      element.options = tempOptions;
    }
    //Non editable field  condition

    //required field condition
    if (updtingElementsModal) {
      if (config.requiredField) {
        if (element?.validations?.string?.validationRequiredOnTrue) {
          // element.validations.string.validationRequiredOnTrue = true;
        } else if (element?.validations?.string) {
          element["validations"]["string"]["validationRequiredOnTrue"] = {
            value: "addDependentValidations",
            message: ` Please enter your ${element.label} `,
          };
        }
      } else {
        delete element?.validations?.string?.validationRequiredOnTrue;
      }
    } else {
      if (config.requiredField) {
        if (element?.validations?.string?.validationRequiredOnTrue) {
          // element.validations.string.validationRequiredOnTrue = true;
        } else if (element?.validations?.string?.required) {
          // element.validations.string.required = `${element.label} is required`;
        } else if (element?.validations?.string) {
          element.validations.string.required = `${element.label} is required`;
        }
      } else {
        delete element?.validations?.string?.validationRequiredOnTrue;
        delete element?.validations?.string?.required;
      }
    }
    if (config.nonEditableField) {
      element.edit = true;
      element.disabled = false;
    } else if (config.nonEditableField === false) {
      element.edit = false;
      delete element?.validations?.string?.required;
    }
    return element;
  } catch (err) {
    console.error(err);
  }
};

const getUpdatedElementsJsonasedOnConfig = async (
  rawdata,
  clientId,
  formName
) => {
  var response = await configApiResponse(clientId, formName);

  //api reponse itiration and get the object  key
  let configurationsList = response && response.data && response.data[0];
  let finalElementsJson = jsonHelper.cloneObj(rawdata);
  let updatingElements = jsonHelper.cloneObj(rawdata.elements);
  let configStraightList = {};
  for (let configCollection in configurationsList) {
    if (typeof configurationsList[configCollection] !== "function") {
      if (Array.isArray(configurationsList[configCollection])) {
        let configElementsList = configurationsList[configCollection][0];
        for (let configElement in configElementsList) {
          if (typeof configElementsList[configElement] !== "function") {
            // if(configElementsList[configElement]["hideableField"]){
            configStraightList[configElement] =
              configElementsList[configElement];

            // }
          }
        }
      }
    }
  }
  //hiding employemnt Section Json itiration
  const sectionPanel = jsonHelper.cloneObj(rawdata.sectionPanels);
  if (sectionPanel) {
    for (let rowIndex in sectionPanel) {
      if (typeof sectionPanel[rowIndex] !== "function") {
        if (Array.isArray(sectionPanel[rowIndex])) {
          let rowElements = sectionPanel[rowIndex];
          let colIndex = 2;
          if (typeof rowElements[colIndex] !== "function") {
            if (rowElements[colIndex]) {
              let entries = Object.entries(rowElements[colIndex]);
              let data = entries.map(([key, val] = entry) => {
                return key;
              });
              if (configStraightList[data[0]]) {
                sectionPanel[rowIndex][colIndex] =
                  await checkConfigAndUpdateElements(
                    jsonHelper.cloneObj(rowElements[colIndex]),
                    configStraightList[data[0]]
                  );
              }
            }
          }
        }
      }
    }
  }
  //Empolyement information JSON itiration
  if (updatingElements) {
    for (let rowIndex in updatingElements) {
      if (typeof updatingElements[rowIndex] !== "function") {
        if (Array.isArray(updatingElements[rowIndex])) {
          let rowElements = updatingElements[rowIndex];
          for (let colIndex in rowElements) {
            if (typeof rowElements[colIndex] !== "function") {
              if (rowElements[colIndex].name) {
                if (configStraightList[rowElements[colIndex].name]) {
                  updatingElements[rowIndex][colIndex] =
                    await checkConfigAndUpdateElements(
                      jsonHelper.cloneObj(rowElements[colIndex]),
                      configStraightList[rowElements[colIndex].name]
                    );
                }
              }
              //}
            }
          }
        }
      }
    }
  }
  //dependent information JSON itiration
  let updtingElementsModal = jsonHelper.cloneObj(rawdata.modals);
  if (updtingElementsModal) {
    for (newRowIndex in updtingElementsModal) {
      let updatingModalElements = updtingElementsModal[newRowIndex];
      for (let modalIndex in updatingModalElements) {
        let elemntsModal = updatingModalElements[modalIndex];
        for (let newModalIndex in elemntsModal) {
          let updatingModalElements = elemntsModal[newModalIndex];
          for (let rowIndex in updatingModalElements) {
            if (typeof updatingModalElements[rowIndex] !== "function") {
              if (Array.isArray(updatingModalElements[rowIndex])) {
                let rowElements = updatingModalElements[rowIndex];
                for (let colIndex in rowElements) {
                  if (typeof rowElements[colIndex] !== "function") {
                    if (rowElements[colIndex].name) {
                      if (configStraightList[rowElements[colIndex].name]) {
                        updatingModalElements[rowIndex][colIndex] =
                          await checkConfigAndUpdateElements(
                            jsonHelper.cloneObj(rowElements[colIndex]),
                            configStraightList[rowElements[colIndex].name],
                            updtingElementsModal
                          );
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  //update the final JSON
  if (updtingElementsModal) {
    finalElementsJson.modals = updtingElementsModal;
  }
  if (updatingElements) {
    finalElementsJson.elements = updatingElements;
  }
  if (sectionPanel) {
    finalElementsJson.sectionPanels = sectionPanel;
  }
  return finalElementsJson;
};

module.exports = { getUpdatedElementsJsonasedOnConfig };
