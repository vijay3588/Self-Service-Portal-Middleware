const requestProcessor = require("./requestProcessor");
const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const { logger } = require("../logger/logger");
const {
  getUpdatedElementsJsonasedOnConfig,
} = require("../utils/helpers/configHelper");

const getBearerToken = (req, res) => {
  try {
    return requestProcessor.request(
      req,
      res,
      constants.SERVICE_REQUEST.BEARER_TOKEN,
      req.headers,
      jsonHelper.reqUserInfo(req.headers),
      false
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getBearerToken function in serviceProcessor file");
    res.json(null);
  }
};

const addEmployee = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADD_EMPLOYEE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addEmployee function in serviceProcessor file");
    res.json(null);
  }
};

//Add Theme
// const addTheme = (req, res) => {
//   try {
//     return requestProcessor.request(
//       req.body,
//       res,
//       constants.SERVICE_REQUEST.ADD_EMPLOYEE,
//       req.headers,
//       jsonHelper.reqUserInfo(req.headers)
//     );
//   } catch (error) {
//     logger.logCreator().error(error);
//     logger
//       .logCreator()
//       .trace("Error at addEmployee function in serviceProcessor file");
//     res.json(null);
//   }
// };

const getViewDisbursement = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.VIEW_DISBURSEMENT,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getViewDisbursement function in serviceProcessor file");
    res.json(null);
  }
};

const getInvoice = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.VIEW_INVOICE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getInvoice function in serviceProcessor file");
    res.json(null);
  }
};

const getViewPayment = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.VIEW_PAYMENT,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getViewPayment function in serviceProcessor file");
    res.json(null);
  }
};

const getPaymentDetails = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_PAYMENT_DETAILS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getPaymentDetails function in serviceProcessor file");
    res.json(null);
  }
};

const getParticipations = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.VIEW_PARTICIPATIONS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getParticipations function in serviceProcessor file");
    res.json(null);
  }
};

const searchEmployee = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.SEARCH_EMPLOYEE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at searchEmployee function in serviceProcessor file");
    res.json(null);
  }
};

const searchEnrollment = (req, res) => {
  try {
    return requestProcessor.request(
      req.body.values,
      res,
      constants.SERVICE_REQUEST.SEARCH_ENROLLMENT,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at searchEnrollment function in serviceProcessor file");
    res.json(null);
  }
};

const searchQuote = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.SEARCH_QUOTE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at searchQuote function in serviceProcessor file");
    res.json(null);
  }
};
const quoteList = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.QUOTE_LIST,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at quoteList function in serviceProcessor file");
    res.json(null);
  }
};

const searchClaims = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.SEARCH_CLAIMS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at searchClaims function in serviceProcessor file");
    res.json(null);
  }
};

const searchClientPolicies = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.SEARCH_CLIENT_POLICES,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at searchClientPolicies function in serviceProcessor file");
    res.json(null);
  }
};

const searchInvoice = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.SEARCH_INVOICE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at searchInvoice function in serviceProcessor file");
    res.json(null);
  }
};

const addressChange = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADDRESS_CHANGE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addressChange function in serviceProcessor file");
    res.json(null);
  }
};

const clientAddressChange = (req, res) => {
  try {
    return requestProcessor.request(
      req,
      res,
      constants.SERVICE_REQUEST.CLIENT_ADDRESS_CHANGE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at clientAddressChange function in serviceProcessor file");
    res.json(null);
  }
};

const personCorrespondenceChange = (req, res) => {
  try {
    return requestProcessor.request(
      req,
      res,
      constants.SERVICE_REQUEST.PERSON_CORRESPONDENCE_CHANGE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at personCorrespondenceChange function in serviceProcessor file"
      );
    res.json(null);
  }
};

const changeName = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.CHANGE_NAME,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at changeName function in serviceProcessor file");
    res.json(null);
  }
};

//Code to get configured Theme Name
const getConfiguredTheme = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_CONFIGURED_THEME,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getTheme function in serviceProcessor file");
    res.json(null);
  }
};

//Get Themes new code to get data from DB
const getThemes = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_THEME,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getTheme function in serviceProcessor file");
    res.json(null);
  }
};

//Get Themes new code to get theme names from DB
const getAvailableThemeNames = (req, res) => {
  // req.body = { ...req.body, callType: "getThemes" };

  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_AVAILABLE_THEMES,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getTheme function in serviceProcessor file");
    res.json(null);
  }
};

//Add Client to DB
const addClientToDB = (req, res) => {
  let date = new Date();
  let uuid = date.getTime();
  req.body = { ...req.body, callType: "addClient" };
  req.body.values.Name.identifier = uuid;

  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADD_CLIENT,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getTheme function in serviceProcessor file");
    res.json(null);
  }
};

