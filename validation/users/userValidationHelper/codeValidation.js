const Validator = require("validator");
const isEmpty = require("is-empty");

const codeRegex = /^\d{6}$/;

const codeInput = (input) => {
  const errors = [];

  input = !isEmpty(input) ? input : "";

  if (Validator.isEmpty(input, { ignore_whitespace: true })) {
    errors.push({ msg: "Code field is required" });
  } else if (!codeRegex.test(input)) {
    errors.push({ msg: "Please Input 6 digit code" });
  }

  return { codeErrors: errors };
};

module.exports = { codeInput };
