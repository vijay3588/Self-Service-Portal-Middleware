const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const requestProcessor = require("../processor/requestProcessor");
const {
  getBankDetailsUsingRoutingNumber,
  loanReimbursementEndorsement,
} = require("../utils/constants/apiConstants");

const subscribeThisListOfProducts = async (req, res) => {
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
    let processBUID = req?.body?.values?.ProductSelection?.payLoadObject[0]?.
    productListArrayValues
    ?.enrollmentProcess[0]?.[0]?._Result?. bUID;
    // let processBUID = req?.body?.payload?.processBuid;
    // let productData = req?.body?.payload?.data;
    let productData = req?.body?.values?.ProductSelection?.payLoadObject[0]?.
    productListArrayValues
    ?.selectedProductList;
    let sampleReqObj = {
      EnrollmentProcessIdentifier: {
        className: "aSPF_Identifier",
        bUID: processBUID,
      },
      listOfProductIdentifiers: productData,
    };
    try {
      return requestProcessor.request(
        sampleReqObj,
        res,
        constants.SERVICE_REQUEST.SUBSCRIBE_THIS_LIST_OF_PRODUCTS,
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

module.exports = { subscribeThisListOfProducts };
