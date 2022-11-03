import {
  FETCH_VENDER_FAILURE,
  FETCH_VENDER_SUCCESS,
  FETCH_VENDER_REQUEST,
} from '../ActionConstant';

const fetchVendorRequest = () => {
  return {type: FETCH_VENDER_REQUEST};
};

const fetchVendorSuccess = venders => {
  return {type: FETCH_VENDER_SUCCESS, payload: venders};
};

const fetchVendorFailuer = error => {
  return {type: FETCH_VENDER_FAILURE, payload: error};
};

const venderActions = {
  fetchVendorFailuer,
  fetchVendorRequest,
  fetchVendorSuccess,
};

export default venderActions;
