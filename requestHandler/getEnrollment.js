const config = require('../appConfig/appConfig');
const serviceHelper = require('../utils/helpers/serviceHelper');
const constants = require('../utils/constants/apiConstants');
const requestCreator = require('../creator/requestCreator');

//const fs = require("fs");
const getEnrollment = async (req, res) => {
  var loggedUserEntity = req.body.loggedUserEntity;
  var formValues = req.body.values && req.body.formValues || {};

  let {EmployeeSearch ={}, DivisionSelection = {}} =  formValues;

  let {contractNumber} = DivisionSelection || {};
  let { employeeBuid , legalEntityBuid , personBuid} =  EmployeeSearch.SearchForAnEmployee || {}
  var requestBody = {};
 // requestBody.enrollmentData["subscriberBuid"] = personBuid;
 // requestBody.enrollmentData["employee"].searchEmployee.buid = employeeBuid;
 // requestBody.enrollmentData["employee"].searchEmployee.personId.buid = personBuid;
 // requestBody.enrollmentData["employee"].searchEmployee.legalEntityId.buid = legalEntityBuid;
 // requestBody.enrollmentData["gBPId"].buid = contractNumber;
 // requestBody.enrollmentData["subscriptionDate"] = 
 // requestBody.enrollmentData["signatureDate"] = 
 // requestBody.enrollmentData["insured"][0].insuredInformation.clientId.buid = personBuid;
  //requestBody.enrollmentData["insured"][0].insured.searchPerson.buid = personBuid;
  
  //fs.writeFileSync("requestBody.json", JSON.stringify(requestBody));
  let requestInfo = requestCreator.createRequest("getEnrollment", req.headers, true);
	let response = await serviceHelper.requestMaker(requestBody, requestInfo);
  let products= [];
  if(response && response["_Result"] &&  response["_Result"].productChoices) {
    let  currentProduct = {id: '', value: "", isChecked: false}
    response["_Result"].productChoices.map((product,index)=>{
      currentProduct.id = index,
      currentProduct.value = product.product.name;
      products= [...products, currentProduct]
    })
    
  }
  res.json(products);
};

module.exports = { getEnrollment }
