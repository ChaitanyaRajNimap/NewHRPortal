import {
  FETCHEXTERNALPROD_PROGRESS,
  FETCHEXTERNALPROD_SUCCESS,
  FETCHEXTERNALPROD_FAIL,
  GETCLIENT_PROGRESS,
  GETCLIENT_SUCCESS,
  GETCLIENT_FAIL,
  ADDCLIENT_PROGRESS,
  ADDCLIENT_SUCCESS,
  ADDCLIENT_FAIL,
  DELETECLIENT_PROGRESS,
  DELETECLIENT_SUCCESS,
  DELETECLIENT_FAIL,
  EDITCLIENT_PROGRESS,
  EDITCLIENT_SUCCESS,
  EDITCLIENT_FAIL,
} from '../ActionConstant';

const initialState = {
  isLoading: false,
  getClientData: null,
  getExternalProductData: null,
  addClientData: null,
  deleteClientData: null,
  updateClientData: null,
};

const ClientReducer = (state = initialState, action) => {
  // console.log('ClientReducer', action);
  switch (action.type) {
    case FETCHEXTERNALPROD_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHEXTERNALPROD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getExternalProductData: action.payload,
      };
    case FETCHEXTERNALPROD_FAIL:
      return {
        ...state,
        isLoading: false,
        getExternalProductData: action.payload,
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
    case ADDCLIENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case ADDCLIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addClientData: action.payload,
      };
    case ADDCLIENT_FAIL:
      return {
        ...state,
        isLoading: false,
        addClientData: action.payload,
      };
    case DELETECLIENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case DELETECLIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteClientData: action.payload,
      };
    case DELETECLIENT_FAIL:
      return {
        ...state,
        isLoading: false,
        deleteClientData: action.payload,
      };
    case EDITCLIENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case EDITCLIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateClientData: action.payload,
      };
    case EDITCLIENT_FAIL:
      return {
        ...state,
        isLoading: false,
        updateClientData: action.payload,
      };
    default:
      return state;
  }
};

export default ClientReducer;
