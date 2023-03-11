import {
  INVOICESTATUS_FAIL,
  INVOICESTATUS_PROGRESS,
  INVOICESTATUS_SUCCESS,
  INVOICESTATUSSEARCH_FAIL,
  INVOICESTATUSSEARCH_SUCCESS,
  INVOICESTATUSSEARCH_PROGRESS,
  INVOICESTATUSMAILEXPORT_SUCCESS,
  INVOICESTATUSMAILEXPORT_FAIL,
  INVOICESTATUSMAILEXPORT_PROGRESS,
} from '../ActionConstant';

const initialstate = {
  isLoading: false,
  InvoicestatesData: {},
  InvoicestatusSearchData: {},
  invoicestatusAdd: {},
};

const InvoiceStatusReducer = (state = initialstate, action) => {
  switch (action.type) {
    case INVOICESTATUS_PROGRESS:
      return {
        ...state,
        isLoading: true,
        InvoicestatesData: action.payload,
      };
    case INVOICESTATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        InvoicestatesData: action.payload,
      };
    case INVOICESTATUS_FAIL:
      return {
        ...state,
        isLoading: false,
        InvoicestatesData: action.payload,
      };
    case INVOICESTATUSSEARCH_PROGRESS:
      return {
        ...state,
        isLoading: true,
        InvoicestatusSearchData: action.payload,
      };
    case INVOICESTATUSSEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        InvoicestatusSearchData: action.payload,
      };
    case INVOICESTATUSSEARCH_FAIL:
      return {
        ...state,
        isLoading: false,
        InvoicestatusSearchData: action.payload,
      };
    case INVOICESTATUSMAILEXPORT_PROGRESS:
      return {
        ...state,
        isLoading: true,
        invoicestatusAdd: action.payload,
      };
    case INVOICESTATUSMAILEXPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        invoicestatusAdd: action.payload,
      };
    case INVOICESTATUSMAILEXPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        invoicestatusAdd: action.payload,
      };
    default:
      return state;
  }
};

export default InvoiceStatusReducer;
