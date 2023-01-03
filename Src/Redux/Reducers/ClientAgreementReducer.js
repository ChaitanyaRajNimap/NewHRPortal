import {
  GETCLIENTAGREEMENT_PROGRESS,
  GETCLIENTAGREEMENT_SUCCESS,
  GETCLIENTAGREEMENT_FAIL,
  ADDCLIENTAGREEMENT_PROGRESS,
  ADDCLIENTAGREEMENT_SUCCESS,
  ADDCLIENTAGREEMENT_FAIL,
  EDITCLIENTAGREEMENT_PROGRESS,
  EDITCLIENTAGREEMENT_SUCCESS,
  EDITCLIENTAGREEMENT_FAIL,
  DELETECLIENTAGREEMENT_PROGRESS,
  DELETECLIENTAGREEMENT_SUCCESS,
  DELETECLIENTAGREEMENT_FAIL,
} from '../ActionConstant';

const initialState = {
  isLoading: false,
  getClientAgreementData: {},
  addClientAgreementData: {},
  updateClientAgreementData: {},
  deleteClientAgreementData: {},
};

const ClientAgreementReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETCLIENTAGREEMENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETCLIENTAGREEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getClientAgreementData: action.payload,
      };
    case GETCLIENTAGREEMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        getClientAgreementData: action.payload,
      };
    case EDITCLIENTAGREEMENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case EDITCLIENTAGREEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateClientAgreementData: action.payload,
      };
    case EDITCLIENTAGREEMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        updateClientAgreementData: action.payload,
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
    case DELETECLIENTAGREEMENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case DELETECLIENTAGREEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteClientAgreementData: action.payload,
      };
    case DELETECLIENTAGREEMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        deleteClientAgreementData: action.payload,
      };
    default:
      return state;
  }
};

export default ClientAgreementReducer;
