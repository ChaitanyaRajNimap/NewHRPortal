import {
  INVOICEHISTORY_FAIL,
  INVOICEHISTORY_PROGRESS,
  INVOICESTATUS_SUCCESS,
  INVOICEHISTORYHISTORYMONTHDATA_FAIL,
  INVOICEHISTORYHISTORYMONTHDATA_SUCCESS,
  INVOICEHISTORYHISTORYMONTHDATA_PROGRESS,
  INVOICESTATUSMAILEXPORT_SUCCESS,
  INVOICESTATUSMAILEXPORT_FAIL,
  INVOICESTATUSMAILEXPORT_PROGRESS,
  INVOICEHISTORYHISTORYMONTHSEARCHDATA_FAIL,
  INVOICEHISTORYHISTORYMONTHSEARCHDATA_SUCCESS,
  INVOICEHISTORYHISTORYMONTHSEARCHDATA_PROGRESS,
} from '../ActionConstant';

const initialstate = {
  isLoading: false,
  getInvoiceHistorydata: {},
  getInternalInvoiceMonthdata: {},
  addInvoiceHistoryMail: {},
  SearchInvoicehistoryData: null,
};

const InvoiceHistoryReducer = (state = initialstate, action) => {
  console.log('action========', action);
  switch (action.type) {
    case INVOICEHISTORY_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case INVOICESTATUS_SUCCESS:
      return {
        ...state,
        getInvoiceHistorydata: action.payload,
      };
    case INVOICEHISTORY_FAIL:
      return {
        ...state,
        getInvoiceHistorydata: action.payload,
      };
    case INVOICEHISTORYHISTORYMONTHDATA_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case INVOICEHISTORYHISTORYMONTHDATA_SUCCESS:
      return {
        ...state,
        getInternalInvoiceMonthdata: action.payload,
      };
    case INVOICEHISTORYHISTORYMONTHDATA_FAIL:
      return {
        ...state,
        addInvoiceHistoryMail: action.payload,
      };
    case INVOICESTATUSMAILEXPORT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case INVOICESTATUSMAILEXPORT_SUCCESS:
      return {
        ...state,
        addInvoiceHistoryMail: action.payload,
      };
    case INVOICESTATUSMAILEXPORT_FAIL:
      return {
        ...state,
        addInvoiceHistoryMail: action.payload,
      };
    case INVOICEHISTORYHISTORYMONTHSEARCHDATA_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case INVOICEHISTORYHISTORYMONTHSEARCHDATA_SUCCESS:
      return {
        ...state,
        SearchInvoicehistoryData: action.payload,
      };
    case INVOICEHISTORYHISTORYMONTHSEARCHDATA_FAIL:
      return {
        ...state,
        SearchInvoicehistoryData: action.payload,
      };
    default:
      return state;
  }
};
export default InvoiceHistoryReducer;
