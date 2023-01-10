const requestProcessor = require("../processor/requestProcessor");
const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const { logger } = require("../logger/logger");

//adds data to all collections with the client_id
const addClient = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADD_CLIENT_DATA,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addClient function in serviceProcessor file");
    res.json(null);
  }
};

//get data from all collection which belongs to client
const getClientByClientId = (req, res) => {
  req.body = { ...req.body, callType: "getAllClientData" };
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_CLIENT_BY_CLIENT_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getClientByClientId function in serviceProcessor file");
    res.json(null);
  }
};



//gto get all the dependent Information which belongs to client
const getDependentInfoByClientId = (req, res) => {
  req.body = { ...req.body, callType: "getAllClientData" };
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_DEPENDENT_INFO_CLIENT_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getClientByClientId function in serviceProcessor file");
    res.json(null);
  }
};

//create client based on other fields (required,hideable editable, changeable)
const createClient = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.CREATE_CLIENT,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at createClient function in serviceProcessor file");
    res.json(null);
  }
};


//create client dependent informationbased on other fields (required,hideable editable, changeable)
const createClientForDependent = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.CREATE_CLIENT_DEPENDENT,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at createClient function in serviceProcessor file");
    res.json(null);
  }
};






//Gets only client data
const getAllClientData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_ALL_CLIENT_DATA,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getAllClientData function in serviceProcessor file");
    res.json(null);
  }
};

//Gets only client data by client_id
const getClientDataById = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_CLIENT_DATA_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getClientDataById function in serviceProcessor file");
    res.json(null);
  }
};

//Add Client info to db
const addClientInfo = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADD_CLIENT_INFO,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addClientInfo function in serviceProcessor file");
    res.json(null);
  }
};

//Edit Client info
const editClientData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.EDIT_CLIENT_INFO_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at editClientData function in serviceProcessor file");
    res.json(null);
  }
};

//Delete Client info
const deleteClientData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.DELETE_CLIENT_INFO_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at deleteClientData function in serviceProcessor file");
    res.json(null);
  }
};

//get all communication data
const getAllCommunicationData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_ALL_COMMUNICATION_DATA,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at getAllCommunicationData function in serviceProcessor file"
      );
    res.json(null);
  }
};

//get specific communication by id
const getCommunicationDataById = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_COMMUNICATION_DATA_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at getCommunicationDataById function in serviceProcessor file"
      );
    res.json(null);
  }
};

//Add communication data to db
const addCommunicationInfo = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADD_COMMUNICATION_INFO,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addCommunicationInfo function in serviceProcessor file");
    res.json(null);
  }
};

//Edit communication data by id
const editCommunicationData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.EDIT_COMMUNICATION_INFO_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at editCommunicationData function in serviceProcessor file"
      );
    res.json(null);
  }
};

//Delete communication data by id
const deleteCommunicationData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.DELETE_COMMUNICATION_INFO_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at deleteCommunicationData function in serviceProcessor file"
      );
    res.json(null);
  }
};

//get all Contact data
const getAllContactData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_ALL_CONTACT_DATA,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getAllContactData function in serviceProcessor file");
    res.json(null);
  }
};

//get specific Contact by id
const getContactDataById = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_CONTACT_DATA_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getContactDataById function in serviceProcessor file");
    res.json(null);
  }
};

//Add Contact data to db
const addContactInfo = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADD_CONTACT_INFO,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addContactInfo function in serviceProcessor file");
    res.json(null);
  }
};

//Edit Contact data by id
const editContactData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.EDIT_CONTACT_INFO_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at editContactData function in serviceProcessor file");
    res.json(null);
  }
};

//Delete Contact data by id
const deleteContactData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      { SERVICE: "deleteContactDataFromDb", LAYOUT: "Client" },
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at deleteContactData function in serviceProcessor file");
    res.json(null);
  }
};

//get all Employment data
const getAllEmploymentData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_ALL_EMPLOYMENT_DATA,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getAllEmploymentData function in serviceProcessor file");
    res.json(null);
  }
};

//get specific Employment by id
const getEmploymentDataById = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_EMPLOYMENT_DATA_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at getEmploymentDataById function in serviceProcessor file"
      );
    res.json(null);
  }
};

//Add Employment data to db
const addEmploymentInfo = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.addEmploymentInfoToDb,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addEmploymentInfo function in serviceProcessor file");
    res.json(null);
  }
};

//Edit Employment data by id
const editEmploymentData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.EDIT_EMPLOYMENT_INFO_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at editEmploymentData function in serviceProcessor file");
    res.json(null);
  }
};

//Delete Employment data by id
const deleteEmploymentData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.DELETE_EMPLOYMENT_INFO_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at deleteEmploymentData function in serviceProcessor file");
    res.json(null);
  }
};

//get all Personal data
const getAllPersonalData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
    constants.SERVICE_REQUEST.GET_ALL_PERSONAL_DATA,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getAllPersonalData function in serviceProcessor file");
    res.json(null);
  }
};

//get specific Personal by id
const getPersonalDataById = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_PERSONAL_DATA_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getPersonalDataById function in serviceProcessor file");
    res.json(null);
  }
};

//Add Personal data to db
const addPersonalInfo = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADD_PERSONAL_INFO,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addPersonalInfo function in serviceProcessor file");
    res.json(null);
  }
};

//Edit Personal data by id
const editPersonalData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.EDIT_PERSONAL_INFO_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at editPersonalData function in serviceProcessor file");
    res.json(null);
  }
};

//Delete Personal data by id
const deletePersonalData = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.DELETE_PERSONAL_INFO_BY_ID,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at deletePersonalData function in serviceProcessor file");
    res.json(null);
  }
};

module.exports = {
  addClient,
  getClientByClientId,
  getAllClientData,
  getClientDataById,
  addClientInfo,
  editClientData,
  deleteClientData,
  getAllCommunicationData,
  getCommunicationDataById,
  addCommunicationInfo,
  editCommunicationData,
  deleteCommunicationData,
  getAllContactData,
  getContactDataById,
  addContactInfo,
  editContactData,
  deleteContactData,
  getAllEmploymentData,
  getEmploymentDataById,
  addEmploymentInfo,
  editEmploymentData,
  deleteEmploymentData,
  getAllPersonalData,
  getPersonalDataById,
  addPersonalInfo,
  editPersonalData,
  deletePersonalData,
  createClient,
  createClientForDependent,
  getDependentInfoByClientId
};
