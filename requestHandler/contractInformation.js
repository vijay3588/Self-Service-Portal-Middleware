const fs = require("fs");
const config = require("../appConfig/appConfig");
const serviceHelper = require("../utils/helpers/serviceHelper");
const constants = require('../utils/constants/apiConstants');
const payloadCreator = require("../creator/payloadCreator");
const responseCreator = require("../creator/responseCreator");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const requestCreator = require('../creator/requestCreator');

const getContractInformationDetails = async (req, res) => {
  try {
    let reqUserInfo = jsonHelper.reqUserInfo(req.headers);
    let requestBody = payloadCreator.createPayload(
      req,
      "ContractInformation",
      reqUserInfo
    );
    let requestInfo = requestCreator.createRequest(
      "contractDetails",
      req.headers,
      true
    );
    let response = await serviceHelper.requestMaker(requestBody, requestInfo);
    let layoutObj = {
      prodAndCoverage: { dataType: "object", name: "prodAndCoverage" },
      billDescInformation: { dataType: "object", name: "billDescInformation" },
    };
    let ListCardData = [];
    if (response) {
      let userLayoutsFolder = reqUserInfo.split("/");
      if (userLayoutsFolder.length > 1) {
        userLayoutsFolder =
          "../../segments/layoutsSegment" + "/" + userLayoutsFolder[1];
      }
      ListCardData = responseCreator.createResponse(
        response,
        "ContractInformation",
        layoutObj,
        reqUserInfo,
        userLayoutsFolder
      );
    }

    //fs.writeFileSync("Response_ListCardData.json", JSON.stringify(ListCardData));
    //fs.writeFileSync("Response_Data.json", JSON.stringify(response));

    if (response) {
      var result = response || {};
      var policyInformation =
        (result.policyInformationHistories &&
          result.policyInformationHistories[0] &&
          result.policyInformationHistories[0].policyInformation) ||
        {};
      var enrollmentPeriods =
        (result.enrollmentPeriods && result.enrollmentPeriods[0]) || {};
      var coverageGeneralInformation =
        result.subscribedEntitiesHistories &&
        result.subscribedEntitiesHistories[0].coverages
          ? result.subscribedEntitiesHistories[0].coverages[0]
              .coverageGeneralInformation
          : [];
      var coveredDivisions = result.coveredDivisions;

      var participationData =
        result.subscribedEntitiesHistories &&
        result.subscribedEntitiesHistories[0].coverages &&
        result.subscribedEntitiesHistories[0].coverages[0].participationData &&
        result.subscribedEntitiesHistories[0].coverages[0]
          .participationData[0] &&
        result.subscribedEntitiesHistories[0].coverages[0].participationData[0]
          .participationDataInformation
          ? result.subscribedEntitiesHistories[0].coverages[0]
              .participationData[0].participationDataInformation
          : {};

      var listCard = [];

      var memberClass = [];
      var memberClassCount = "";
      var divisions = [];
      var divisionsCount = "";
      var products = [];
      var participationChartData = [];

      result.policyInformationHistories &&
        result.policyInformationHistories.forEach((policyInfo) => {
          if (
            policyInfo.policyInformation &&
            policyInfo.policyInformation &&
            policyInfo.policyInformation.productCode &&
            policyInfo.policyInformation.productCode.productIdentifier
          ) {
            products.push(
              policyInfo.policyInformation.productCode.productIdentifier
                .productCode
            );
          }
        });

      participationChartData.push(participationData.requiredParticipation);
      participationChartData.push(participationData.actualParticipationNumber);
      participationChartData.push(participationData.currentParticipationNumber);
      var participationChart = {
        labels: [
          "Required Participation",
          "Actual Participation",
          "Current Participation",
        ],
        datasets: [
          {
            backgroundColor: ["#58c2d5", "#9c799b", "#67a28a"],
            data: participationChartData,
          },
        ],
      };

      if (
        policyInformation.memberClasses &&
        policyInformation.memberClasses.length > 0
      ) {
        memberClassCount = `(` + policyInformation.memberClasses.length + `)`;
        var members = policyInformation.memberClasses;

        for (var i = 0; i < members.length; i++) {
          var member = members[i] || {};
          var part = {
            code: member.fieldCode || "",
            className: member.fieldValue || "",
            effectiveDate: member.effectiveDate || "",
            endDate: member.endDate || "",
          };
          memberClass.push(part);
        }
      }

      if (coveredDivisions && coveredDivisions.length > 0) {
        divisionsCount = `(` + coveredDivisions.length + `)`;

        for (var i = 0; i < coveredDivisions.length; i++) {
          var coverage = coveredDivisions[i] || {};
          var address =
            (coveredDivisions[i].correspondences &&
              coveredDivisions[i].correspondences.length > 0 &&
              coveredDivisions[i].correspondences[0] &&
              coveredDivisions[i].correspondences[0].address) ||
            {};
          var part = {
            effectiveDate: coverage.effectiveDate || "",
            name: (coverage.entityId && coverage.entityId.clientFullName) || "",
            code: coverage.name || "",
            /*  address : `${address.lineOne ? `${address.lineOne}, ` : ''}${address.lineTwo ? `${address.lineTwo}, ` : ''}${ ( address.zipCodeAndCity && address.zipCodeAndCity.city) ? `${address.zipCodeAndCity.city}, ` : '' }${address.state ? `${address.state} ` : ''}${( address.zipCodeAndCity && address.zipCodeAndCity.zipCode ) ? `${address.zipCodeAndCity.zipCode}, ` : ''}${address.country || ''}`, */
          };
          divisions.push(part);
        }
      }

      var billsTable = [];
      var invoicedAmount = "";
      var pastDueAmount = "";
      var paymentsCredits = "";
      var currentAmountDue = "";
      var finalResult = { tablesCard: {} };
      let data = JSON.stringify(result);
      if (result.payments && result.payments.length > 0) {
        for (var i = 0; i < result.payments.length; i++) {
          var payment = result.payments[i] || {};

          if (payment.grossAmount && payment.grossAmount.amount)
            paymentsCredits = paymentsCredits + payment.grossAmount.amount;

          var parts = {
            amountPaid:
              (payment.grossAmount && payment.grossAmount.amount) || "",
            paymentNumber: payment.operation || "",
            receivedDate: payment.receivedDate || "",
          };
          paymentsTable.push(parts);
        }

        Object.assign(finalResult.tablesCard, { Payments: paymentsTable });
      }

      if (result.bills && result.bills.length > 0) {
        for (var i = 0; i < result.bills.length; i++) {
          var bill = result.bills[i] || {};
          if (bill.amount && bill.amount.amount)
            invoicedAmount = invoicedAmount + bill.amount.amount;

          var parts = {
            billNumber: bill.billNumber || "",
            amount: (bill.amount && bill.amount.amount) || "",
            fromDate: bill.fromDate || "",
            toDate: bill.toDate || "",
            contractNumber: bill.contractNumber || "",
          };
          billsTable.push(parts);
        }
        Object.assign(finalResult.tablesCard, { Bills: billsTable });
      }

      if (result.pastDueBills && result.pastDueBills.length > 0) {
        for (var i = 0; i < result.pastDueBills.length; i++) {
          var pastbill = result.pastDueBills[i] || {};

          if (pastbill.amount && pastbill.amount.amount)
            pastDueAmount = pastDueAmount + pastbill.amount.amount;
          var parts = {
            billNumber: pastbill.billNumber || "",
            amount: (pastbill.amount && pastbill.amount.amount) || "",
            fromDate: pastbill.fromDate || "",
            toDate: pastbill.toDate || "",
            contractNumber: pastbill.contractNumber || "",
            pastBill: true,
          };
          billsTable.push(parts);
        }
        Object.assign(finalResult.tablesCard, { Bills: billsTable });
      }
      // currentAmountDue and paymentsCredits are same
      currentAmountDue = paymentsCredits;

      var enrollmentPeriodsInfo = [];
      enrollmentPeriodsInfo.push({
        effectiveDate: enrollmentPeriods.effectiveDate || "",
        enrollmentPeriodKind: enrollmentPeriods.enrollmentPeriodKind || "",
        endDate: enrollmentPeriods.endDate || "",
      });

      Object.assign(finalResult, {
        viewHeader: {
          paymentNumber:
            (result.policyNumber &&
              result.policyNumber &&
              result.policyNumber.internalPolicyIdentifier &&
              "Contract Number " +
                result.policyNumber.internalPolicyIdentifier
                  .internalPolicyId) ||
            "",
          paymentStatus: policyInformation.status || "",
        },
        blueBox: {
          effectiveDate: enrollmentPeriods.effectiveDate || "",
          signatureDate: policyInformation.signatureDate || "",
          termOrRenewalDate: policyInformation.termOrRenewalDate || "",
          enrollmentPeriodKind: enrollmentPeriods.enrollmentPeriodKind || "",
          endDate: enrollmentPeriods.endDate || "",
        },
        disbursementCard: {
          effectiveDate: enrollmentPeriods.effectiveDate || "",
          termOrRenewalDate: policyInformation.termOrRenewalDate || "",
          products: products,
        },

        listCard: ListCardData,
        memberClass: memberClass,
        memberClassCount: memberClassCount,
        divisions: divisions,
        divisionsCount: divisionsCount,
        enrollmentPeriods: enrollmentPeriodsInfo,
        applicationEnrollmentPeriods:
          policyInformation.authorizedEnrollmentPeriods || [],
        situsState:
          (policyInformation.residenceStateCode &&
            policyInformation.residenceStateCode.stateName) ||
          "",
        groupSize: policyInformation.groupSize || "",
        participationChart: participationChart,
      });
      //fs.writeFileSync("requestBody.json", JSON.stringify(finalResult));
      res.json(finalResult);
    } else {
      res.json(response);
    }
  } catch (error) {
  //  console.log(error)
  }
};


module.exports = { getContractInformationDetails };
