import {
  FETCH_TECHNOLOGY_REQUEST,
  FETCH_TECHNOLOGY_FAILURE,
  FETCH_TECHNOLOGY_SUCCESS,
} from '../ActionConstant';

const fetchTechnologyRequest = () => {
  return {type: FETCH_TECHNOLOGY_REQUEST};
};

const fetchTechnologySuccess = resources => {
  return {type: FETCH_TECHNOLOGY_SUCCESS, payload: resources};
};

const fetchTechnologyFailuer = error => {
  return {type: FETCH_TECHNOLOGY_FAILURE, payload: error};
};

const technologyActions = {
  fetchTechnologyFailuer,
  fetchTechnologyRequest,
  fetchTechnologySuccess,
};

export default technologyActions;
