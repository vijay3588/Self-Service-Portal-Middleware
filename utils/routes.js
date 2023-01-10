const express = require("express");
const router = express();

const serviceProcessor = require("../processor/serviceProcessor");

const contractInformation = require("../requestHandler/contractInformation");
const quoteDetailsView = require("../requestHandler/quoteDetailsView");
const claimDeclaration = require("../requestHandler/claimDeclaration");
const loanReimbursementEndorsement = require("../requestHandler/loanReimbursementEndorsement");
const getInsuredPolicyVehicleCoverages = require("../requestHandler/getInsuredPolicyVehicleCoverages");
const getEnrollment = require("../requestHandler/getEnrollment");
const addEmployees = require("../requestHandler/addEmployees");
const getProducts = require("../requestHandler/getProducts");
const addAdditionalAddress = require("../requestHandler/addAdditionalAddress");
const updateAdditionalAddress = require("../requestHandler/updateAdditionalAddress");
const searchGBPForLegalEntity = require("../requestHandler/searchGBPForLegalEntity");
const initNewEnrollmentProcess = require("../requestHandler/initNewEnrollmentProcess");
const getListOfEligibleProducts = require("../requestHandler/getListOfEligibleProducts");
const subscribeThisListOfProducts = require("../requestHandler/subscribeThisListOfProducts");
const getProcess = require("../requestHandler/getProcess");
const getCoveredPersonTypeConfiguration = require("../requestHandler/getCoveredPersonTypeConfiguration");
const createOrUpdateInsured = require("../requestHandler/createOrUpdateInsured");
const deleteInsured = require("../requestHandler/deleteInsured");
const portalProcessor = require("../portalLedge/portalProcessor");
const recaptchaValidator = require("../requestHandler/recaptchaValidator")
const addEmployeeMFAData = require("../requestHandler/addEmployeeMFAData");
const sendMFAEmail = require("../requestHandler/sendMFAEmail");
const activateMFAFactor = require("../requestHandler/activateMFAFactor");
const setMFAPassword = require("../requestHandler/setMFAPassword");


router.post("/recaptchaValidator", recaptchaValidator.recaptchaValidator);
router.post("/bearerToken", serviceProcessor.getBearerToken);
router.post("/createEmployee", serviceProcessor.addEmployee);
router.post("/createEmployees", addEmployees.addEmployees);
router.post("/addAdditionalAdd", addAdditionalAddress.addAdditionalAddress);
router.post(
  "/updateAdditionalAdd",
  updateAdditionalAddress.updateAdditionalAddress
);

router.post(
  "/searchGBPForLegalEntity",
  searchGBPForLegalEntity.searchGBPForLegalEntity
);

router.post(
  "/initNewEnrollmentProcess",
  initNewEnrollmentProcess.initNewEnrollmentProcess
);

router.post(
  "/getListOfEligibleProducts",
  getListOfEligibleProducts.getListOfEligibleProducts
);

router.post(
  "/subscribeThisListOfProducts",
  subscribeThisListOfProducts.subscribeThisListOfProducts
);

router.post(
  "/getProcess",
  getProcess.getProcess
);

router.post(
  "/getCoveredPersonTypeConfiguration",
  getCoveredPersonTypeConfiguration.getCoveredPersonTypeConfiguration
);
router.post(
  "/createOrUpdateInsured",
  createOrUpdateInsured.createOrUpdateInsured
);
router.post("/deleteInsured", deleteInsured.deleteInsured);
router.post("/getViewDisbursement", serviceProcessor.getViewDisbursement);
router.post("/getViewPayment", serviceProcessor.getViewPayment);
router.post("/getPaymentDetails", serviceProcessor.getPaymentDetails);
router.post("/search/employee", serviceProcessor.searchEmployee);
router.post("/search/enrollment", serviceProcessor.searchEnrollment);
router.post("/getForm", serviceProcessor.getForm);

//MFA 
router.post("/sign-up/employee-data", addEmployeeMFAData.addEmployeeMFAData);
router.post("/sign-up/send-email-challenge", sendMFAEmail.sendMFAEmail);
router.post("/sign-up/activate-factor", activateMFAFactor.activateMFAFactor);
router.post("/sign-up/set-password", setMFAPassword.setMFAPassword);


//Employee Profile
router.post("/getLoginUser", serviceProcessor.getLoginUser);
router.post("/getPersonalInformation", serviceProcessor.getPersonalInformation);
router.post("/getEmployments", serviceProcessor.getEmployments);
router.post(
  "/getEmploymentInformation",
  serviceProcessor.getEmploymentInformation
);
router.post(
  "/updateEmployeeInformation",
  serviceProcessor.updateEmployeeInformation
);
router.post("/addAlternateAddress", serviceProcessor.addAlternateAddress);

