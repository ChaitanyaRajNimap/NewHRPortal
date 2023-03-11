import {
  EXTERNALINVOICESTATUS_FAIL,
  EXTERNALINVOICESTATUS_SUCCESS,
  EXTERNALINVOICESTATUS_PROGRESS,
  EXTERNALINVOICESTATUSMAILEXPORT_PROGRESS,
  EXTERNALINVOICESTATUSMAILEXPORT_FAIL,
  EXTERNALINVOICESTATUSMAILEXPORT_SUCCESS,
  EXTERNALINVOICESTATUSSEARCH_PROGRESS,
  EXTERNALINVOICESTATUSSEARCH_FAIL,
  EXTERNALINVOICESTATUSSEARCH_SUCCESS,
} from '../ActionConstant';

const initialstate = {
  isLoading: false,
  ExternalInvoicestatesData: {},
  ExternalInvoiceStautsSearchData: {},
  ExternalinvoicestatusAdd: {},
};

const ExternalInvoiceStatusReducer = (state = initialstate, action) => {
  switch (action.type) {
    case EXTERNALINVOICESTATUS_PROGRESS:
      return {
        ...state,
        isLoading: true,
        ExternalInvoicestatesData: action.payload,
      };
    case EXTERNALINVOICESTATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ExternalInvoicestatesData: action.payload,
      };
    case EXTERNALINVOICESTATUS_FAIL:
      return {
        ...state,
        isLoading: false,
        ExternalInvoicestatesData: action.payload,
      };
    case EXTERNALINVOICESTATUSSEARCH_PROGRESS:
      return {
        ...state,
        isLoading: true,
        ExternalInvoiceStautsSearchData: action.payload,
      };
    case EXTERNALINVOICESTATUSSEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ExternalInvoiceStautsSearchData: action.payload,
      };
    case EXTERNALINVOICESTATUSSEARCH_FAIL:
      return {
        ...state,
        isLoading: false,
        ExternalInvoiceStautsSearchData: action.payload,
      };
    case EXTERNALINVOICESTATUSMAILEXPORT_PROGRESS:
      return {
        ...state,
        isLoading: true,
        ExternalinvoicestatusAdd: action.payload,
      };
    case EXTERNALINVOICESTATUSMAILEXPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ExternalinvoicestatusAdd: action.payload,
      };
    case EXTERNALINVOICESTATUSMAILEXPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        ExternalinvoicestatusAdd: action.payload,
      };
    default:
      return state;
  }
};

export default ExternalInvoiceStatusReducer;
