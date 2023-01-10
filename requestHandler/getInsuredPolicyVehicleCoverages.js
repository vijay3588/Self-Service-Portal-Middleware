const serviceHelper = require('../utils/helpers/serviceHelper');
const responseCreator = require("../creator/responseCreator");
const { jsonHelper } = require("../utils/helpers/jsonHelper");

const getInsuredPolicyVehicleCoverages = async (req, res) => {

    let headers = {
		'Content-Type': 'application/json'
	};
	let param = req.body.insured || "1";

	//let newBaseURI = "http://localhost:6000";
	//let URL = newBaseURI +"/getInsuredPolicyVehicleCoverages/"+param;

    
	//let response = await serviceHelper.request(URL, "GET", null, headers);
    let response = "";
    let hardCodedResp={
        "success": true,
        "data": {
            "insuredInformation": {
                "insid": 1,
                "firstname": "Pricro",
                "lastname": "Averlin",
                "gender": "Female",
                "dateofbirth": "1992-09-29",
                "line1": "Line1",
                "city": "new city1",
                "state": "NY",
                "zipcode": "10101"
            },
            "policyInformation": [
                {
                    "policy_id": "policy1",
                    "reference": "ref 1",
                    "insured": 1,
                    "effectivedate": "2021-01-31",
                    "premium": "5000",
                    "vehiclesCovered": [
                        {
                            "vehicle": "VF1",
                            "vehicleInformation": {
                                "vehicleId": "VF1",
                                "make": "Ford",
                                "model": "Prius",
                                "year": 2021
                            },
                            "coverageList": [
                                {
                                    "coverage_id": "coverage1",
                                    "coverage_name": "Collision",
                                    "deductible": "300",
                                    "coverage_limit": "100000",
                                    "coverage_premium": "750"
                                },
                                {
                                    "coverage_id": "coverage2",
                                    "coverage_name": "Comprehensive",
                                    "deductible": "500",
                                    "coverage_limit": "200000",
                                    "coverage_premium": "1200"
                                }
                            ]
                        },
                        {
                            "vehicle": "VT1",
                            "vehicleInformation": {
                                "vehicleId": "VT1",
                                "make": "Toyota",
                                "model": "Escape",
                                "year": 2019
                            },
                            "coverageList": [
                                {
                                    "coverage_id": "coverage1",
                                    "coverage_name": "Collision",
                                    "deductible": "300",
                                    "coverage_limit": "100000",
                                    "coverage_premium": "750"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    if(!response.data){
        response=hardCodedResp
    }

    let layoutObj = {
        "insuredInformation": {"dataType": "object", "name": "insuredInformation" },
        "policyInformation": {"dataType": "object", "name": "policyInformation" }
      }
    let reqUserInfo= jsonHelper.reqUserInfo(req.headers)
    let userLayoutsFolder = "../../segments/layoutsSegment/Outer";
    
    
    response = responseCreator.createResponse(response, 
        "PnC", 
        layoutObj, 
        reqUserInfo, 
        userLayoutsFolder );

	res.json(response);
};

module.exports = { getInsuredPolicyVehicleCoverages };
