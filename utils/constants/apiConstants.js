module.exports = {
  bearerToken: {
    URL: "/rest/wynauth",
    method: "post",
  },
  legalEntity: {
    URL: "/ws/aSLI_Manage_Actors/CreateOrUpdateLegalEntity",
    method: "post",
  },
  personEntity: {
    URL: "/ws/aSLI_Manage_Actors/CreateOrUpdatePerson",
    method: "post",
  },
  addressChange: {
    URL: "/ws/aSLI_Manage_Actors/CreateOrUpdateLegalEntity",
    method: "post",
  },
  clientAddressChange: {
    URL: "/ws/aSLI_Manage_Actors/UpdateCustomerAddress",
    method: "post",
  },
  personCorrespondenceChange: {
    URL: "/ws/aSLI_Manage_Actors/UpdateCustomerCorrespondence",
    method: "post",
  },
  changeName: {
    URL: "/ws/aSLI_Manage_Actors/CreateOrUpdateLegalEntity",
    method: "post",
  },
  changeEmployeeName: {
    URL: "/ws/aSLI_Manage_Actors/CreateOrUpdateLegalEntity",
    method: "post",
  },
  addEmployee: {
    URL: "/ws/aSLI_Manage_Employee/CreateOrUpdateEmployee_SM",
    method: "post",
  },
  addEmployees: {
    URL: "/ws/aSLI_Manage_Employee/test",
    method: "post",
  },
  participations: {
    URL: "/ws/aSLI_Consult_Group/GetParticipationInfo",
    method: "post",
  },
  viewInvoice: {
    URL: "/ws/aSLI_Manage_Accounting/GetInvoices",
    method: "post",
  },
  invoiceDetails: {
    URL: "/ws/aSLI_Manage_Accounting/GetInvoices",
    method: "post",
  },
  actorForLoggedUser: {
    URL: "/ws/aSLI_Manage_Actors/GetActorForLoggedUser",
    method: "post",
  },
  personWithHistory: {
    URL: "/ws/aSLI_Manage_Actors/GetPersonWithHistory",
    method: "post",
  },
  userLegalEntity: {
    URL: "/ws/aSLI_Manage_Actors/GetLoggedUserLegalEntity",
    method: "post",
  },
  userBrokerDetails: {
    URL: "/ws/aSLI_Manage_Broker/GetLoggedUserBroker",
    method: "post",
  },
  disbursement: {
    URL: "/ws/aSLI_manage_Accounting/GetLastDisbursmentdetail",
    method: "post",
  },
  viewDisbursement: {
    URL: "/ws/aSLI_Manage_Accounting/GetDisbursementDetails",
    method: "post",
  },
  viewPayment: {
    URL: "/ws/asli_manage_accounting/GetLastPaymentdetail",
    method: "post",
  },
  payment: {
    URL: "/ws/aSLI_Manage_Payment/GetPayment",
    method: "post",
  },
  getPaymentDetails: {
    URL: "/ws/aSLI_Manage_Payment/GetPaymentDetails",
    method: "post",
  },
  contractDetails: {
    URL: "/ws/aSLI_Subscribe_GBPContract/GetGBPContractWithHistory",
    method: "post",
  },
  quoteDetails: {
    URL: "/ws/asli_consult_group/getgbpdetails",
    method: "post",
  },
  getEnrollment: {
    URL: "/ws/aSLI_manage_gbpMember/setEnrollmentData",
    method: "post",
  },
  searchEmployee: {
    URL: "/ws/aSLI_Manage_Employee/SearchEmployees",
    method: "post",
  },
  searchEnrollment: {
    URL: "/ws/aSLI_Consult_Group/GetLastActiveEnrollments",
    method: "post",
  },
  searchQuote: {
    URL: "/ws/aSLI_Consult_Policy/SearchCustomerQuotes",
    method: "post",
  },
  createCustomerContact: {
    URL: "/ws/aSLI_Manage_CustomerRequest/CreateCustomerContact",
    method: "post",
  },
  billsForInvoice: {
    URL: "/ws/aSLI_Manage_Accounting/GetBillsForInvoice",
    method: "post",
  },
  searchClaims: {
    URL: "/ws/aSLIC_Consult_claim/SearchClientClaims",
    method: "post",
  },
  searchClientPolicies: {
    URL: "/ws/aSLI_Consult_Policy/SearchClientPolicies",
    method: "post",
  },
  acceptGBPQuote: {
    URL: "/ws/aSLI_Manage_GBPQuote/AcceptGBPQuote",
    method: "post",
  },
  searchforInvoiceHistory: {
    URL: "/ws/aSLI_Manage_Accounting/SearchFinancialOperations",
    method: "post",
  },
  brokerEntity: {
    URL: "/ws/aSLI_Manage_Broker/CreateOrUpdateBroker",
    method: "post",
  },
  gbpForLegalEntity: {
    URL: "/ws/aSLI_Consult_Group/SearchGBPForLegalEntity",
    method: "post",
  },
  createOrUpdateClaim: {
    URL: "/ws/aSLIC_Manage_Claim/CreateOrUpdateClaim",
    method: "post",
  },
  getDocumentRequestsContainerForClaim: {
    URL: "/ws/aSLIC_Manage_Claim/GetDocumentRequestsContainerForClaim",
    method: "post",
  },
  claimDeclaration: {
    URL: "/ws/aSLI_Manage_CustomerRequest/UploadRequestedRequirementsForObjectEx",
    method: "post",
  },
  clientContractDetails: {
    URL: "/ws/aslo_consult_loanpolicy/GetLoanPolicyDetails",
    method: "post",
  },
  contractEndorsements: {
    URL: "/ws/aSLI_Consult_Policy/GetContractEndorsements",
    method: "post",
  },
  lifeContractDetails: {
    URL: "/ws/aSLI_Consult_LifePolicy/GetLifePolicyDetails",
    method: "post",
  },
  getLoanPolicyDetails: {
    URL: "/ws/aSLO_Consult_LoanPolicy/GetLoanPolicyDetails",
    method: "post",
  },
  getDocumentForClaimEndorsement: {
    URL: "/ws/aSLO_Endorse_LoanPolicy/GetRequestDocumentsForLoanReimbursementEndorsement",
    method: "post",
  },
  loanReimbursementEndorsement: {
    URL: "/ws/aSLO_Endorse_LoanPolicy/LoanReimbursementEndorsement",
    method: "post",
  },
  getPrincipalBalanceForLoanAtDate: {
    URL: "/ws/aSLO_Consult_LoanPolicy/GetPrincipalBalanceForLoanAtDate",
    method: "post",
  },
  getAllPossibleAccountsForClient: {
    URL: "/ws/aSLI_Manage_Accounting/GetAllPossibleAccountsForClient",
    method: "post",
  },
  searchAccountOperationsWithCriteria: {
    URL: "/ws/aSLI_Manage_Accounting/SearchAccountOperationsWithCriteria",
    method: "post",
  },
  makePayment: {
    URL: "/ws/aSLI_Manage_Payment/CreatePayment",
    method: "post",
  },
  getbills: {
    URL: "/ws/asli_manage_accounting/getbills",
    method: "post",
  },
  searchOperations: {
    URL: "/ws/aSLI_consult_operations/searchoperations",
    method: "post",
  },
  searchActorContactHistory: {
    URL: "/ws/aSLI_Manage_CustomerRequest/SearchActorContactHistory",
    method: "post",
  },
  getBankDetailsUsingRoutingNumber: {
    URL: "https://www.routingnumbers.info/api/data.json",
    overrideBaseURI: true,
    method: "get",
  },

  addBankAccount: {
    URL: "/ws/aSLI_Manage_Actors/AddCustomerBankAccountEx",
    method: "post",
  },

  viewClaimDetails: {
    URL: "/ws/aSLIC_Manage_Claim/GetClaim",
    method: "post",
  },
  getDocumentsForClaim: {
    URL: "/ws/aSLIC_Manage_Claim/GetReceivedDocumentsForClaim",
    method: "post",
  },
  logoff: {
    URL: "/ws/aSF_Manage_LogOn/LogOffEx",
    method: "post",
  },

  //employee profile
  //get username
  //URL: "/rest/actors/loginusername::jill",
  // URL: "/rest/actors/loginusername",

  getLoginUser: {
    URL: "/rest/actors/loginusername",
    method: "get",
  },
  //get personal information
  //accpt 3
  getPersonalInformation: {
    URL: "/rest/persons",
    // URL: "/rest/persons/318844252_27",
    method: "get",
  },
  //accpt5
  // getPersonalInformation: {
  //   URL: "/rest/persons/318844252_4",
  //   method: "get",
  // },

  //get employments
  getEmployments: {
    // URL: "/rest/persons/318844252_27/employments",
    URL: "/rest/persons",
    method: "get",
  },

  //get employments
  getEmploymentInformation: {
    URL: "/rest/employees",
    // URL: "/rest/employees/318844205_401",
    method: "get",
  },

  //Update Employee Information
  updateEmployeeInformation: {
    URL: "/rest/persons",
    method: "patch",
  },

  //Add Alternate Address
  // addAlternateAddress: {
  //   URL: "/rest/persons/318844252_27/correspondences",
  //   method: "post",
  // },

  addAdditionalAddress: {
    URL: "/rest/persons",
    method: "post",
  },

  updateAdditionalAddress: {
    URL: "/rest/persons",
    method: "patch",
  },
  // https://accept3-front.francecentral.cloudapp.azure.com/restapi/api/ws/aSLI_Consult_Group/SearchGBPForLegalEntity
  //https://accept3-front.francecentral.cloudapp.azure.com/restapi/api
  searchGBPForLegalEntity: {
    URL: "/ws/aSLI_Consult_Group/SearchGBPForLegalEntity",
    method: "post",
  },

  initNewEnrollmentProcess: {
    URL: "/ws/aSLI_Manage_EnrollmentProcess/InitNewEnrollmentProcess",
    method: "post",
  },

  getListOfEligibleProducts: {
    //https://accept6-front.centralus.cloudapp.azure.com/restapi/api/ws/aSLI_Manage_EnrollmentProcess/SubscribeThisListOfProducts
    URL: "/ws/aSLI_Manage_EnrollmentProcess/GetListOfEligibleProducts",
    method: "post",
  },

  getProductDetails: {
    //https://accept6-front.centralus.cloudapp.azure.com/restapi/api/ws/aSLI_Manage_EnrollmentProcess/SubscribeThisListOfProducts
    URL: "/rest/products/",
    method: "get",
  },

  subscribeThisListOfProducts: {
    //https://accept6-front.centralus.cloudapp.azure.com/restapi/api/ws/aSLI_Manage_EnrollmentProcess/SubscribeThisListOfProducts
    URL: "/ws/aSLI_Manage_EnrollmentProcess/SubscribeThisListOfProducts",
    method: "post",
  },

  
  getProcess: {
    //https://accept6-front.centralus.cloudapp.azure.com/restapi/api/ws/aSLI_Manage_EnrollmentProcess/SubscribeThisListOfProducts
    URL: "/ws/aSF_ManageProcesses/GetProcess",
    method: "post",
  },

  getCoveredPersonTypeConfiguration: {
    //https://accept6-front.centralus.cloudapp.azure.com/restapi/api/ws/aSLI_Manage_EnrollmentProcess/SubscribeThisListOfProducts
    URL: "/ws/aSLI_Manage_EnrollmentProcess/GetCoveredPersonTypeConfiguration",
    method: "post",
  },

  createOrUpdateInsured: {
    //https://accept6-front.centralus.cloudapp.azure.com/restapi/api/ws/aSLI_Manage_EnrollmentProcess/SubscribeThisListOfProducts
    URL: "/ws/aSLI_Manage_EnrollmentProcess/CreateOrUpdateInsured",
    method: "post",
  },
  
  deleteInsured: {
    //https://accept6-front.centralus.cloudapp.azure.com/restapi/api/ws/aSLI_Manage_EnrollmentProcess/SubscribeThisListOfProducts
    URL: "/ws/aSLI_Manage_EnrollmentProcess/DeleteInsured",
    method: "post",
  },

  //Update Alternate Address
  // updateAlternateAddress: {
  //   URL: "/rest/persons/318844252_27/correspondences/4",
  //   method: "patch",
  // },

  //This code below is added to get the call to WydeMercer server to get data from db
  getThemes: {
    URL: "/findTheme/",
    databaseCall: true,
    method: "get",
  },

  //This code below is added to get the call to WydeMercer server to get the available theme names from db
  getAvailableThemeNames: {
    URL: "/getAvailableThemeNames/",
    databaseCall: true,
    method: "get",
  },

  //This code below is added to get the call to WydeMercer server to get add the theme to db
  addThemeToDB: {
    URL: "/addTheme",
    databaseCall: true,
    method: "post",
  },

  //This code below is added to get the call to WydeMercer server to edit the theme in db
  editThemeToDB: {
    URL: "/editTheme/",
    databaseCall: true,
    method: "patch",
  },

  //This code below is to add client to db
  addClientToDB: {
    URL: "/addClient",
    databaseCall: true,
    method: "post",
  },

  //This code below is to CONFIGURE THEME to db for first time
  // configureThemeToDB: {
  //   URL: "/configureTheme",
  //   databaseCall: true,
  //   method: "post",
  // },

  //This code below is to CONFIGURE THEME to db to update it
  configureThemeToDB: {
    URL: "/configureUpdateTheme/",
    databaseCall: true,
    method: "patch",
  },

  //This code below is to GET THE CONFIGURED THEME to db
  getConfiguredTheme: {
    URL: "/getConfiguredTheme/",
    databaseCall: true,
    method: "get",
  },

  // Get validation for recaptcha Plugin
  recaptchaValidator: {
    URL: "https://www.google.com/recaptcha/api/siteverify?",
    overrideBaseURI: true,
    method: "get",
  },

   //This code below is to add client to db
  addClientData: {
    URL: "/addClientData",
    databaseCall: true,
    method: "post",
  },

  //This code below is to get client by id to db
  getClientByIdFromDb: {
    URL: "/getclient",
    // URL: "/getclient/",
    databaseCall: true,
    method: "get",
  },

   //This code below is to get all the dependent Information based on client Id to db
   getDependentInfoFromDb: {
    URL: "/getclientDependent",
    // URL: "/getclient/",
    databaseCall: true,
    method: "get",
  },



  


  //This code below is to get client to db
  getAllClientDataFromDb: {
    URL: "/client",
    databaseCall: true,
    method: "get",
  },

  //This code below is to get client by id to db
  getClientDataByIdFromDb: {
    URL: "/client/",
    databaseCall: true,
    method: "get",
  },

  //This code below is to get client by id to db
  addClientInfoToDb: {
    URL: "/client",
    databaseCall: true,
    method: "post",
  },

  //This code below is to get client by id to db
  editClientDataInDb: {
    URL: "/client/",
    databaseCall: true,
    method: "post",
  },

   //This code below is to get client by id to db
   deleteClientDataInDb: {
    URL: "/client/",
    databaseCall: true,
    method: "delete",
  },

  getAllCommunicationDataFromDb: {
    URL: "/communication",
    databaseCall: true,
    method: "get",
  },

  getCommunicationDataByIdFromDb: {
    URL: "/communication/",
    databaseCall: true,
    method: "get",
  },

  addCommunicationInfoToDb: {
    URL: "/communication",
    databaseCall: true,
    method: "post",
  },

  editCommunicationDataFromDb: {
    URL: "/communication/",
    databaseCall: true,
    method: "post",
  },

  deleteCommunicationDataFromDb: {
    URL: "/communication/",
    databaseCall: true,
    method: "delete",
  },

  getAllContactDataFromDb: {
    URL: "/contact",
    databaseCall: true,
    method: "get",
  },

  getContactDataByIdFromDb: {
    URL: "/contact/",
    databaseCall: true,
    method: "get",
  },

  addContactInfoToDb: {
    URL: "/contact",
    databaseCall: true,
    method: "post",
  },

  editContactDataFromDb: {
    URL: "/contact/",
    databaseCall: true,
    method: "post",
  },

  deleteContactDataFromDb: {
    URL: "/contact/",
    databaseCall: true,
    method: "delete",
  },

  getAllEmploymentDataFromDb: {
    URL: "/employment",
    databaseCall: true,
    method: "get",
  },

  getEmploymentDataByIdFromDb: {
    URL: "/employment/",
    databaseCall: true,
    method: "get",
  },

  addEmploymentInfoToDb: {
    URL: "/employment",
    databaseCall: true,
    method: "post",
  },

  editEmploymentDataFromDb: {
    URL: "/employment/",
    databaseCall: true,
    method: "post",
  },

  deleteEmploymentDataFromDb: {
    URL: "/employment/",
    databaseCall: true,
    method: "delete",
  },

  getAllPersonalDataFromDb: {
    URL: "/personal",
    databaseCall: true,
    method: "get",
  },

  getPersonalDataByIdFromDb: {
    URL: "/personal/",
    databaseCall: true,
    method: "get",
  },

  addPersonalInfoToDb: {
    URL: "/personal",
    databaseCall: true,
    method: "post",
  },

  editPersonalDataFromDb: {
    URL: "/personal/",
    databaseCall: true,
    method: "post",
  },

  deletePersonalDataFromDb: {
    URL: "/personal/",
    databaseCall: true,
    method: "delete",
  },
  createClientIntoDb: {
    URL: "/createClient",
    databaseCall: true,
    method: "post",
  },

  createClientIntoDbDependent: {
    URL: "/createClientDependent",
    databaseCall: true,
    method: "post",
  },


  //addEmployeeMFAData
  addEmployeeMFAData: {
    // URL: "/rest/persons/318844252_27/employments",
    URL: "/sign-up/employee-data",
    method: "post",
  },


};