//Configure Theme to db
const configureThemeToDB = (req, res) => {
  let date = new Date();
  let uuid = date.getTime();
  let clientId = req.body.loggedUserEntity._Result.clientId.internalClientId;
  req.body = { ...req.body, callType: "configureTheme" };
  req.body.values.Name.identifier = uuid;
  req.body.values.Name.clientId = clientId;
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.CONFIGURE_THEME,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getTheme function in serviceProcessor file");
    res.json(null);
  }
};

//Add Themes to add the theme to  DB
const addThemeToDB = async (req, res) => {
  let date = new Date();
  let uuid = date.getTime();
  let clientId = req.body.loggedUserEntity._Result.clientId.internalClientId;
  req.body = { ...req.body, callType: "addTheme" };
  req.body.values.Name.identifier = uuid;
  req.body.values.Name.clientId = clientId;
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADD_THEME,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getTheme function in serviceProcessor file");
    res.json(null);
  }
};

//Update Theme to db
const editThemeToDB = (req, res) => {
  let date = new Date();
  let uuid = date.getTime();
  req.body = { ...req.body, callType: "editTheme" };
  //  req.body = { ...req.body.values.Name, identifier: "addTheme" }
  req.body.values.Name.identifier = uuid;

  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.EDIT_THEME,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getTheme function in serviceProcessor file");
    res.json(null);
  }
};

//Get login username
const getLoginUser = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_LOGIN_USERNAME,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addThemeMapping function in serviceProcessor file");
    res.json(null);
  }
};

//Get login username
const getPersonalInformation = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_PERSONAL_INFORMATION,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addThemeMapping function in serviceProcessor file");
    res.json(null);
  }
};

//Get employments
const getEmployments = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_EMPLOYMENTS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addThemeMapping function in serviceProcessor file");
    res.json(null);
  }
};

//Get employment INformation
const getEmploymentInformation = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_EMPLOYMENT_INFORMATION,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addThemeMapping function in serviceProcessor file");
    res.json(null);
  }
};

//Update Employee Information
const updateEmployeeInformation = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.UPDATE_EMPLOYEE_INFORMATION,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addThemeMapping function in serviceProcessor file");
    res.json(null);
  }
};

//Get products details for product page
const getProductDetails = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_PRODUCT_DETAILS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addThemeMapping function in serviceProcessor file");
    res.json(null);
  }
};

//Add alternate address
const addAlternateAddress = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADD_ALTERNATE_ADDRESS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addThemeMapping function in serviceProcessor file");
    res.json(null);
  }
};

//Update alternate address
const updateAlternateAddress = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.UPDATE_ALTERNATE_ADDRESS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addThemeMapping function in serviceProcessor file");
    res.json(null);
  }
};

//searchGBPForLegalEntity

const searchGBPForLegalEntity = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.SEARCH_GBP_FOR_LEGALENTITY,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addThemeMapping function in serviceProcessor file");
    res.json(null);
  }
};

//InitNewEnrollmentProcess;

//init new Enrollment process

const initNewEnrollmentProcess = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.INIT_NEW_ENROLLMENT_PROCESS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addThemeMapping function in serviceProcessor file");
    res.json(null);
  }
};

//aDD THEME FORM MAPPING
const addThemeMapping = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADD_THEME_MAPPING,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addThemeMapping function in serviceProcessor file");
    res.json(null);
  }
};

const personNameChange = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.PERSON_CHANGE_NAME,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at personNameChange function in serviceProcessor file");
    res.json(null);
  }
};

const brokerNameChange = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.BROKER_CHANGE_NAME,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at brokerNameChange function in serviceProcessor file");
    res.json(null);
  }
};

const employeeNameChange = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.EMPLOYEE_NAME_CHANGE,
      req.headers,
      jsonHelper.reqUserInfo(req.body)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at employeeNameChange function in serviceProcessor file");
    res.json(null);
  }
};

const getActorForLoggedUser = (req, res) => {
  try {
    return requestProcessor.request(
      req,
      res,
      constants.SERVICE_REQUEST.ACTOR_FOR_LOGGED_USER,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at getActorForLoggedUser function in serviceProcessor file"
      );
    res.json(null);
  }
};

const getPersonWithHistory = (req, res) => {
  try {
    return requestProcessor.request(
      req,
      res,
      constants.SERVICE_REQUEST.PERSON_WITH_HISTORY,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getPersonWithHistory function in serviceProcessor file");
    res.json(null);
  }
};

const getUserLegalEntitiyDetails = (req, res) => {
  try {
    return requestProcessor.request(
      req,
      res,
      constants.SERVICE_REQUEST.USER_LEGAL_ENTITIY,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at getUserLegalEntitiyDetails function in serviceProcessor file"
      );
    res.json(null);
  }
};

const getBrokerDetails = (req, res) => {
  try {
    return requestProcessor.request(
      req,
      res,
      constants.SERVICE_REQUEST.USER_BROKER_DETAILS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getBrokerDetails function in serviceProcessor file");
    res.json(null);
  }
};

const getGbpForLegalEntity = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GBP_LEGAL_ENTITIY,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getGbpForLegalEntity function in serviceProcessor file");
    res.json(null);
  }
};

