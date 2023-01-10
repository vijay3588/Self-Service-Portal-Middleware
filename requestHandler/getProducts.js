const getProducts = async (req, res) => {
  let result = {
    products: [{
      product: "Product 1",
      description: "description of product 1",
      coverage: "coverage 1",
      formKey: "ProductOne",
      formName: "EmployeeTest",
      titleImage: "icon_personal_information.png",
      skipAddInitial: true,
      skipAndGo: false
    },
    {
      product: "Product 2",
      description: "description of product 2",
      coverage: "coverage 2",
      formKey: "ProductTwo",
      formName: "EmployeeTest",
      titleImage: "icon_personal_information.png",
      skipAddInitial: true,
      skipAndGo: false
    },
    {
      product: "Product 3",
      description: "description of product 3",
      coverage: "coverage 3",
      formKey: "ProductThree",
      formName: "EmployeeTest",
      titleImage: "icon_personal_information.png",
      skipAddInitial: true,
      skipAndGo: false
    },
    {
      product: "Product 4",
      description: "description of product 4",
      coverage: "coverage 4",
      formKey: "ProductFour",
      formName: "EmployeeTest",
      titleImage: "icon_personal_information.png",
      skipAddInitial: true,
      skipAndGo: false
    }],
    type: "products"
  }
  res.json(result);
};

module.exports = { getProducts }