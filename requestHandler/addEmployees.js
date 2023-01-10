const constants = require("../utils/constants/segmentConstants");
const { jsonHelper } = require("../utils/helpers/jsonHelper");
const requestProcessor = require("../processor/requestProcessor");
const { getBankDetailsUsingRoutingNumber, loanReimbursementEndorsement } = require("../utils/constants/apiConstants");

const addEmployees = async (req, res) => {

  

  if (req?.body?.files[0]) {
    let rawEmployeeArr = req?.body?.files[0].file.processedFileContent
    let employeeArr = []

    for (let i = 0; i < rawEmployeeArr.length; i++) {
      let employee = {}
      let BankAccount = [{
        accountNumber: rawEmployeeArr[i].BankAccount_AccountNumber,
        accountType: rawEmployeeArr[i].BankAccount_AccountType,
        bankName: rawEmployeeArr[i].BankAccount_Name,
        city: rawEmployeeArr[i].BankAccount_Address_City,
        country: rawEmployeeArr[i].BankAccount_Address_Country,
        holderName: rawEmployeeArr[i].BankAccount_AccountHolderName,
        lineOne: rawEmployeeArr[i].BankAccount_Address_Line1,
        lineTwo: rawEmployeeArr[i].BankAccount_Address_Line2,
        routingNumber: rawEmployeeArr[i].BankAccount_RoutingNumber,
        state: rawEmployeeArr[i].BankAccount_Address_State,
        zipCode: rawEmployeeArr[i].BankAccount_AccountNumber,
      }]
      let ContactInfo = [{
        city: rawEmployeeArr[i].Person_Address_City,
        country: rawEmployeeArr[i].Person_Address_Country,
        email: "",
        extPrimary: "",
        extSecondary: "",
        faxNumber: "",
        isDefault: "",
        lineOne: rawEmployeeArr[i].Person_Address_Line1,
        lineTwo: rawEmployeeArr[i].Person_Address_Line2,
        noMailingAddress: "",
        phoneNumberPrimary: "",
        phoneNumberSecondary: "",
        preferredContactMethod: "",
        state: rawEmployeeArr[i].Person_Address_State,
        typeOfAddress: rawEmployeeArr[i].Person_Address_Type,
        zipCode: rawEmployeeArr[i].Person_Address_ZipCode,
      }]
      let ContactPerson = [{
        city: "",
        contactName: "",
        country: "",
        createNewAddress: "",
        email: "",
        existingAddress: "",
        extPrimary: "",
        extSecondary: "",
        faxNumber: "",
        lineOne: "",
        lineTwo: "",
        phoneNumberPrimary: "",
        phoneNumberSecondary: "",
        preferredContactMethod: "",
        relationToEmployee: "",
        state: "",
        zipCode: "",
      }]
      let EmploymentInfo = {
        baseSalary: rawEmployeeArr[i].BaseSalaryAmount,
        baseSalaryFrequency: rawEmployeeArr[i].BaseSalaryFrequency,
        bonus: rawEmployeeArr[i].SalaryBonusAmount,
        bonusFrequency: rawEmployeeArr[i].SalaryBonusFrequency,
        commissions: rawEmployeeArr[i].SalaryCommissionAmount,
        commissionsFrequency: rawEmployeeArr[i].SalaryCommissionFrequency,
        division: "",
        employeeId: rawEmployeeArr[i].Identifier,
        employmentStatus: rawEmployeeArr[i].EmploymentStatus,
        frequency: rawEmployeeArr[i].WorkingHoursDefinedForFrequency,
        hireDate: rawEmployeeArr[i].HireDate,
        woringCategory: rawEmployeeArr[i].WorkingCategory,
        workingHours: rawEmployeeArr[i].WorkingHours,
        worksiteState: rawEmployeeArr[i].WorksiteState,
      }
      let PersonalInfo = {
        birthDate: rawEmployeeArr[i].Person_BirthDate,
        firstName: rawEmployeeArr[i].Person_FirstName,
        gender: rawEmployeeArr[i].Person_Gender,
        lastName: rawEmployeeArr[i].Person_LastName,
        maritalStatus: rawEmployeeArr[i].Person_MaritalStatus,
        middleName: "",
        nationality: rawEmployeeArr[i].Person_Nationality,
        personalTitle: rawEmployeeArr[i].Person_Title,
        professions: "",
        ssn: rawEmployeeArr[i].Person_SSN,
        suffix: "",
      }
      let PortalAccount = {
        email: "",
        password: "",
        preferredLanguage: "",
        userName: "",
      }
      employee = { BankAccount, ContactInfo, ContactPerson, EmploymentInfo, PersonalInfo, PortalAccount }
      employeeArr.push(employee)
    }

    try {
      return requestProcessor.request(employeeArr, res,
        constants.SERVICE_REQUEST.ADD_EMPLOYEES, req.headers, jsonHelper.reqUserInfo(req.headers));
    } catch (error) {
      logger.logCreator().error(error);
      logger.logCreator().trace("Error at addEmployees function in addEmployees file");
      res.json(null);
    }
  }

};

module.exports = { addEmployees };