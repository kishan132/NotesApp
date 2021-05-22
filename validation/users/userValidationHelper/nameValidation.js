const Validator = require("validator");
const isEmpty = require("is-empty");

const nameInput = (input) => {
  const errors = [];

  input = !isEmpty(input) ? input : "";

  if (Validator.isEmpty(input, { ignore_whitespace: true })) {
    errors.push({ msg: "Name field is required" });
  }

  return { nameErrors: errors };
};

module.exports = { nameInput };
