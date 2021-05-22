const isEmpty = require("is-empty");

const { phoneInput } = require("./userValidationHelper/phoneValidation");
const { nameInput } = require("./userValidationHelper/nameValidation");
const { codeInput } = require("./userValidationHelper/codeValidation");

// Register user validation
const validateRegisterInput = (input) => {
  const { phoneErrors } = phoneInput(input.phone.toString());
  const { nameErrors } = nameInput(input.name);

  const errors = [...phoneErrors, ...nameErrors];

  return { errors, isValid: isEmpty(errors) };
};

// Phone number validation
const validatePhoneInput = (input) => {
  const { phoneErrors } = phoneInput(input.phone.toString());

  const errors = phoneErrors;

  return { errors, isValid: isEmpty(errors) };
};

// OTP verification
const validateVerifyInput = (input) => {
  const { phoneErrors } = phoneInput(input.phone.toString());
  const { codeErrors } = codeInput(input.code.toString());

  const errors = [...phoneErrors, ...codeErrors];

  return { errors, isValid: isEmpty(errors) };
};

// Update user validation
const validateUpdateInput = (input) => {
  const errors = [];

  if (input.name) {
    const { nameErrors } = nameInput(input.name);
    errors.concat(nameErrors);
  }

  return { errors, isValid: isEmpty(errors) };
};

module.exports = {
  validateRegisterInput,
  validatePhoneInput,
  validateVerifyInput,
  validateUpdateInput
};
