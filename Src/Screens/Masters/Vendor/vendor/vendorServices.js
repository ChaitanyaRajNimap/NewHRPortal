import request from '../../../../Util/request';
import venderActions from '../../../../Redux/Actions/vendorAction';

const fetchVenders = () => {
  return async dispatch => {
    dispatch(venderActions.fetchVendorRequest);
    try {
      const { data, status } = await request({ url: '/vendor', method: 'GET' });
      // console.log("Vendor response", data.data.vendors)
      if (status === 200) {
        dispatch(venderActions.fetchVendorSuccess(data));
      }
    } catch (error) {
      dispatch(venderActions.fetchVendorSuccess(error));
    }
  };
};

export { fetchVenders };
