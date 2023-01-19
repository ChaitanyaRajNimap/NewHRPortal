import {
  FETCHCLIENTAGREEMENT_PROGRESS,
  FETCHCLIENTAGREEMENT_SUCCESS,
  FETCHCLIENTAGREEMENT_FAIL,
  GETRESOURCE_PROGRESS,
  GETRESOURCE_SUCCESS,
  GETRESOURCE_FAIL,
  GETCLIENT_PROGRESS,
  GETCLIENT_SUCCESS,
  GETCLIENT_FAIL,
  ADDCLIENTAGREEMENT_PROGRESS,
  ADDCLIENTAGREEMENT_SUCCESS,
  ADDCLIENTAGREEMENT_FAIL,
} from '../ActionConstant';

const initialState = {
  isLoading: false,
  clientAgreementData: {},
  getResorceData: {},
  getClientData: {},
  addClientAgreementData: {},
};

const ClientAgreementReducer = (state = initialState, action) => {
  // console.log('ClientAgreementReducer', action);
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
    case GETRESOURCE_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETRESOURCE_SUCCESS:
      console.log('GETRESOURCE_SUCCESS');
      return {
        ...state,
        isLoading: false,
        getResorceData: action.payload,
      };
    case GETRESOURCE_FAIL:
      console.log('GETRESOURCE_FAIL');
      return {
        ...state,
        isLoading: false,
        getResorceData: action.payload,
      };
    case GETCLIENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETCLIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getClientData: action.payload,
      };
    case GETCLIENT_FAIL:
      return {
        ...state,
        isLoading: false,
        getClientData: action.payload,
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