router.post("/updateAlternateAddress", serviceProcessor.updateAlternateAddress);
router.post(
  "/searchGBPForLegalEntity",
  serviceProcessor.searchGBPForLegalEntity
);

router.post(
  "/initNewEnrollmentProcess",
  serviceProcessor.initNewEnrollmentProcess
);
router.post(
  "/getProductDetails",
  serviceProcessor.getProductDetails
);

//Theme route
router.post("/getThemes", serviceProcessor.getThemes);
//Theme route route to get the theme names to display in UI
router.post("/getAvailableThemeNames", serviceProcessor.getAvailableThemeNames);
//tHEMING
router.post("/getThemingFormData", serviceProcessor.addThemeMapping);
router.post("/getConstants", serviceProcessor.getConstants);
router.post("/getInvoice", serviceProcessor.getInvoice);

router.post("/actorForLoggedUser", serviceProcessor.getActorForLoggedUser);
router.post("/personWithHistory", serviceProcessor.getPersonWithHistory);
router.post("/userLegalEntitiy", serviceProcessor.getUserLegalEntitiyDetails);
router.post("/userBrokerEntitiy", serviceProcessor.getBrokerDetails);
router.post("/getParticipations", serviceProcessor.getParticipations);
router.post("/search/quote", serviceProcessor.searchQuote);
router.post("/search/quoteList", serviceProcessor.quoteList);
router.post("/searchClaims", serviceProcessor.searchClaims);
router.post("/searchClientPolicies", serviceProcessor.searchClientPolicies);
router.post("/changeAddress", serviceProcessor.addressChange);
router.post("/clientAddressChange", serviceProcessor.clientAddressChange);
router.post(
  "/personCorrespondenceChange",
  serviceProcessor.personCorrespondenceChange
);
router.post("/search/invoice", serviceProcessor.searchInvoice);
router.post("/changeName", serviceProcessor.changeName);
//router.post("/changeName", changeEmployerName.changeEmployerName);
router.post("/changePersonName", serviceProcessor.personNameChange);
router.post("/changeBrokerName", serviceProcessor.brokerNameChange);
router.post("/changeEmployeeName", serviceProcessor.employeeNameChange);
router.post("/gbpForLegalEntity", serviceProcessor.getGbpForLegalEntity);
router.post("/acceptGBPQuote", serviceProcessor.acceptGBPQuote);
router.post("/clientContractDetails", serviceProcessor.clientContractDetails);
router.post("/contractEndorsements", serviceProcessor.contractEndorsements);
router.post("/clientContactDetails", serviceProcessor.clientContactDetails);
router.post("/getLoanPolicyDetails", serviceProcessor.loanPolicyDetails);


//Add EmployeeConfig
// router.post("/addEmployeeConfigToDb", serviceProcessor.addEmployeeConfigToDb);
// //Add EmployeeConfig
// router.post("/addDependentConfigToDb", serviceProcessor.addDependentConfigToDb);

//router.post("/CreateOrUpdateEmployee_SM", serviceProcessor.CreateOrUpdateEmployee_SM);
router.post(
  "/getCompanyProfileDetails",
  serviceProcessor.companyProfileMapping
);
//Add Theme to db
router.post("/addThemeToDb", serviceProcessor.addThemeToDB);

//Configure Theme to DB
router.post("/configureThemeToDB", serviceProcessor.configureThemeToDB);

