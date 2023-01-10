const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const requestProcessor = require("../processor/requestProcessor");
const {
  getBankDetailsUsingRoutingNumber,
  loanReimbursementEndorsement,
} = require("../utils/constants/apiConstants");

const initNewEnrollmentProcess = async (req, res) => {
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
    let employeebuid = req?.body?.payload?.employeeBuid;
    let contractBuid = req?.body?.payload?.contractBuid;
    let sampleReqObj = {
      gBPIdentifier: {
        className: "aSPLI_GBPIdentifier",
        bUID: contractBuid,
      },

      employeeIdentifier: {
        className: "aSPLI_EmployeeIdentifier",
        bUID: employeebuid,
      },
    };

    try {
      return requestProcessor.request(
        sampleReqObj,
        res,
        constants.SERVICE_REQUEST.INIT_NEW_ENROLLMENT_PROCESS,
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

module.exports = { initNewEnrollmentProcess };