const acceptGBPQuote = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ACCEPT_GBP_QUOTE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at acceptGBPQuote function in serviceProcessor file");
    res.json(null);
  }
};

const clientContractDetails = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.CLIENT_CONTRACT_DETAILS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at clientContractDetails function in serviceProcessor file"
      );
    res.json(null);
  }
};

const contractEndorsements = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.CONTRACT_ENDORSEMENTS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at contractEndorsements function in serviceProcessor file");
    res.json(null);
  }
};

const clientContactDetails = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.CLIENT_CONTACT_DETAILS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at clientContactDetails function in serviceProcessor file");
    res.json(null);
  }
};

const companyProfileMapping = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.COMPANY_PROFILE_MAPPING,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at companyProfileMapping function in serviceProcessor file"
      );
    res.json(null);
  }
};

const clientProfileMapping = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.CLIENT_PROFILE_MAPPING,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at clientProfileMapping function in serviceProcessor file");
    res.json(null);
  }
};

const loanPolicyDetails = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.LOAN_POLICY_DETAILS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at loanPolicyDetails function in serviceProcessor file");
    res.json(null);
  }
};

const lifeContractDetails = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.LIFE_CONTRACT_DETAILS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at lifeContractDetails function in serviceProcessor file");
    res.json(null);
  }
};

const balanceForLoanAtDate = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.BALANCE_LOAN_AT_DATE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at balanceForLoanAtDate function in serviceProcessor file");
    res.json(null);
  }
};

const policyChange = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.POLICY_CHANGE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at policyChange function in serviceProcessor file");
    res.json(null);
  }
};

const billsForInvoice = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.BILLS_FOR_INVOICE,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at billsForInvoice function in serviceProcessor file");
    res.json(null);
  }
};

const viewCustomerBills = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.VIEW_CUSTOMER_BILLS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at viewCustomerBills function in serviceProcessor file");
    res.json(null);
  }
};

const searchOperations = (req, res) => {
  try {
    return requestProcessor.request(
      req,
      res,
      constants.SERVICE_REQUEST.SEARCH_OPERATIONS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at searchOperations function in serviceProcessor file");
    res.json(null);
  }
};

const viewClaimDetails = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.VIEW_CLAIM_DETAILS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at viewClaimDetails function in serviceProcessor file");
    res.json(null);
  }
};

const searchActorContactHistory = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ACTOR_CONTACT_HISTORY,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at searchActorContactHistory function in serviceProcessor file"
      );
    res.json(null);
  }
};

const getBankDetailsFromRN = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.BANK_DETAILS_FROM_RN,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getBankDetailsFromRN function in serviceProcessor file");
    res.json(null);
  }
};

const getDocumentsForClaim = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.GET_DOC_FOR_CLAIM,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getDocumentsForClaim function in serviceProcessor file");
    res.json(null);
  }
};

const getDocReqContainerForClaim = (req, res) => {
  try {
    return requestProcessor.request(
      req,
      res,
      constants.SERVICE_REQUEST.GET_DOC_REQ_CONT_FOR_CLAIM,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at getDocReqContainerForClaim function in serviceProcessor file"
      );
    res.json(null);
  }
};

const docForClaimEndorsement = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.DOC_FOR_CLAIM_ENDORSEMENT,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at docForClaimEndorsement function in serviceProcessor file"
      );
    res.json(null);
  }
};

const createOrUpdateClaimNA = (req, res) => {
  try {
    return requestProcessor.request(
      req,
      res,
      constants.SERVICE_REQUEST.UPDATE_CLAIM_NA,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at createOrUpdateClaimNA function in serviceProcessor file"
      );
    res.json(null);
  }
};

