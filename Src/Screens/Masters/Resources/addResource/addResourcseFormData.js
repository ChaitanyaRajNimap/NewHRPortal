const initalState = {
  vendor: null,
  firstName: null,
  lastName: null,
  mobile: null,
  personalEmail: null,
  officialEmail: null,
  projectname: null,
  primarySkill: null,
  secondarySkill: null,
  experience: null,
  relationship: null,
  alternativeContact: null,
  residentLocality: null,
  resume: null,
  usaShift: null,
  ukShift: null,
  relocate: null,
  contractStartDate: null,
  contractEndDate: null,
  contractFile: null,
  checkList: null,
  otherDocument: null,
  passingYear: null,
  panCard: null,
  aadharCard: null,
  pfForm: null,
  cost: null,
  vendorError: null,
  firstNameError: null,
  lastNameError: null,
  mobileError: null,
  personalEmailError: null,
  officialEmailError: null,
  primarySkillError: null,
  experienceError: null,
  relationshipError: null,
  alternativeContactError: null,
  residentLocalityError: null,
  resumeError: null,
  usaShiftError: null,
  ukShiftError: null,
  relocateError: null,
  contractStartDateError: null,
  contractEndDateError: null,
  contractFileError: null,
  checkListError: null,
  otherDocumentError: null,
  passingYearError: null,
  panCardError: null,
  aadharCardError: null,
  pfFormError: null,
  costError: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'vendor':
      return {
        ...state,
        vendor: action.payload,
      };
    case 'firstname':
      return {
        ...state,
        firstName: action.payload,
      };
    case 'lastname':
      return {
        ...state,
        lastName: action.payload,
      };
    case 'mobile':
      return {
        ...state,
        mobile: action.payload,
      };
    case 'personalEmail':
      return {
        ...state,
        personalEmail: action.payload,
      };
    case 'officialEmail':
      return {
        ...state,
        officialEmail: action.payload,
      };
    case 'projectname':
      return {
        ...state,
        projectname: action.payload,
      };
    case 'primarySkill':
      return {
        ...state,
        primarySkill: action.payload,
      };
    case 'secondarySkill':
      return {
        ...state,
        secondarySkill: action.payload,
      };
    case 'experience':
      return {
        ...state,
        experience: action.payload,
      };
    case 'relationship':
      return {
        ...state,
        relationship: action.payload,
      };
    case 'alternativeContact':
      return {
        ...state,
        alternativeContact: action.payload,
      };
    case 'residentLocality':
      return {
        ...state,
        residentLocality: action.payload,
      };
    case 'resume':
      return {
        ...state,
        resume: action.payload,
      };
    case 'usaShift':
      return {
        ...state,
        usaShift: action.payload,
      };
    case 'ukShift':
      return {
        ...state,
        ukShift: action.payload,
      };
    case 'relocate':
      return {
        ...state,
        relocate: action.payload,
      };
    case 'contractStartDate':
      return {
        ...state,
        contractStartDate: action.payload,
      };
    case 'contractEndDate':
      return {
        ...state,
        contractEndDate: action.payload,
      };
    case 'contractFile':
      return {
        ...state,
        contractFile: action.payload,
      };
    case 'checkList':
      return {
        ...state,
        checkList: action.payload,
      };
    case 'otherDocument':
      return {
        ...state,
        otherDocument: action.payload,
      };
    case 'passingYear':
      return {
        ...state,
        passingYear: action.payload,
      };
    case 'panCard':
      return {
        ...state,
        panCard: action.payload,
      };
    case 'aadharCard':
      return {
        ...state,
        aadharCard: action.payload,
      };
    case 'pfForm':
      return {
        ...state,
        pfForm: action.payload,
      };
    case 'cost':
      return {
        ...state,
        cost: action.payload,
      };
    case 'vendorError':
      return {
        ...state,
        vendorError: action.payload,
      };
    case 'firstNameError':
      return {
        ...state,
        firstNameError: action.payload,
      };
    case 'lastNameError':
      return {
        ...state,
        lastNameError: action.payload,
      };
    case 'mobileError':
      return {
        ...state,
        mobileError: action.payload,
      };
    case 'personalEmailError':
      return {
        ...state,
        personalEmailError: action.payload,
      };
    case 'officialEmailError':
      return {
        ...state,
        officialEmailError: action.payload,
      };
    case 'primarySkillError':
      return {
        ...state,
        primarySkillError: action.payload,
      };
    case 'experienceError':
      return {
        ...state,
        experienceError: action.payload,
      };
    case 'relationshipError':
      return {
        ...state,
        relationshipError: action.payload,
      };
    case 'alternativeContactError':
      return {
        ...state,
        alternativeContactError: action.payload,
      };
    case 'residentLocalityError':
      return {
        ...state,
        residentLocalityError: action.payload,
      };
    case 'resumeError':
      return {
        ...state,
        resumeError: action.payload,
      };
    case 'usaShiftError':
      return {
        ...state,
        usaShiftError: action.payload,
      };
    case 'ukShiftError':
      return {
        ...state,
        ukShiftError: action.payload,
      };
    case 'relocateError':
      return {
        ...state,
        relocateError: action.payload,
      };
    case 'contractStartDateError':
      return {
        ...state,
        contractStartDateError: action.payload,
      };
    case 'contractEndDateError':
      return {
        ...state,
        contractEndDateError: action.payload,
      };
    case 'contractFileError':
      return {
        ...state,
        contractFileError: action.payload,
      };
    case 'checkListError':
      return {
        ...state,
        checkList: action.payload,
      };
    case 'otherDocumentError':
      return {
        ...state,
        otherDocument: action.payload,
      };
    case 'passingYearError':
      return {
        ...state,
        passingYearError: action.payload,
      };
    case 'panCardError':
      return {
        ...state,
        panCardError: action.payload,
      };
    case 'aadharCardError':
      return {
        ...state,
        aadharCardError: action.payload,
      };
    case 'pfFormError':
      return {
        ...state,
        pfFormError: action.payload,
      };
    case 'costError':
      return {
        ...state,
        costError: action.payload,
      };
    default:
      return state;
  }
};

export {initalState, reducer};
