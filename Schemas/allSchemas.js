const { checkSchema } = require('express-validator'); 

 
exports.LoginSchema= checkSchema({
    email: {
        isEmail: {
            errorMessage: "Invalid email format",
        },
        notEmpty: {
            errorMessage: "Email is required",
        },
    },
    password: {
        isString: true,
        isLength: {
            options: { min: 4, max: 30 },
            errorMessage: "Password must be between 4 and 30 characters",
        },
        notEmpty: {
            errorMessage: "Password is required",
        },
    }
});

exports.productsSchema = checkSchema({
    name: {
      isString: true,
      notEmpty: {
        errorMessage: "Product name is required",
      },
    },
    category: {
      optional: true,
      isString: true,
      errorMessage: "Category should be a string",
    },
    price: {
      isInt: { options: { gt: 0 } },
      errorMessage: "Price should be a positive number",
    },
    quantity: {
      isInt: { options: { min: 0 } },
      errorMessage: "Quantity should be a non-negative integer",
    }
  });




