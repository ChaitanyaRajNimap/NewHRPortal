import {
  FETCHCLIENTAGREEMENT_PROGRESS,
  FETCHCLIENTAGREEMENT_SUCCESS,
  FETCHCLIENTAGREEMENT_FAIL,
} from '../ActionConstant';

const initialState = {
  isLoading: false,
  clientAgreementData: {},
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
    default:
      return state;
  }
};

export default ClientAgreementReducer;
