import {
  FETCH_VENDER_REQUEST,
  FETCH_VENDER_FAILURE,
  FETCH_VENDER_SUCCESS,
} from '../ActionConstant';

const initalState = {
  vendorRequest: false,
  vendorSuccess: null,
  vendorError: null,
};

const vendorReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_VENDER_REQUEST:
      return {
        ...state,
        vendorRequest: true,
      };
    case FETCH_VENDER_SUCCESS:
      return {
        vendorSuccess: action.payload,
        vendorRequest: false,
        vendorError: null,
      };
    case FETCH_VENDER_FAILURE:
      return {
        vendorRequest: false,
        vendorSuccess: null,
        vendorError: action.payload,
      };
    default:
      return state;
  }
};
export default vendorReducer;
