const Validator = require("validator");
const isEmpty = require("is-empty");

const noteInput = (input) => {
  const errors = [];

  input = !isEmpty(input) ? input : "";

  if (Validator.isEmpty(input, { ignore_whitespace: true })) {
    errors.push({ msg: "Note field is required" });
  }

  return { noteErrors: errors };
};

module.exports = { noteInput };
