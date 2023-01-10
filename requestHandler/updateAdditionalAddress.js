const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const requestProcessor = require("../processor/requestProcessor");
const {
  getBankDetailsUsingRoutingNumber,
  loanReimbursementEndorsement,
} = require("../utils/constants/apiConstants");

const updateAdditionalAddress = async (req, res) => {
  let sample = {
    addressLine1: "123 blvd",
    addressline2: "123",
    city: "beach",
    state: "NJ",
    country: "USA",
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  if (req?.body) {
    let buid = req.body.loggedUserEntity.data.person.bUID;
    let email = req.body.loggedUserEntity.data.person.correspondences[0].eMail;
    let payload = req.body.data.EmployeeProfile;

    let sampleReqObj = {
      effectiveDate: today,
      addressUsage: "2",
      address: {
        county: "",
        fIPSCode: 0,
        state: payload.alternateAddressState,
        line1: payload.alternateAddressLine1,
        line2: payload.alternateAddressLine2,
        zipCodeAndCity: {
          zipCode: payload.alternateAddressZipCode,
          city: payload.alternateAddressCity,
        },
        country: payload.alternateAddressCountry,
        district: "",

        className: "aSPCB_US_PostalAddress",
      },
      isDefaultCorrespondance: false,
      privatePhone: "",
      privatePhoneExtension: "",
      officePhone: "",
      officePhoneExtension: "",
      cellPhone: "",
      fax: "",
      eMail: email,
      mediaType: "Email",
      isInvalid: false,
      reasonForInvalidAddress: "",
      buid: buid,
      className: "aSPCB_Correspondence",
    };

    try {
      return requestProcessor.request(
        sampleReqObj,
        res,
        constants.SERVICE_REQUEST.UPDATE_ADDITIONAL_ADDRESS,
        req.headers,
        jsonHelper.reqUserInfo(req.headers)
      );
    } catch (error) {
      logger.logCreator().error(error);
      logger
        .logCreator()
        .trace("Error at addEmployees function in addEmployees file");
      res.json(null);
    }
  }
};

module.exports = { updateAdditionalAddress };
