const Validator = require("validator");
const isEmpty = require("is-empty");

const phoneRegex = /^[6-9]\d{9}$/;

const phoneInput = (input) => {
  const errors = [];

  input = !isEmpty(input) ? input : "";

  if (Validator.isEmpty(input, { ignore_whitespace: true })) {
    errors.push({ msg: "Phone field is required" });
  } else if (!phoneRegex.test(input)) {
    errors.push({ msg: "Invalid mobile Number" });
  }

  return { phoneErrors: errors };
};

module.exports = { phoneInput };
