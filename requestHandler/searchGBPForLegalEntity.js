const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const requestProcessor = require("../processor/requestProcessor");
const {
  getBankDetailsUsingRoutingNumber,
  loanReimbursementEndorsement,
} = require("../utils/constants/apiConstants");

const searchGBPForLegalEntity = async (req, res) => {
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
    let payload = req?.body?.additionalInformation;
    let sampleReqObj = {
      legalEntityBuid: payload?.legalEntityBuid,
      maxSize: 4,
    };

    try {
      return requestProcessor.request(
        sampleReqObj,
        res,
        constants.SERVICE_REQUEST.SEARCH_GBP_FOR_LEGALENTITY,
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

module.exports = { searchGBPForLegalEntity };
