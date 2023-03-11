import {
  FETCHREQUESTCLIENT_FAILURE,
  FETCHREQUESTCLIENT_PROGRESS,
  FETCHREQUESTCLIENT_SUCCESS,
  GETCLIENT_FAIL,
  GETCLIENT_PROGRESS,
  GETCLIENT_SUCCESS,
  ADDRQUESTCLIENT_FAIL,
  ADDRQUESTCLIENT_SUCCESS,
  ADDRQUESTCLIENT_PROGRESS,
  UPDATERQUESTCLIENT_FAIL,
  UPDATERQUESTCLIENT_SUCCESS,
  UPDATERQUESTCLIENT_PROGRESS,
} from '../ActionConstant';

const initalState = {
  isLoading: false,
  RequestClientReducerData: null,
  Clientsname: null,
  AddrequestClient: null,
  UpdaterequestClient: null,
};

const RequestClientReducer = (state = initalState, action) => {
  console.log('ReasonReducer', action);
  switch (action.type) {
    case FETCHREQUESTCLIENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHREQUESTCLIENT_SUCCESS:
      // console.log("fetchSuccesclient",action.payload)
      return {
        ...state,
        isLoading: false,
        RequestClientReducerData: action.payload,
      };
    case FETCHREQUESTCLIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        RequestClientReducerData: action.payload,
      };
    case GETCLIENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETCLIENT_SUCCESS:
      console.log('action.payload', action.payload);
      return {
        ...state,
        isLoading: false,
        Clientsname: action.payload,
      };
    case GETCLIENT_FAIL:
      return {
        ...state,
        isLoading: false,
        Clientsname: action.payload,
      };
    case ADDRQUESTCLIENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case ADDRQUESTCLIENT_SUCCESS:
      console.log('ADDRQUESTCLIENT_SUCCESS.payload', action.payload);
      return {
        ...state,
        isLoading: false,
        AddrequestClient: action.payload,
      };
    case ADDRQUESTCLIENT_FAIL:
      return {
        ...state,
        isLoading: false,
        AddrequestClient: action.payload,
      };
    case UPDATERQUESTCLIENT_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATERQUESTCLIENT_SUCCESS:
      console.log('UpdaterequestClient.payload', action.payload);
      return {
        ...state,
        isLoading: false,
        UpdaterequestClient: action.payload,
      };
    case UPDATERQUESTCLIENT_FAIL:
      return {
        ...state,
        isLoading: false,
        UpdaterequestClient: action.payload,
      };
    default:
      return state;
  }
};
export default RequestClientReducer;
