const initialState = {
  clientName: null,
  reportManagerName: null,
  reportManagerContact: null,
  reportManagerEmail: null,
  hrName: null,
  hrContact: null,
  hrEmail: null,
  interviewerName: null,
  interviewerContact: null,
  interviewerEmail: null,
  financeName: null,
  financeEmail: null,
  financeContact: null,
  url: null,
  address: null,
  description: null,
  billingAddress: null,
  operationalAddress: null,
  panNumber: null,
  gstNumber: null,
  tanNumber: null,
  creditPeriod: null,
  dateOfInvoice: null,
  mapLink: null,
  nationality: null,
  needTimesheet: null,
  needMachine: null,
  isWeekendWorking: null,
  isAgreementSigned: null,
  isFirstInvoiceSend: null,
  needPhysicalCopy: null,
  needPFProof: null,
  purchaseOrderRequired: null,
  isExternalProduct: null,
  clientNameError: null,
  reportManagerNameError: null,
  reportManagerContactError: null,
  reportManagerEmailError: null,
  hrNameError: null,
  hrContactError: null,
  hrEmailError: null,
  interviewerNameError: null,
  interviewerContactError: null,
  interviewerEmailError: null,
  financeNameError: null,
  financeEmailError: null,
  financeContactError: null,
  urlError: null,
  addressError: null,
  descriptionError: null,
  billingAddressError: null,
  operationalAddressError: null,
  panNumberError: null,
  gstNumberError: null,
  tanNumberError: null,
  creditPeriodError: null,
  dateOfInvoiceError: null,
  mapLinkError: null,
  nationalityError: null,
  needTimesheetError: null,
  needMachineError: null,
  isWeekendWorkingError: null,
  isAgreementSignedError: null,
  isFirstInvoiceSendError: null,
  needPhysicalCopyError: null,
  needPFProofError: null,
  purchaseOrderRequiredError: null,
  isExternalProductError: null,
  externalProductError: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'clientName':
      return {
        ...state,
        clientName: action.payload,
      };
    case 'reportManagerName':
      return {
        ...state,
        reportManagerName: action.payload,
      };
    case 'reportManagerContact':
      return {
        ...state,
        reportManagerContact: action.payload,
      };
    case 'reportManagerEmail':
      return {
        ...state,
        reportManagerEmail: action.payload,
      };
    case 'hrName':
      return {
        ...state,
        hrName: action.payload,
      };
    case 'hrContact':
      return {
        ...state,
        hrContact: action.payload,
      };
    case 'hrEmail':
      return {
        ...state,
        hrEmail: action.payload,
      };
    case 'interviewerName':
      return {
        ...state,
        interviewerName: action.payload,
      };
    case 'interviewerContact':
      return {
        ...state,
        interviewerContact: action.payload,
      };
    case 'interviewerEmail':
      return {
        ...state,
        interviewerEmail: action.payload,
      };
    case 'financeName':
      return {
        ...state,
        financeName: action.payload,
      };
    case 'financeEmail':
      return {
        ...state,
        financeEmail: action.payload,
      };
    case 'financeContact':
      return {
        ...state,
        financeContact: action.payload,
      };
    case 'url':
      return {
        ...state,
        url: action.payload,
      };
    case 'address':
      return {
        ...state,
        address: action.payload,
      };
    case 'description':
      return {
        ...state,
        description: action.payload,
      };
    case 'billingAddress':
      return {
        ...state,
        billingAddress: action.payload,
      };
    case 'operationalAddress':
      return {
        ...state,
        operationalAddress: action.payload,
      };
    case 'panNumber':
      return {
        ...state,
        panNumber: action.payload,
      };
    case 'gstNumber':
      return {
        ...state,
        gstNumber: action.payload,
      };
    case 'tanNumber':
      return {
        ...state,
        tanNumber: action.payload,
      };
    case 'creditPeriod':
      return {
        ...state,
        creditPeriod: action.payload,
      };
    case 'dateOfInvoice':
      return {
        ...state,
        dateOfInvoice: action.payload,
      };
    case 'mapLink':
      return {
        ...state,
        mapLink: action.payload,
      };
    case 'nationality':
      return {
        ...state,
        nationality: action.payload,
      };
    case 'needTimesheet':
      return {
        ...state,
        needTimesheet: action.payload,
      };
    case 'needMachine':
      return {
        ...state,
        needMachine: action.payload,
      };
    case 'isWeekendWorking':
      return {
        ...state,
        isWeekendWorking: action.payload,
      };
    case 'isAgreementSigned':
      return {
        ...state,
        isAgreementSigned: action.payload,
      };
    case 'isFirstInvoiceSend':
      return {
        ...state,
        isFirstInvoiceSend: action.payload,
      };
    case 'needPhysicalCopy':
      return {
        ...state,
        needPhysicalCopy: action.payload,
      };
    case 'needPFProof':
      return {
        ...state,
        needPFProof: action.payload,
      };
    case 'purchaseOrderRequired':
      return {
        ...state,
        purchaseOrderRequired: action.payload,
      };
    case 'isExternalProduct':
      return {
        ...state,
        isExternalProduct: action.payload,
      };

    case 'clientNameError':
      return {
        ...state,
        clientNameError: action.payload,
      };
    case 'reportManagerNameError':
      return {
        ...state,
        reportManagerNameError: action.payload,
      };
    case 'reportManagerContactError':
      return {
        ...state,
        reportManagerContactError: action.payload,
      };
    case 'reportManagerEmailError':
      return {
        ...state,
        reportManagerEmailError: action.payload,
      };
    case 'hrNameError':
      return {
        ...state,
        hrNameError: action.payload,
      };
    case 'hrContactError':
      return {
        ...state,
        hrContactError: action.payload,
      };
    case 'hrEmailError':
      return {
        ...state,
        hrEmailError: action.payload,
      };
    case 'interviewerNameError':
      return {
        ...state,
        interviewerNameError: action.payload,
      };
    case 'interviewerContactError':
      return {
        ...state,
        interviewerContactError: action.payload,
      };
    case 'interviewerEmailError':
      return {
        ...state,
        interviewerEmailError: action.payload,
      };
    case 'financeNameError':
      return {
        ...state,
        financeNameError: action.payload,
      };
    case 'financeEmailError':
      return {
        ...state,
        financeEmailError: action.payload,
      };
    case 'financeContactError':
      return {
        ...state,
        financeContactError: action.payload,
      };
    case 'urlError':
      return {
        ...state,
        urlError: action.payload,
      };
    case 'addressError':
      return {
        ...state,
        addressError: action.payload,
      };
    case 'descriptionError':
      return {
        ...state,
        descriptionError: action.payload,
      };
    case 'billingAddressError':
      return {
        ...state,
        billingAddressError: action.payload,
      };
    case 'operationalAddressError':
      return {
        ...state,
        operationalAddressError: action.payload,
      };
    case 'panNumberError':
      return {
        ...state,
        panNumberError: action.payload,
      };
    case 'gstNumberError':
      return {
        ...state,
        gstNumberError: action.payload,
      };
    case 'tanNumberError':
      return {
        ...state,
        tanNumberError: action.payload,
      };
    case 'creditPeriodError':
      return {
        ...state,
        creditPeriodError: action.payload,
      };
    case 'dateOfInvoiceError':
      return {
        ...state,
        dateOfInvoiceError: action.payload,
      };
    case 'mapLinkError':
      return {
        ...state,
        mapLinkError: action.payload,
      };
    case 'nationalityError':
      return {
        ...state,
        nationalityError: action.payload,
      };
    case 'needTimesheetError':
      return {
        ...state,
        needTimesheetError: action.payload,
      };
    case 'needMachineError':
      return {
        ...state,
        needMachineError: action.payload,
      };
    case 'isWeekendWorkingError':
      return {
        ...state,
        isWeekendWorkingError: action.payload,
      };
    case 'isAgreementSignedError':
      return {
        ...state,
        isAgreementSignedError: action.payload,
      };
    case 'isFirstInvoiceSendError':
      return {
        ...state,
        isFirstInvoiceSendError: action.payload,
      };
    case 'needPhysicalCopyError':
      return {
        ...state,
        needPhysicalCopyError: action.payload,
      };
    case 'needPFProofError':
      return {
        ...state,
        needPFProofError: action.payload,
      };
    case 'purchaseOrderRequiredError':
      return {
        ...state,
        purchaseOrderRequiredError: action.payload,
      };
    case 'isExternalProductError':
      return {
        ...state,
        isExternalProductError: action.payload,
      };
    default:
      return state;
  }
};

export {initialState, reducer};
