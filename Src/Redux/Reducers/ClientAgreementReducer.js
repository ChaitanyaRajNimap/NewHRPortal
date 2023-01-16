import {
  FETCHCLIENTAGREEMENT_PROGRESS,
  FETCHCLIENTAGREEMENT_SUCCESS,
  FETCHCLIENTAGREEMENT_FAIL,
  ADDCLIENTAGREEMENT_PROGRESS,
  ADDCLIENTAGREEMENT_SUCCESS,
  ADDCLIENTAGREEMENT_FAIL,
} from '../ActionConstant';

const initialState = {
  isLoading: false,
  clientAgreementData: {},
  addClientAgreementData: {},
};

const ClientAgreementReducer = (state = initialState, action) => {
  console.log('ClientAgreementReducer', action);
  switch (action.type) {
    case FETCHCLIENTAGREEMENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHCLIENTAGREEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        clientAgreementData: action.payload,
      };
    case FETCHCLIENTAGREEMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        clientAgreementData: action.payload,
      };
    case ADDCLIENTAGREEMENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case ADDCLIENTAGREEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addClientAgreementData: action.payload,
      };
    case ADDCLIENTAGREEMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        addClientAgreementData: action.payload,
      };
    default:
      return state;
  }
};

export default ClientAgreementReducer;
