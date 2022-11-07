import {
  FETCH_RESOURCE_REQUEST,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  DELETE_RESOURCE_FAILURE,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_REQUEST,
} from '../ActionConstant';

const fetchResourceRequest = () => {
  return {type: FETCH_RESOURCE_REQUEST};
};

const fetchResourceSuccess = resources => {
  return {type: FETCH_RESOURCE_SUCCESS, payload: resources};
};

const fetchResourceFailuer = error => {
  return {type: FETCH_RESOURCE_FAILURE, payload: error};
};

const deleteResourceRequest = () => {
  return {type: DELETE_RESOURCE_REQUEST};
};

const deleteResourceSuccess = deletedResources => {
  return {type: DELETE_RESOURCE_SUCCESS, payload: deletedResources};
};

const deleteResourceFailuer = error => {
  return {type: DELETE_RESOURCE_FAILURE, payload: error};
};

const resourceActions = {
  fetchResourceFailuer,
  fetchResourceRequest,
  fetchResourceSuccess,
  deleteResourceRequest,
  deleteResourceSuccess,
  deleteResourceFailuer,
};

export default resourceActions;
