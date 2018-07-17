const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput({
  name = "",
  email = "",
  password = "",
  password2 = ""
}) {
  let errors = {};

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 Characters";
  }

  if (Validator.isEmpty(name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isEmail(email)) {
    //handles no email submitted or incorrect
    errors.email = "Valid email address is required";
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 Characters";
  }

  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.equals(password, password2)) {
    //also handles no password2
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
