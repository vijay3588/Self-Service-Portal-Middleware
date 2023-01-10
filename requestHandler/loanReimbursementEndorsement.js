const config = require('../appConfig/appConfig');
const serviceHelper = require('../utils/helpers/serviceHelper');
const constants = require('../utils/constants/apiConstants');
const requestCreator = require('../creator/requestCreator');

const loanReimbursementEndorsement = async (req, res) => {
	var values = req.body.values || {};

	var values = req.body.values || {};
	let { internalPolicyId, effectiveDate = '' } =
		(values.additionalValues &&
			values.additionalValues.LoanSelection &&
			values.additionalValues.LoanSelection.contractDetails) ||
		{};

	let { loanBuid, loanType } =
		(values.additionalValues &&
			values.additionalValues.LoanSelection &&
			values.additionalValues.LoanSelection.loanDetails &&
			values.additionalValues.LoanSelection.loanDetails.length > 0 &&
			values.additionalValues.LoanSelection.loanDetails[0]) ||
		{};

	let { fullReimbursment, redemptionAmount, uploadedFiles } = values.BuyBack;

	if (fullReimbursment) {
		redemptionAmount = 0;
	}

	if (redemptionAmount) {
		redemptionAmount = parseFloat(redemptionAmount.replace(/,/g, '.').replace(/\s/g, '').replace(/€/g, '')).toFixed(
			2
		);
	}
	let uploadedDocuments = [];
	let uploadedFileKeys = Object.keys(uploadedFiles);
	if (uploadedFileKeys && uploadedFileKeys.length > 0) {
		uploadedFileKeys.forEach((curFilesBUID) => {
			if (uploadedFiles[curFilesBUID].files && uploadedFiles[curFilesBUID].files.length > 0) {
				uploadedFiles[curFilesBUID].files.forEach((element) => {
					let extFileName =
						element.file && element.file.path
							? element.file.path.substr(0, element.file.path.lastIndexOf('.'))
							: 'test';
					let extFileExtn =
						element.file && element.file.path
							? (element.file.path.substr(0, element.file.path.lastIndexOf('.')),
							  element.file.path.substr(
									element.file.path.lastIndexOf('.') + 1,
									element.file.path.length
							  ))
							: 'pdf';
					let fileInfo = {
						FileName: uploadedFiles.fileName || 'test',
						code: uploadedFiles.code,
						Content: element.processedFileContent,
						FileExtension: '.' + extFileExtn,
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
		input: {
			policyId: {
				bUID: '',
				description: '',
				internalContractID: internalPolicyId || '',
				externalContractID: '',
				thirdPartyID: '',
			},
			effectiveDate: (values.BuyBack && values.BuyBack.effectiveDate) || '',
			endorsementReason: 'DEC',
			LoansIdentifier: [
				{
					buid: loanBuid || '',
					name: loanType || '',
				},
			],
			loanModifications: [
				{
					className: 'aSPLO_Reimbursement',
					ReimbursementAmount: {
						Amount: redemptionAmount,
						Currency: 'EUR',
					},
					FullReimbursment: fullReimbursment ? true : false,
					VariableParameter: 'lvPeriodicPayment',
					EffectiveDate: (values.BuyBack && values.BuyBack.effectiveDate) || '',
					BankAdministrativeFees: '',
					Name: '',
				},
			],
			UploadedDocuments: uploadedDocuments,
			autoValidate: false,
		},
	};

	let requestInfo = requestCreator.createRequest("loanReimbursementEndorsement", req.headers, true);
	let response = await serviceHelper.requestMaker(requestBody, requestInfo);

	res.json(response);
};

module.exports = { loanReimbursementEndorsement };
