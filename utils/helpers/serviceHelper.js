const axios = require("axios");
const {logger} =  require("../../logger/logger");

const requestMaker = async (requestBody, requestInfo) => {
  try {
    const requestObj = {};
    if ( requestInfo && requestInfo.hasParams ) {
      requestObj.params = requestBody;
    } else {
      requestObj.data = requestBody;
    }

    const response = await axios({
      url: requestInfo.URL,
      method: requestInfo.method,
      headers: requestInfo.header,
      ...requestObj,
    });
    if (response.data){
      let temp = response.data
      temp.status = response.status
      return(temp);
    }
    else{
      logger.logHelper().info("API response does not return data in serviceHelper for request: " + requestInfo.URL + 
      "\n Method: " + requestInfo.method + 
      "\n Header details: " + JSON.stringify(requestInfo.header) +
      "\n Request Body: " + JSON.stringify(requestBody));
      return null;
    }
  } catch (error) {
    logger.logHelper().error(error);
    logger.logHelper().trace("Error in serviceHelper file for request: " + requestInfo.URL + 
    "\n Method: " + requestInfo.method + 
    "\n Header details: " + JSON.stringify(requestInfo.header) +
    "\n Request Body :" + JSON.stringify(requestBody) );
    return({"error":error});
  }
};

module.exports = {requestMaker}