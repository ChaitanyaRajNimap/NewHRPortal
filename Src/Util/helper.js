const message = {
  EMPTY_FIELD: 'This Field is Required.',
  INVALID_FIELD: 'Please enter only Character.',
  INVALID_NUMBER_FIELD: 'Please Enter valid Mobile numbers.',
  INVALIDATE_EMAIL: 'Email address is invalid!',
  EMPTY_EMAIL: 'Please enter your email address.',
  VALID_YEAR: 'Please Enter a valid 4 number.',
  VALID_FILE: 'Please select file(.pdf,.doc,.docx).',
  INVALID_URL: 'Please enter valid url link.',
  EMPTY_URL: 'Please enter url link.',
  INVALID_TAN: 'Please enter valid TAN number.',
  EMPTY_TAN: 'Please enter TAN number.',
  INVALID_PAN: 'Please enter valid PAN number.',
  EMPTY_PAN: 'Please enter PAN number.',
  INVALID_GST: 'Please enter valid GST number.',
  EMPTY_GST: 'Please enter GST number.',
  INVALID_CP: 'Please enter valid credit period.',
  EMPTY_CP: 'Please enter credit period.',
};

const numberRegex = /^[^-\s][a-zA-Z\s-]+$/;
const LinkRegEx =
  '((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)';
const mobileRegex = /^([6-9]{1})([0-9]{9})$/;
const em = /[a-z0-9]+@[a-z]+(\.com|.in|.org|.net)*$/;

const validateUrl = value => {
  let urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
  if (urlRegex.test(value)) {
    return null;
  } else {
    return value !== null ? message.INVALID_URL : message.EMPTY_URL;
  }
};

const validateTan = value => {
  let tanRegex = /^[A-Za-z]{4}\d{5}[A-Za-z]{1}$/;
  if (tanRegex.test(value)) {
    return null;
  } else {
    return value !== null ? message.INVALID_TAN : message.EMPTY_TAN;
  }
};

const validatePan = value => {
  let panRegEx = /^([A-Z]{5})(\d{4})([A-Z]{1})$/;
  if (panRegEx.test(value)) {
    return null;
  } else {
    return value !== null ? message.INVALID_PAN : message.EMPTY_PAN;
  }
};

const validateGst = value => {
  const gstResEx = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
  if (gstResEx.test(value)) {
    return null;
  } else {
    return value !== null ? message.INVALID_GST : message.EMPTY_GST;
  }
};

const validateCP = value => {
  let cpRegEx = /^[0-9]{1,2}$/;
  if (cpRegEx.test(value)) {
    return null;
  } else {
    return value !== null ? message.INVALID_CP : message.EMPTY_CP;
  }
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

const validateNameFeild = value => {
  let regX = /[a-zA-Z]+([\s][a-zA-Z]+)*/g;
  if (value === undefined || value === null) {
    return message.EMPTY_FIELD;
  } else if (regX.test(value)) {
    return null;
  } else {
    return value ? message.INVALID_FIELD : message.EMPTY_FIELD;
  }
};

const validation = {
  validateEmail,
  numericValidation,
  validateCharField,
  validateField,
  validateNotRequiredEmail,
  contactValidation,
  validatefile,
  validateNameFeild,
  validateUrl,
  validateTan,
  validatePan,
  validateGst,
  validateCP,
};

export default validation;
