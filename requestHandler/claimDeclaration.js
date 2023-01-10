const config = require('../appConfig/appConfig');
const serviceHelper = require('../utils/helpers/serviceHelper');
const constants = require('../utils/constants/apiConstants');
const requestCreator = require('../creator/requestCreator');

const fs = require('fs');
const claimDeclaration = async (req, res) => {
	var formValues = req.body.values || {};
	let { claimBuid, uploadedFiles } = formValues.Vouchers;
	let uploadedDocuments = [];
    let uploadedFileKeys = Object.keys(uploadedFiles); 
	if (uploadedFileKeys && uploadedFileKeys.length > 0) {
		uploadedFileKeys.forEach((curFilesBUID) => {
			if (uploadedFiles[curFilesBUID].files && 
				uploadedFiles[curFilesBUID].files.length > 0) {
				uploadedFiles[curFilesBUID].files.forEach((element) => {
					let extFileName= element.file && element.file.path?element.file.path.substr(0,element.file.path.lastIndexOf('.')):"test";
					let extFileExtn= element.file && element.file.path?(element.file.path.substr(0,element.file.path.lastIndexOf('.')),element.file.path.substr(element.file.path.lastIndexOf('.')+1,element.file.path.length)):"pdf";
					let fileInfo = {
						FileName: extFileName,
						Content: element.processedFileContent,
						FileExtension: "."+extFileExtn,
						DocumentDesc: {
							BUID: curFilesBUID,
						},
					};
					uploadedDocuments = [...uploadedDocuments, fileInfo];
				});
			}
		});
	}
	let requestBody = {
		ObjectBUID: claimBuid || '',
		UploadedDocuments: uploadedDocuments
	};
    
  //fs.writeFileSync("claim Dec req", JSON.stringify(requestBody));
  let requestInfo = requestCreator.createRequest("claimDeclaration", req.headers, true);
  let response = await serviceHelper.requestMaker(requestBody, requestInfo);

	res.json(response);
};

module.exports = { claimDeclaration };
