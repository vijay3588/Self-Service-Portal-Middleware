const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const requestProcessor = require("../processor/requestProcessor");
const {
  getBankDetailsUsingRoutingNumber,
  loanReimbursementEndorsement,
} = require("../utils/constants/apiConstants");

const createOrUpdateInsured = async (req, res) => {
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

  today = yyyy + "-" + mm + "-" + dd;

  if (req?.body) {
    let buid = req.body.loggedUserEntity.data.person.bUID;
    let email = req.body.loggedUserEntity.data.person.correspondences[0].eMail;
    let payload = req.body.data.DependentInformation;
    let processBUID = "";
    if (req?.body?.currentReduxState?.process?.enrollmentProcess.length > 0) {
      processBUID =  req?.body?.currentReduxState?.process?.enrollmentProcess[0][0]?._Result
        .processEntity.buid;
    }
    const insuredBUID = (payload && payload.editDependentBUID) || "" ;
    // const exampleBuid = "318845262_377";
    
    const personTitle = {
      "gFemale": "ptMrs",
      "gMale": "ptMr"
    };

    const additionalOptions = [];
    if ( payload.dependentFullTimeStudent === "yes") {
      additionalOptions.push(
        {
          "valueCode": "",
          "fieldValue": "",
          "nameDescription": "",
          "fieldCode": "DD_00029",
          "fieldName": "ISCHFTSTUDENT",
          "codeForPopulationClass": "",
          "buid": "",
          "className": "aSPCB_ClassificationValue"
        }
      );
    }

    if (payload.dependentDisabled === "yes") {
      additionalOptions.push(
        {
          "valueCode": "",
          "fieldValue": "",
          "nameDescription": "",
          "fieldCode": "DD_00030",
          "fieldName": "ISCHDISABLED",
          "codeForPopulationClass": "",
          "buid": "",
          "className": "aSPCB_ClassificationValue"
        }
      );
    }

    const newObject = {
      "EnrollmentProcessIdentifier": {
        "className": "aSPF_Identifier",
        "bUID": processBUID
      },
      "Insured": {
        "className": "aSPLI_InsuredData",
        "insured": {
          "className": "aSPLI_InsuredInfo",
          "mainOwnerRelationshipToInsured": payload.dependentRelationship,
          "insuredTerminationReason": null,
          "terminationDate": null,
          "additionalData": additionalOptions,
          "buid": insuredBUID
        },
        "person": {
          "data": {
            "className": "aSPLI_PersonData",
            "actor": {
              "className": "aSPLI_Person",
              "personTitleEnum": personTitle[payload.dependentGender],
              "priorName": payload.dependentFirstName,
              "middleName1": payload.dependentMiddleName,
              "middleName2": payload.dependentLastName,
              "nameSuffix": "De",
              "gender": payload.dependentGender,
              "sSN": payload.SSN,
              "maritalStatus": "meMarried",
              "attachedToAnOtherSSN": false,
              "nationality": "USA",
              "birthCountry": "USA",
              "birthPlaceCity": "Northampton",
              "birthPlaceZipCode": "1060",
              "birthPlaceState": "AL",
              "occupation": "Doctor",
              "oldSSN": "",
              "oldLastName": "",
              "oldFirstname": "",
              "oldDOB": null,
              "isIncapableAdult": false,
              "isEmancipatedMinor": false,
              "birthDate": payload.dependentBirthDate,
              "delinquent": false,
              "underSurveillance": false,
              "isAnonymous": false,
              "name": payload.dependentLastName,
              "shortName": payload.dependentFirstName,
              "creationDate": today,
              "preferredLanguageCode": "En",
              "terminationDate": null,
              "preferredContactChoice": "pcDefaultCorrespondence",
              "preferredCurrency": "USD"
            },
            "externalClientId": "",
            "thirdPartyId": "FO",
            "correspondences": [{
              "className": "aSPCB_Correspondence",
              "effectiveDate": today,
              "addressUsage": "0",
              "address": {
                "className": "aSPCB_PostalAddressWithState",
                "state": payload.dependentState,
                "line1": payload.dependentAddressLine1,
                "line2": payload.dependentAddressLine2,
                "zipCodeAndCity": {
                  "zipCode": payload.dependentZipCode,
                  "city": payload.dependentCity
                },
                "country": payload.dependentCountry,
                "district": ""
              },
              "isDefaultCorrespondance": true,
              "privatePhone": "",
              "privatePhoneExtension": "",
              "officePhone": "",
              "officePhoneExtension": "",
              "cellPhone": "",
              "fax": "",
              "eMail": "",
              "mediaType": "",
              "isInvalid": false,
              "reasonForInvalidAddress": ""
            }],
            "actorDataExtension": null,
            "bUID": "",
            "dataHistory": []
          }
        },
        "bUID": insuredBUID,
        "date": today
      }
    };

    try {
      return requestProcessor.request(
        newObject,
        res,
        constants.SERVICE_REQUEST.CREATE_OR_UPDATE_INSURED,
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

module.exports = { createOrUpdateInsured };
