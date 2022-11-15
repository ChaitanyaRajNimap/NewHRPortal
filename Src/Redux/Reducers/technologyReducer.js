import {
  FETCH_TECHNOLOGY_FAILURE,
  FETCH_TECHNOLOGY_REQUEST,
  FETCH_TECHNOLOGY_SUCCESS,
} from '../ActionConstant';

const initalState = {
  technologyRequest: false,
  technologySuccess: null,
  technologyError: null,
};

const technologyReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_TECHNOLOGY_REQUEST:
      return {
        ...state,
        technologyRequest: true,
      };
    case FETCH_TECHNOLOGY_SUCCESS:
      return {
        ...state,
        technologySuccess: action.payload,
        technologyRequest: false,
        technologyError: null,
      };
    case FETCH_TECHNOLOGY_FAILURE:
      return {
        ...state,
        technologyRequest: false,
        technologySuccess: null,
        technologyError: action.payload,
      };
    default:
      return state;
  }
};
export default technologyReducer;