//Get configured Theme
router.post("/getConfiguredTheme", serviceProcessor.getConfiguredTheme);
//Add cLIENT to db
router.post("/addClientToDb", serviceProcessor.addClientToDB);
//Edit Theme to db
router.post("/editThemeToDb", serviceProcessor.editThemeToDB);
//tHEMING
// router.post("/getThemingFormData", serviceProcessor.addThemeMapping);
router.post("/getClientProfileDetails", serviceProcessor.clientProfileMapping);
//router.post("/search/Enrollment", enrollment.searchEnrollment);
router.post(
  "/getContractInformationDetails",
  contractInformation.getContractInformationDetails
);
router.post("/viewQuote", quoteDetailsView.getQuoteDetails);
router.post("/createOrUpdateClaim", serviceProcessor.createOrUpdateClaim);
router.post("/createOrUpdateClaimNA", serviceProcessor.createOrUpdateClaimNA);
router.post(
  "/getDocumentRequestsContainerForClaim",
  serviceProcessor.getDocReqContainerForClaim
);
router.post("/claimDeclaration", claimDeclaration.claimDeclaration);
router.post(
  "/getDocumentRequestsContainerForClaimEndorsement",
  serviceProcessor.docForClaimEndorsement
);
router.post(
  "/loanReimbursementEndorsement",
  loanReimbursementEndorsement.loanReimbursementEndorsement
);
router.post(
  "/getPrincipalBalanceForLoanAtDate",
  serviceProcessor.balanceForLoanAtDate
);
router.post("/lifeContractDetails", serviceProcessor.lifeContractDetails);
router.post("/policyChange", serviceProcessor.policyChange);
router.post(
  "/getInsuredPolicyVehicleCoverages",
  getInsuredPolicyVehicleCoverages.getInsuredPolicyVehicleCoverages
);
router.post(
  "/getAllPossibleAccountsForClient",
  serviceProcessor.getAllPossibleAccountsForClient
);
router.post(
  "/searchAccountOperationsWithCriteria",
  serviceProcessor.searchAccountOperationsWithCriteria
);
router.post("/makePayment", serviceProcessor.makePayment);
router.post("/billsForInvoice", serviceProcessor.billsForInvoice);
router.post("/viewCustomerBills", serviceProcessor.viewCustomerBills);
router.post("/getEnrollment", getEnrollment.getEnrollment);
router.post("/searchOperations", serviceProcessor.searchOperations);
router.post(
  "/searchActorContactHistory",
  serviceProcessor.searchActorContactHistory
);
router.post(
  "/getBankDetailsUsingRoutingNumber",
  serviceProcessor.getBankDetailsFromRN
);
router.post("/addBankAccount", serviceProcessor.addBankAccount);
router.post("/viewClaimDetails", serviceProcessor.viewClaimDetails);
router.post(
  "/getReceivedDocumentsForClaim",
  serviceProcessor.getDocumentsForClaim
);
router.post("/logOffEx", serviceProcessor.logOffEx);
router.post("/getProducts", getProducts.getProducts);

/****************************  portal Ledge Routes ***************************************/
router.post("/addClientData", portalProcessor.addClient);
//api to get all the employee data
router.post("/getClientByIdFromDb", portalProcessor.getClientByClientId);
// router.get("/getClientByIdFromDb", portalProcessor.getClientByClientId);
//To submit all the employee config data
router.post("/createClientIntoDb", portalProcessor.createClient);
//To submit all the Dependent config data
 router.post("/createClientIntoDbDependent", portalProcessor.createClientForDependent)
 //To get all the Dependent Information config data
 router.post("/getDependentInfoByClientId", portalProcessor.getDependentInfoByClientId)

//client routes
router.get("/getAllClientDataFromDb", portalProcessor.getAllClientData);
router.get("/getClientDataByIdFromDb",portalProcessor.getClientDataById);
router.post("/addClientInfoToDb", portalProcessor.addClientInfo);
router.post("/editClientDataInDb", portalProcessor.editClientData);
router.delete("/deleteClientDataInDb", portalProcessor.deleteClientData);
//communication routes
router.post("/getAllCommunicationDataFromDb", portalProcessor.getAllCommunicationData);
router.get("/getCommunicationDataByIdFromDb", portalProcessor.getCommunicationDataById);
router.post("/addCommunicationInfoToDb", portalProcessor.addCommunicationInfo);
router.post("/editCommunicationDataFromDb", portalProcessor.editCommunicationData);
router.delete("/deleteCommunicationDataFromDb", portalProcessor.deleteCommunicationData);
//contact routes
router.post("/getAllContactDataFromDb", portalProcessor.getAllContactData);
router.get("/getContactDataByIdFromDb", portalProcessor.getContactDataById);
router.post("/addContactInfoToDb", portalProcessor.addContactInfo);
router.post("/editContactDataFromDb", portalProcessor.editContactData);
router.delete("/deleteContactDataFromDb", portalProcessor.deleteContactData);
//employment routes
router.post("/getAllEmploymentDataFromDb", portalProcessor.getAllEmploymentData);
router.get("/getEmploymentDataByIdFromDb",portalProcessor.getEmploymentDataById);
router.post("/addEmploymentInfoToDb", portalProcessor.addEmploymentInfo);
router.post("/editEmploymentDataFromDb", portalProcessor.editEmploymentData);
router.delete("/deleteEmploymentDataFromDb", portalProcessor.deleteEmploymentData);
//personal routes
router.post("/getAllPersonalDataFromDb", portalProcessor.getAllPersonalData);
router.get("/getPersonalDataByIdFromDb", portalProcessor.getPersonalDataById);
router.post("/addPersonalInfoToDb", portalProcessor.addPersonalInfo);
router.post("/editPersonalDataFromDb", portalProcessor.editPersonalData);
router.delete("/deletePersonalDataFromDb", portalProcessor.deletePersonalData);

module.exports = router;
