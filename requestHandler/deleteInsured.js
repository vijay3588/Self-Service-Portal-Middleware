const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const requestProcessor = require("../processor/requestProcessor");

const deleteInsured = async (req, res) => {
  let processBUID = "";
  if (req?.body?.storeFromRedux?.process?.enrollmentProcess.length > 0) {
    processBUID =  req?.body?.storeFromRedux?.process?.enrollmentProcess[0][0]?._Result.processEntity.buid;
  }
  // const example = "318845262_377";
  if (req?.body) {
    const dependentBUID = req.body.dependentBuid;    
    const sampleReqObj = {
      EnrollmentProcessIdentifier: {
        className: "aSPF_Identifier",
        bUID: processBUID,
      },

      InsuredIdentifier: {
        className: "aSPF_Identifier",
        bUID: dependentBUID,
      },
    };

    try {
      return requestProcessor.request(
        sampleReqObj,
        res,
        constants.SERVICE_REQUEST.DELETE_INSURED,
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

module.exports = { deleteInsured };
