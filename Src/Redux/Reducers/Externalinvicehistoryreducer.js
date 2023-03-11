import {
  EXTERNALINVOICEHISTORY_PROGRESS,
  EXTERNALINVOICEHISTORY_SUCCESS,
  EXTERNALINVOICEHISTORY_FAIL,
  EXTERNALINVOICEHISTORYMONTHDATA_FAIL,
  EXTERNALINVOICEHISTORYMONTHDATA_SUCCESS,
  EXTERNALINVOICEHISTORYMONTHDATA_PROGRESS,
  EXTERNALINVOICEHISTORYMAILEXPORT_FAIL,
  EXTERNALINVOICEHISTORYMAILEXPORT_SUCCESS,
  EXTERNALINVOICEHISTORYMAILEXPORT_PROGRESS,
} from '../ActionConstant';

const initialstate = {
  isLoading: false,
  getExternalinvicehistorydata: {},
  GetMonthData: {},
  addExternalIvoiceHistory: {},
};

const Externalinvicehistoryreducer = (state = initialstate, action) => {
  console.log('action payload=>>>>>>>>>>>>>>>>>>>>>', action.payload);
  switch (action.type) {
    case EXTERNALINVOICEHISTORY_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case EXTERNALINVOICEHISTORY_SUCCESS:
      return {
        ...state,
        getExternalinvicehistorydata: action.payload,
      };
    case EXTERNALINVOICEHISTORY_FAIL:
      return {
        ...state,
        getExternalinvicehistorydata: action.payload,
      };
    case EXTERNALINVOICEHISTORYMONTHDATA_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case EXTERNALINVOICEHISTORYMONTHDATA_SUCCESS:
      return {
        ...state,
        GetMonthData: action.payload,
      };
    case EXTERNALINVOICEHISTORYMONTHDATA_FAIL:
      return {
        ...state,
        GetMonthData: action.payload,
      };
    case EXTERNALINVOICEHISTORYMAILEXPORT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case EXTERNALINVOICEHISTORYMAILEXPORT_SUCCESS:
      return {
        ...state,
        addExternalIvoiceHistory: action.payload,
      };
    case EXTERNALINVOICEHISTORYMAILEXPORT_FAIL:
      return {
        ...state,
        addExternalIvoiceHistory: action.payload,
      };
    default:
      return state;
  }
};
export default Externalinvicehistoryreducer;
