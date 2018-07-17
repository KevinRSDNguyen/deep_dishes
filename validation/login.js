const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput({ email = "", password = "" }) {
  let errors = {};

  if (Validator.isEmpty(password)) {
    errors.login = "Password field is required";
  }

  if (!Validator.isEmail(email)) {
    //handles no email submitted or incorrect
    errors.email = "Valid email address is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
