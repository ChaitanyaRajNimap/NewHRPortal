import {
  GETCLIENT_PROGRESS,
  GETCLIENT_SUCCESS,
  GETCLIENT_FAIL,
} from '../ActionConstant';

const initialState = {
  isLoading: false,
  getClientData: null,
};

const ClientReducer = (state = initialState, action) => {
  // console.log('ClientReducer', action);
  switch (action.type) {
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
    default:
      return state;
  }
};

export default ClientReducer;
