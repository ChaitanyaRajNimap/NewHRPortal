import {
  FETCH_RESOURCE_REQUEST,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  DELETE_RESOURCE_FAILURE,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_REQUEST,
} from '../ActionConstant';

const initalState = {
  resourceRequest: false,
  resourceSuccess: null,
  resourceError: null,
  deleteResourceRequest: false,
  deleteResourceSuccess: null,
  deleteResourceError: null,
};

const resourceReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_RESOURCE_REQUEST:
      return {
        ...state,
        resourceRequest: true,
      };
    case FETCH_RESOURCE_SUCCESS:
      return {
        ...state,
        resourceSuccess: action.payload,
        resourceRequest: false,
        resourceError: null,
      };
    case FETCH_RESOURCE_FAILURE:
      return {
        ...state,
        resourceRequest: false,
        resourceSuccess: null,
        resourceError: action.payload,
      };
    case DELETE_RESOURCE_REQUEST:
      return {
        ...state,
        deleteResourceRequest: true,
      };
    case DELETE_RESOURCE_SUCCESS:
      return {
        ...state,
        deleteResourceSuccess: action.payload,
        deleteResourceRequest: false,
        deleteResourceError: null,
      };
    case DELETE_RESOURCE_FAILURE:
      return {
        ...state,
        deleteResourceRequest: false,
        deleteResourceSuccess: null,
        deleteResourceError: action.payload,
      };
    default:
      return state;
  }
};
export default resourceReducer;
