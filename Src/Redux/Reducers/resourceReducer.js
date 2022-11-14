import {
  FETCH_RESOURCE_REQUEST,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  DELETE_RESOURCE_FAILURE,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_REQUEST,
  ADD_RESOURCE_REQUEST,
  ADD_RESOURCE_SUCCESS,
  ADD_RESOURCE_FAILURE,
} from '../ActionConstant';

const initalState = {
  resourceRequest: false,
  resourceSuccess: null,
  resourceError: null,
  deleteResourceRequest: false,
  deleteResourceSuccess: null,
  deleteResourceError: null,
  addResourceRequest: false,
  addResourceSuccess: null,
  addResourceError: null,
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
    case ADD_RESOURCE_REQUEST:
      return {
        ...state,
        addResourceRequest: true,
      };
    case ADD_RESOURCE_SUCCESS:
      return {
        ...state,
        addResourceSuccess: action.payload,
        addResourceRequest: false,
        addResourceError: null,
      };
    case ADD_RESOURCE_FAILURE:
      return {
        ...state,
        addResourceRequest: false,
        addResourceSuccess: null,
        addResourceError: action.payload,
      };
    default:
      return state;
  }
};
export default resourceReducer;
