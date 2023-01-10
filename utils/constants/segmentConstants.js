module.exports = {
  PATH_LAYOUTS_SEGMENTS: "../../segments/layoutsSegment",
  PATH_OUTER_SEGMENTS: "Outer",
  RESPONSE_ENTRY_PATH: "_Result",
  // RESPONSE_ENTRY_PATH: { ENTRY_OBJECT: "No", NAME: "_Result" },

  PATH_REAR_SEGMENTS: "../../segments/rearSegments",
  PATH_FRONT_SEGMENTS: "frontSegments",
  PATH_FORM_ELEMENT: "../../forms",
  PATH_FOR_THEME: "../../themes",
  PATH_FRONT_CONSTANTS: "../../constants",
  EXT_JSON_FILE: ".json",
  DATA_TYPE_OBJECT: "object",
  DATA_TYPE_ARRAY: "array",
  LAYOUT_REAR_OBJ_NAME: "rear.json",
  LAYOUT_FRONT_OBJ_NAME: "front.json",
  LAYOUT_FRONT_REAR_MAP: "frontRearMap.json",
  LAYOUT_REAR_FRONT_MAP: "rearFrontMap.json",
  OBJ_FRONT_ELEMENT_NAME: "frontSegment",
  OBJ_REAR_ELEMENT: "rearDataSegment",
  OBJ_REAR_ELEMENT_CLASS: "rearDataSegmentClass",
  SERVICE_REQUEST: {
    BEARER_TOKEN: { SERVICE: "bearerToken", LAYOUT: "" },
    ADD_EMPLOYEE: { SERVICE: "addEmployee", LAYOUT: "AddEmployee" },
    ADD_EMPLOYEES: { SERVICE: "addEmployees", LAYOUT: "AddEmployees" },
    ADD_ADDITIONAL_ADDRESS: {
      SERVICE: "addAdditionalAddress",
      LAYOUT: "",
      RequestConfig: {
        queryStrMap: {
          queryStr: ["/"],
          sectors: ["buid"],
          dataPath: "loggedUserEntity.data.person",
          trailingURL: "/correspondences",
        },
      },
    },
    UPDATE_ADDITIONAL_ADDRESS: {
      SERVICE: "updateAdditionalAddress",
      LAYOUT: "",
      RequestConfig: {
        queryStrMap: {
          queryStr: ["/"],
          sectors: ["buid"],
          dataPath: "loggedUserEntity._Result.clientId",
          trailingURL: "/correspondences/1",
        },
      },
    },

    SEARCH_GBP_FOR_LEGALENTITY: {
      SERVICE: "searchGBPForLegalEntity",
      LAYOUT: "",
    },

    GET_LIST_OF_ELIGIBLE_PRODUCTS: {
      SERVICE: "getListOfEligibleProducts",
      LAYOUT: "",
    },

    SUBSCRIBE_THIS_LIST_OF_PRODUCTS: {
      SERVICE: "subscribeThisListOfProducts",
      LAYOUT: "",
    },

    GET_PROCESS: {
      SERVICE: "getProcess",
      LAYOUT: "",
    },
    GET_PRODUCT_DETAILS: {
      SERVICE: "getProductDetails",
      LAYOUT: "ProductSelection",
      RequestConfig: {
        queryStrMap: {
          queryStr: ["/"],
          sectors: ["productBuid"],
          dataPath: "additionalInformation",
          // dataPath: "loggedUserEntity._Result.clientId",
          trailingURL: "",
        },
      },
    },

    GET_COVERED_PERSON_TYPE_CONFIGURATION: {
      SERVICE: "getCoveredPersonTypeConfiguration",
      LAYOUT: "",
    },

    CREATE_OR_UPDATE_INSURED: {
      SERVICE: "createOrUpdateInsured",
      LAYOUT: "",
    },

    DELETE_INSURED: {
      SERVICE: "deleteInsured",
      LAYOUT: "",
    },
    
    SEARCH_EMPLOYEE: { SERVICE: "searchEmployee", LAYOUT: "SearchEmployee" },
    SEARCH_ENROLLMENT: {
      SERVICE: "searchEnrollment",
      LAYOUT: "SearchEnrollment",
    },
    SEARCH_QUOTE: { SERVICE: "searchQuote", LAYOUT: "SearchQuote" },
    QUOTE_LIST: { SERVICE: "searchQuote", LAYOUT: "QuoteList" },
    SEARCH_CLAIMS: { SERVICE: "searchClaims", LAYOUT: "SearchClaims" },
    SEARCH_CLIENT_POLICES: {
      SERVICE: "searchClientPolicies",
      LAYOUT: "SearchClientPolicies",
    },
    SEARCH_INVOICE: {
      SERVICE: "searchforInvoiceHistory",
      LAYOUT: "SearchInvoice",
    },
    VIEW_DISBURSEMENT: {
      SERVICE: "viewDisbursement",
      LAYOUT: "ViewDisbursement",
    },
    VIEW_INVOICE: { SERVICE: "viewInvoice", LAYOUT: "ViewInvoice" },
    VIEW_PAYMENT: { SERVICE: "viewPayment", LAYOUT: "ViewPayment" },
    GET_PAYMENT_DETAILS: {
      SERVICE: "getPaymentDetails",
      LAYOUT: "ViewPayment",
    },
    VIEW_PARTICIPATIONS: {
      SERVICE: "participations",
      LAYOUT: "Participations",
    },
    USER_LEGAL_ENTITIY: {
      SERVICE: "userLegalEntity",
      LAYOUT: "UserLegalEntity",
    },
    ACTOR_FOR_LOGGED_USER: {
      SERVICE: "actorForLoggedUser",
      LAYOUT: "actorForLoggedUser",
    },
    PERSON_WITH_HISTORY: {
      SERVICE: "personWithHistory",
      LAYOUT: "PersonWithHistory",
    },
    USER_BROKER_DETAILS: {
      SERVICE: "userBrokerDetails",
      LAYOUT: "UserBrokerDetails",
    },
    ADDRESS_CHANGE: { SERVICE: "addressChange", LAYOUT: "AddressChange" },
    CLIENT_ADDRESS_CHANGE: {
      SERVICE: "clientAddressChange",
      LAYOUT: "ClientAddressChange",
    },
    PERSON_CORRESPONDENCE_CHANGE: {
      SERVICE: "personCorrespondenceChange",
      LAYOUT: "ContactInformationChange",
    },
    CHANGE_NAME: { SERVICE: "changeName", LAYOUT: "NameChange" },
    GET_THEME: { SERVICE: "getThemes", LAYOUT: "GetThemes" },
    GET_LOGIN_USERNAME: {
      SERVICE: "getLoginUser",
      LAYOUT: "getLoginUser",
      RequestConfig: {
        queryStrMap: {
          queryStr: ["::"],
          sectors: ["loginName"],
          dataPath: "userName",
          trailingURL: "",
        },
      },
    },
    GET_PERSONAL_INFORMATION: {
      SERVICE: "getPersonalInformation",
      LAYOUT: "PersonalInformation",
      // LAYOUT: "EmployeeProfile",
      RequestConfig: {
        queryStrMap: {
          queryStr: ["/"],
          sectors: ["personBuid"],
          dataPath: "additionalInformation",
          // dataPath: "loggedUserEntity._Result.clientId",
          trailingURL: "",
        },
      },
    },
    GET_EMPLOYMENTS: {
      SERVICE: "getEmployments",
      LAYOUT: "getEmployments",
      RequestConfig: {
        queryStrMap: {
          queryStr: ["/"],
          sectors: ["buid"],
          //dataPath: "loggedUserEntity._Result.clientId",
          dataPath: "authReqData",
          trailingURL: "/employments",
        },
      },
    },
    GET_EMPLOYMENT_INFORMATION: {
      SERVICE: "getEmploymentInformation",
      LAYOUT: "EmploymentInformation",
      // LAYOUT: "EmployeeProfile",
      RequestConfig: {
        queryStrMap: {
          queryStr: ["/"],
          sectors: ["employeebuid"],
          dataPath: "additionalInformation",
          trailingURL: "",
        },
      },
    },

    INIT_NEW_ENROLLMENT_PROCESS: {
      SERVICE: "initNewEnrollmentProcess",
      LAYOUT: "",
    },

    UPDATE_EMPLOYEE_INFORMATION: {
      SERVICE: "updateEmployeeInformation",
      LAYOUT: "EmployeeProfile",
      RequestConfig: {
        queryStrMap: {
          queryStr: ["/"],
          sectors: ["buid"],
          dataPath: "loggedUserEntity.data.person.actor",
          trailingURL: "",
        },
      },
    },
    ADD_ALTERNATE_ADDRESS: {
      SERVICE: "addAlternateAddress",
      LAYOUT: "AddAlternateAddress",
    },
    UPDATE_ALTERNATE_ADDRESS: {
      SERVICE: "updateAlternateAddress",
      LAYOUT: "UpdateAlternateAddress",
    },


    ADD_EMPLOYEE_CONFIG: {
      SERVICE: "addEmployeeConfigToDb",
      LAYOUT: "EmployeeConfig",
    },
    ADD_DEPENDENT_CONFIG: {
      SERVICE: "addDependentConfigToDb",
      LAYOUT: "DependentConfig",
    },


    ADD_THEME: { SERVICE: "addThemeToDB", LAYOUT: "Theming" },
    EDIT_THEME: { SERVICE: "editThemeToDB", LAYOUT: "UpdateTheming" },
    ADD_CLIENT: { SERVICE: "addClientToDB", LAYOUT: "Client" },
    CONFIGURE_THEME: {
      SERVICE: "configureThemeToDB",
      LAYOUT: "PortalConfiguration",
    },
    GET_CONFIGURED_THEME: {
      SERVICE: "getConfiguredTheme",
      LAYOUT: "GetThemes",
    },
    GET_AVAILABLE_THEMES: {
      SERVICE: "getAvailableThemeNames",
      LAYOUT: "GetAvailableThems",
    },
    PERSON_CHANGE_NAME: { SERVICE: "personEntity", LAYOUT: "PersonNameChange" },
    BROKER_CHANGE_NAME: { SERVICE: "brokerEntity", LAYOUT: "BrokerNameChange" },
    EMPLOYEE_NAME_CHANGE: {
      SERVICE: "changeEmployeeName",
      LAYOUT: "EmployeeNameChange",
    },
    GBP_LEGAL_ENTITIY: {
      SERVICE: "gbpForLegalEntity",
      LAYOUT: "GbpForLegalEntity",
    },
    ACCEPT_GBP_QUOTE: { SERVICE: "acceptGBPQuote", LAYOUT: "AcceptGBPQuote" },
    CLIENT_CONTRACT_DETAILS: {
      SERVICE: "clientContractDetails",
      LAYOUT: "ClientContractDetails",
    },
    CONTRACT_ENDORSEMENTS: {
      SERVICE: "contractEndorsements",
      LAYOUT: "ContractEndorsements",
    },
    CLIENT_CONTACT_DETAILS: { SERVICE: "", LAYOUT: "ClientContactDetails" },
    CLIENT_PROFILE_MAPPING: {
      SERVICE: "",
      LAYOUT: "ClientProfileMapping",
      DATAOBJ: "loggedUserEntity",
    },
    COMPANY_PROFILE_MAPPING: {
      SERVICE: "",
      LAYOUT: "CompanyProfileMapping",
      DATAOBJ: "loggedUserEntity",
    },

    ADD_THEME_MAPPING: {
      SERVICE: "",
      LAYOUT: "AddThemeMapping",
      DATAOBJ: "loggedUserEntity",
    },
    LOAN_POLICY_DETAILS: {
      SERVICE: "getLoanPolicyDetails",
      LAYOUT: "LoanPolicyDetails",
    },
    LIFE_CONTRACT_DETAILS: {
      SERVICE: "lifeContractDetails",
      LAYOUT: "LifeContractDetails",
    },
    BALANCE_LOAN_AT_DATE: {
      SERVICE: "getPrincipalBalanceForLoanAtDate",
      LAYOUT: "BalanceForLoanAtDate",
    },
    POSSIBLE_ACCOUNTS: {
      SERVICE: "getAllPossibleAccountsForClient",
      LAYOUT: "PossibleAccounts",
    },
    SEARCH_ACCOUNT: {
      SERVICE: "searchAccountOperationsWithCriteria",
      LAYOUT: "SearchAccount",
    },
    POLICY_CHANGE: { SERVICE: "createCustomerContact", LAYOUT: "PolicyChange" },
    MAKE_PAYMENT: { SERVICE: "makePayment", LAYOUT: "MakePayment" },
    BILLS_FOR_INVOICE: {
      SERVICE: "billsForInvoice",
      LAYOUT: "BillsForInvoice",
    },
    VIEW_CUSTOMER_BILLS: { SERVICE: "getbills", LAYOUT: "ViewBills" },
    SEARCH_OPERATIONS: {
      SERVICE: "searchOperations",
      LAYOUT: "SearchOperations",
    },
    UPDATE_CLAIM_NA: {
      SERVICE: "createOrUpdateClaim",
      LAYOUT: "CreateOrUpdateClaim",
    },
    UPDATE_CLAIM: {
      SERVICE: "createOrUpdateClaim",
      LAYOUT: "CreateOrUpdateClaim",
    },
    ADD_BANK_ACCOUNT: { SERVICE: "addBankAccount", LAYOUT: "AddBankAccount" },
    VIEW_CLAIM_DETAILS: {
      SERVICE: "viewClaimDetails",
      LAYOUT: "ViewClaimDetails",
    },
    ACTOR_CONTACT_HISTORY: {
      SERVICE: "searchActorContactHistory",
      LAYOUT: "ActorContactHistory",
    },
    BANK_DETAILS_FROM_RN: {
      SERVICE: "getBankDetailsUsingRoutingNumber",
      LAYOUT: "BankDetailsFromRN",
      RequestConfig: {
        queryStrMap: {
          queryStr: ["rn"],
          sectors: ["routingNumber"],
          dataPath: "values.AddBankAccount",
        },
      },
    },
    GET_DOC_FOR_CLAIM: {
      SERVICE: "getDocumentsForClaim",
      LAYOUT: "GetDocumentsForClaim",
      ResposeConfig: {
        regConfig: /,"contentAsText":".*","extension":/gi,
      },
    },
    GET_DOC_REQ_CONT_FOR_CLAIM: {
      SERVICE: "getDocumentRequestsContainerForClaim",
      LAYOUT: "DocReqContainerForClaim",
    },
    DOC_FOR_CLAIM_ENDORSEMENT: {
      SERVICE: "getDocumentForClaimEndorsement",
      LAYOUT: "DocForClaimEndorsement",
    },
    LOG_OFF: { SERVICE: "logoff", LAYOUT: "LogOff" },
    RECAPTCHA_VALIDATOR: {
      SERVICE: "recaptchaValidator",
      LAYOUT: "",
      RequestConfig: {
        queryStrMap: {
          queryStr: [],
          sectors: ["secret", "response"],
          dataPath: ["values.secret", "values.response"],
          trailingURL: "",
        },
      },
    },




     
   //portal Edge constants to get all the employee details config using layout
   GET_CLIENT_BY_CLIENT_ID: {
    SERVICE: "getClientByIdFromDb",
    LAYOUT: "EmployeeConfig",
    RequestConfig: {
      
        queryStrMap: {
          queryStr: ["/"],
          sectors: ["clientId"],
          //dataPath: "loggedUserEntity._Result.clientId",
          dataPath: "additionalInformation",
          trailingURL: "",
        },
      },
    },


   //portal Edge constants to get all the dependent Information details config using layout
   GET_DEPENDENT_INFO_CLIENT_ID: {
    SERVICE: "getDependentInfoFromDb",
    LAYOUT: "DependentConfig",
    RequestConfig: {
      
        queryStrMap: {
          queryStr: ["/"],
          sectors: ["clientId"],
          //dataPath: "loggedUserEntity._Result.clientId",
          dataPath: "additionalInformation",
          trailingURL: "",
        },
      },
    },



//portal Edge constants submit all the employee details config using layout
  CREATE_CLIENT: { SERVICE: "createClientIntoDb", LAYOUT: "EmployeeConfig" },

  //portal Edge constants submit all the dependent details config using layout
  CREATE_CLIENT_DEPENDENT: { SERVICE: "createClientIntoDbDependent", LAYOUT: "DependentConfig" },
  
  // GET_EMPLOYMENTS: {
  //   SERVICE: "getEmployments",
  //   LAYOUT: "getEmployments",
  //   RequestConfig: {
  //     queryStrMap: {
  //       queryStr: ["/"],
  //       sectors: ["clientId"],
  //       //dataPath: "loggedUserEntity._Result.clientId",
  //       dataPath: "authReqData",
  //       trailingURL: "",
  //     },
  //   },
  // },

        //portal lege constants
        ADD_CLIENT_DATA: { SERVICE: "addClientData", LAYOUT: "" },
       // GET_CLIENT_BY_CLIENT_ID: { SERVICE: "getClientByIdFromDb", LAYOUT: "" },
        GET_ALL_CLIENT_DATA:{ SERVICE: "getAllClientDataFromDb", LAYOUT: "" },
        GET_CLIENT_DATA_BY_ID:{ SERVICE: "getClientDataByIdFromDb", LAYOUT: "" },
        ADD_CLIENT_INFO:{ SERVICE: "addClientInfoToDb", LAYOUT: "" },
        EDIT_CLIENT_INFO_BY_ID: { SERVICE: "editClientDataInDb", LAYOUT: "" },
        DELETE_CLIENT_INFO_BY_ID:{ SERVICE: "deleteClientDataInDb", LAYOUT: "" },
        GET_ALL_COMMUNICATION_DATA: { SERVICE: "getAllCommunicationDataFromDb", LAYOUT: "" },
        GET_COMMUNICATION_DATA_BY_ID: { SERVICE: "getCommunicationDataByIdFromDb", LAYOUT: "" },
        ADD_COMMUNICATION_INFO: { SERVICE: "addCommunicationInfoToDb", LAYOUT: "" },
        EDIT_COMMUNICATION_INFO_BY_ID:{ SERVICE: "editCommunicationDataFromDb", LAYOUT: "" },
        DELETE_COMMUNICATION_INFO_BY_ID:{ SERVICE: "deleteCommunicationDataFromDb", LAYOUT: "" },
        GET_ALL_CONTACT_DATA: { SERVICE: "getAllContactDataFromDb", LAYOUT: "" },
        GET_CONTACT_DATA_BY_ID:{ SERVICE: "getContactDataByIdFromDb", LAYOUT: "" },
        ADD_CONTACT_INFO:{ SERVICE: "addContactInfoToDb", LAYOUT: "" },
        EDIT_CONTACT_INFO_BY_ID:{ SERVICE: "editContactDataFromDb", LAYOUT: "" },
        DELETE_CONTACT_INFO_BY_ID:{ SERVICE: "deleteContactDataFromDb", LAYOUT: "" },
        GET_ALL_EMPLOYMENT_DATA:{ SERVICE: "getAllEmploymentDataFromDb", LAYOUT: "" },
        GET_EMPLOYMENT_DATA_BY_ID:{ SERVICE: "getEmploymentDataByIdFromDb", LAYOUT: "" },
        ADD_EMPLOYMENT_INFO:{ SERVICE: "addEmploymentInfoToDb", LAYOUT: "" },
        EDIT_EMPLOYMENT_INFO_BY_ID:{ SERVICE: "editEmploymentDataFromDb", LAYOUT: "" },
        DELETE_EMPLOYMENT_INFO_BY_ID:{ SERVICE: "deleteEmploymentDataFromDb", LAYOUT: "" },
        GET_ALL_PERSONAL_DATA:{ SERVICE: "getAllPersonalDataFromDb", LAYOUT: "" },
        GET_PERSONAL_DATA_BY_ID:{ SERVICE: "getPersonalDataByIdFromDb", LAYOUT: "" },
        ADD_PERSONAL_INFO:{ SERVICE: "addPersonalInfoToDb", LAYOUT: "" },
        EDIT_PERSONAL_INFO_BY_ID:{ SERVICE: "editPersonalDataFromDb", LAYOUT: "" },
        DELETE_PERSONAL_INFO_BY_ID:{ SERVICE: "deletePersonalDataFromDb", LAYOUT: "" },
        ADD_EMPLOYEE_MFA_DATA: { SERVICE: "", LAYOUT: "AddUserRegistration" },
        // ADD_EMPLOYEE_MFA_DATA: { SERVICE: "addEmployeeMFAData", LAYOUT: "AddUserRegistration" },

  },
};