const createOrUpdateClaim = (req, res) => {
  try {
    return requestProcessor.request(
      req,
      res,
      constants.SERVICE_REQUEST.UPDATE_CLAIM,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at createOrUpdateClaim function in serviceProcessor file");
    res.json(null);
  }
};

const getForm = async (req, res) => {
  try {
    let newPath = jsonHelper.reqUserInfo(req.headers);
    let rawdata = await jsonHelper.getJSON(
      req.body.form,
      constants.PATH_FORM_ELEMENT,
      req.body.formLayoutType,
      newPath
    );
    let updateData = await rawdata;
    let finalData = {};
    if (
      updateData &&
      req.headers.usertype === "Enrollment" &&
      req.body.form === "EmployeeProfile" &&
      req.body.formLayoutType === "EmployeeProfile"
    ) {
      finalData = await getUpdatedElementsJsonasedOnConfig(
        updateData,
        req.body.clientId,
        req.body.form
      );
    } else if (
      updateData &&
      req.headers.usertype === "Enrollment" &&
      req.body.form === "DependentInformation" &&
      req.body.formLayoutType === "EmployeeProfile"
    ) {
      finalData = await getUpdatedElementsJsonasedOnConfig(
        updateData,
        req.body.clientId,
        req.body.form
      );
    } else{
      finalData = updateData;
    };
    res.json(finalData);
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getForm function in serviceProcessor file");
    res.json(null);
  }
};

const getConstants = (req, res) => {
  try {
    let subFolder =
      req.headers && req.headers.language ? req.headers.language + "/" : "";
    let rawdata = jsonHelper.getJSON(
      req.body.constantName,
      constants.PATH_FRONT_CONSTANTS,
      subFolder
    );
    let result = { [req.body.constantName]: rawdata };
    res.json(result);
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at getConstants function in serviceProcessor file");
    res.json(null);
  }
};

//Code to get themes json data
// const getThemes = (req, res) => {
//   try {
//     let subFolder = req.body.constantName;
//     let rawdata = jsonHelper.getJSON(
//       req.body.constantName,
//       constants.PATH_FOR_THEME
//     );
//     // let result = { [req.body.constantName]: rawdata };
//     let result = { theme: rawdata };
//     res.json(result);
//   } catch (error) {
//     logger.logCreator().error(error);
//     logger
//       .logCreator()
//       .trace("Error at getThemes function in serviceProcessor file");
//     res.json(null);
//   }
// };

const getAllPossibleAccountsForClient = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.POSSIBLE_ACCOUNTS,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at getAllPossibleAccountsForClient function in serviceProcessor file"
      );
    res.json(null);
  }
};

const searchAccountOperationsWithCriteria = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.SEARCH_ACCOUNT,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace(
        "Error at searchAccountOperationsWithCriteria function in serviceProcessor file"
      );
    res.json(null);
  }
};
const makePayment = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.MAKE_PAYMENT,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at makePayment function in serviceProcessor file");
    res.json(null);
  }
};

const addBankAccount = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.ADD_BANK_ACCOUNT,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at addBankAccount function in serviceProcessor file");
    res.json(null);
  }
};

const logOffEx = (req, res) => {
  try {
    return requestProcessor.request(
      req.body,
      res,
      constants.SERVICE_REQUEST.LOG_OFF,
      req.headers,
      jsonHelper.reqUserInfo(req.headers)
    );
  } catch (error) {
    logger.logCreator().error(error);
    logger
      .logCreator()
      .trace("Error at logOffEx function in serviceProcessor file");
    res.json(null);
  }
};

module.exports = {
  getBearerToken,
  addEmployee,
  // addTheme,
  addThemeToDB,
  configureThemeToDB,
  getConfiguredTheme,
  addClientToDB,
  editThemeToDB,
  getLoginUser,
  getPersonalInformation,
  getEmployments,
  getEmploymentInformation,
  updateEmployeeInformation,
  addAlternateAddress,
  updateAlternateAddress,
  searchGBPForLegalEntity,
  initNewEnrollmentProcess,
  getProductDetails,
  getViewDisbursement,
  getInvoice,
  getViewPayment,
  getParticipations,
  getActorForLoggedUser,
  getPersonWithHistory,
  getUserLegalEntitiyDetails,
  getBrokerDetails,
  searchEmployee,
  searchEnrollment,
  searchQuote,
  quoteList,
  searchClaims,
  searchClientPolicies,
  searchInvoice,
  addressChange,
  clientAddressChange,
  personCorrespondenceChange,
  changeName,
  personNameChange,
  brokerNameChange,
  employeeNameChange,
  getGbpForLegalEntity,
  acceptGBPQuote,
  clientContractDetails,
  contractEndorsements,
  clientContactDetails,
  loanPolicyDetails,
  lifeContractDetails,
  balanceForLoanAtDate,
  policyChange,
  getForm,
  getThemes,
  getAvailableThemeNames,
  addThemeMapping,
  getConstants,
  getPaymentDetails,
  getAllPossibleAccountsForClient,
  searchAccountOperationsWithCriteria,
  makePayment,
  billsForInvoice,
  viewCustomerBills,
  createOrUpdateClaimNA,
  createOrUpdateClaim,
  addBankAccount,
  viewClaimDetails,
  searchActorContactHistory,
  getBankDetailsFromRN,
  getDocumentsForClaim,
  getDocReqContainerForClaim,
  docForClaimEndorsement,
  searchOperations,
  companyProfileMapping,
  clientProfileMapping,
  logOffEx,
};
