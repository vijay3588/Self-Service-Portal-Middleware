const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const requestProcessor = require("../processor/requestProcessor");
const {
  getBankDetailsUsingRoutingNumber,
  loanReimbursementEndorsement,
} = require("../utils/constants/apiConstants");

const sendMFAEmail = async (req, res) => {

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
    const responseObj = {
        'response': {testOperation: "/sign-up/send-email-challenge called sccessfully..........."},
    };
    try {
         return await requestProcessor.request(
          responseObj,
          res,
          constants.SERVICE_REQUEST.ADD_EMPLOYEE_MFA_DATA,
          req.headers,
          jsonHelper.reqUserInfo(req.headers),
          true,
          true,
        );

        //return responseObj
      } catch (error) {
        logger.logCreator().error(error);
        logger
          .logCreator()
          .trace("Error at sendMFAEmail");
        res.json(null);
      }
}
};

module.exports = { sendMFAEmail };
