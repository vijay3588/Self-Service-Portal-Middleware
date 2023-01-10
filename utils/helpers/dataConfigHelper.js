const { jsonHelper } = require("./jsonHelper");
const { logger } = require("../../logger/logger");

class dataConfigHelper {

    //Assign data to segment asper Configuration
    static applyConfigOnData = (element, config, mappingSegment, dataObj, objLength) => {
        try {
            let dataObject = element.frontDataSegmentPath ? 
            jsonHelper.getObject(element.frontDataSegmentPath, dataObj) : dataObj ;
            let dataConfigObj = config;
            let lookUpSector = dataConfigObj && dataConfigObj.lookUpSector ? dataConfigObj.lookUpSector : "rearSector"
            if (dataConfigObj.configType == "boolean") {
                if (dataConfigObj.value){
                    return dataConfigObj.value == dataObject[element.frontSector] ? true : false;
                }else{
                    //If Rear Sector has data and hasData property is true, return boolean value as true
                    return (dataConfigObj.hasData && dataObject[element.rearSector]) ? true : false
                }
            }
            else if (dataConfigObj.configType == "number") {
                let value =  dataConfigObj.sector ? dataObject[dataConfigObj.sector]  : dataObject[element.frontSector];
                value = value ? value.replace(",", "") : "";
                value = value ? Number(value.replace(dataConfigObj.currency, "")) : 0;
                return isNaN(value) ? 0 : value;
            }
            else if (dataConfigObj.configType == "emptyString") {
                if (dataConfigObj.hasData) {
                    return dataObject[element.dataConfig.validateUISector] ? "" : dataObject[element.rearSector] ? dataObject[element.rearSector] : "";
                }
                else {
                    return dataObject[element.dataConfig.validateUISector] ? dataObject[element.rearSector] ? dataObject[element.rearSector] : "" : "";
                }
            }
            else if (dataConfigObj.configType == "mappedData") {
                //Return already mapped data
                return mappingSegment[dataConfigObj.mappedSector];
            }
            else if (dataConfigObj.configType == "splitData") {
                let value = dataObject[element.rearSector] ?
                    dataObject[element.rearSector].split(dataConfigObj.split.splitChar)[dataConfigObj.split.splitIndex]
                    : ""
                if (dataConfigObj.split.chartEndPos == 0) {
                    return value.substring(dataConfigObj.split.charStartPos);
                }
                else {
                    return value.substring(dataConfigObj.split.charStartPos, dataConfigObj.split.chartEndPos);
                }
            }
            else if (dataConfigObj.configType == "arrayAddition") {
                let additionValue = 0;
                let dataObjs = [];
                dataObjs.push(jsonHelper.cloneObj(jsonHelper.getObject(dataConfigObj.dataParentSegment, dataObj)));
                dataObjs.forEach((dataItem) => {
                    let subDataObj = jsonHelper.getObject(element.rearDataSegmentPath, dataItem);
                    additionValue += subDataObj[element.rearSector];
                });
                return isNaN(additionValue) ? 0 : additionValue;
            }
            else if (dataConfigObj.configType == "getPastDays") {
                let currentDate = new Date();
                let dataSegment = dataObj;
                if (element.rearDataSegmentPath) {
                    dataSegment = jsonHelper.getObject(element.rearDataSegmentPath, dataObj);
                    if (Array.isArray(dataSegment)) { dataSegment = dataSegment[0] }
                }
                let dateDiffs = jsonHelper.dateDiff(currentDate, dataSegment[element.rearSector]);
                if (dateDiffs < 0) {
                    dateDiffs = 0;
                }
                return dateDiffs + dataConfigObj.endString;
            }
            else if (dataConfigObj.configType == "preText") {
                return dataConfigObj.text + dataObject[element.rearSector];
            }
            else if (dataConfigObj.configType == "postText") {
                return dataObject[element.rearSector] + dataConfigObj.text;
            }
            else if (dataConfigObj.configType == "additionSector") {
                return dataObject[element.rearSector] ?
                    (dataObject[element.rearSector] + dataConfigObj.splitText + dataObject[dataConfigObj.sector]) : "";
            }
            else if (dataConfigObj.configType == "addressFormat") {
                let data = dataObject[element.rearSector] ? dataObject[element.rearSector] : dataObject;
                let props = dataConfigObj.format ? dataConfigObj.format : '';
                let eValue = '';
                if (props.includes('?')) {
                    let elements = props.split(';');
                    elements.forEach((itemElement) => {
                        if (itemElement) {
                            let itemProps = itemElement.split('?');
                            if (itemProps.length >= 2) {
                                let dataProps = itemProps[1].split(':');
                                if (dataProps.length >= 2) {
                                    let prop = itemProps[0].replace(/ /g, '');
                                    let dataValue = data[prop]
                                    if (!dataValue && dataConfigObj.subDataSegment) {
                                        if (data[dataConfigObj.subDataSegment] && data[dataConfigObj.subDataSegment][prop]) {
                                            dataValue = data[dataConfigObj.subDataSegment][prop];
                                        }
                                    }
                                    eValue += dataValue
                                        ? dataValue +
                                        dataProps[0]
                                            .replace(prop, '')
                                            .replace(' ', '')
                                            .replace(/'/g, '')
                                            .replace(' ', '')
                                        : "";
                                }
                            }
                        }
                    });
                } else {
                    eValue = data[props];
                }
                return eValue;
            }
            else if (dataConfigObj.configType == "sectorConcatenation") {
                let tempString = "" ;
                dataConfigObj.sectors && dataConfigObj.sectors.forEach((sector)=>{
                    tempString += dataObject[sector] + dataConfigObj.splitChar;
                })
                tempString += dataObject[element[lookUpSector]];
                return tempString;
            }
            else if (dataConfigObj.configType == "currentDate") {
                let currentDate = new Date();
                return currentDate.getUTCFullYear() + '/' + (currentDate.getUTCMonth() + 1) + '/' + currentDate.getUTCDate();
            }
            else if (dataConfigObj.configType == "currentTime") {
                let currentdate = new Date(); 
                let currentTime = currentdate.getHours() + ":"  
                                + currentdate.getMinutes() + ":" 
                                + currentdate.getSeconds();
                return currentTime
            }
            else if (dataConfigObj.configType == "dataLength") {
                return objLength;
            }
        } catch (error) {
            logger.logHelper().error(error);
            logger.logCreator().trace("Error at applyConfigOnData function in dataConfigHelper file for the mapping segment:" + mappingSegment);
        }
    }
}

module.exports = { dataConfigHelper }