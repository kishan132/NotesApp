const isEmpty = require("is-empty");

const { noteInput } = require("./noteValidationHelper/noteValidation");

// Create note validation
const validateCreateInput = (input) => {
  const { noteErrors } = noteInput(input.note);

  const errors = [...noteErrors];

  return { errors, isValid: isEmpty(errors) };
};

// Update note validation
const validateUpdateInput = (input) => {
  const errors = [];

  if (input.note) {
    const { noteErrors } = noteInput(input.note);
    errors.concat(noteErrors);
  }

  return { errors, isValid: isEmpty(errors) };
};

module.exports = {
  validateCreateInput,
  validateUpdateInput
};
