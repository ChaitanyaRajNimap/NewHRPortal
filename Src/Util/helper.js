const message = {
  EMPTY_FIELD: 'This Field is Required.',
  INVALID_FIELD: 'Please enter only Character.',
  INVALID_NUMBER_FIELD: 'Please Enter valid Mobile numbers.',
  INVALIDATE_EMAIL: 'Email address is invalid!',
  EMPTY_EMAIL: 'Please enter your email address.',
  VALID_YEAR: 'Please Enter a valid 4 number.',
  VALID_FILE: 'Please select file(.pdf,.doc,.docx).',
};

const validateEmail = value => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(value)) {
    return null;
  } else {
    return value !== null ? message.INVALIDATE_EMAIL : message.EMPTY_EMAIL;
  }
};

const validateNotRequiredEmail = value => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (value === '') {
    return null;
  } else if (!reg.test(value) && value !== null && value !== undefined) {
    return message.INVALIDATE_EMAIL;
  } else {
    return null;
  }
};

const contactValidation = value => {
  if (value) {
    let reg = /^[0-9]+$/i;
    if (reg.test(value)) {
      return null;
    } else {
      return value ? message.INVALID_NUMBER_FIELD : message.EMPTY_FIELD;
    }
  } else {
    return message.EMPTY_FIELD;
  }
};

const numericValidation = value => {
  if (value) {
    let reg = /^[0-9]+$/i;
    if (!reg.test(value)) {
      return null;
    } else {
      return value ? message.VALID_YEAR : message.EMPTY_FIELD;
    }
  } else {
    return message.EMPTY_FIELD;
  }
};

const validateCharField = value => {
  let regX = /^[a-zA-Z]+$/g;
  if (value === undefined || value === null) {
    return message.EMPTY_FIELD;
  } else if (regX.test(value)) {
    return null;
  } else {
    return value ? message.INVALID_FIELD : message.EMPTY_FIELD;
  }
};

const validateField = value => {
  return value ? null : message.EMPTY_FIELD;
};

const validatefile = value => {
  return value ? null : message.VALID_FILE;
};

const validation = {
  validateEmail,
  numericValidation,
  validateCharField,
  validateField,
  validateNotRequiredEmail,
  contactValidation,
  validatefile,
};

export default validation;
