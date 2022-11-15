import request from '../../../Util/request';
import resourceActions from '../../../Redux/Actions/resourceActions';

const fetchResurces = () => {
  return async dispatch => {
    dispatch(resourceActions.fetchResourceRequest);
    try {
      const {data, status} = await request({url: '/resource', method: 'GET'});

      if (status === 200) {
        dispatch(resourceActions.fetchResourceSuccess(data));
      }
    } catch (error) {
      dispatch(resourceActions.fetchResourceFailuer(error));
    }
  };
};

const deleteResource = id => {
  return async dispatch => {
    dispatch(resourceActions.deleteResourceRequest);
    try {
      const response = await request({
        url: `/resource/${id}`,
        method: 'delete',
      });

      console.log(response);
      if (response.status === 200) {
        dispatch(resourceActions.deleteResourceSuccess(response.data));
      }
    } catch (error) {
      dispatch(resourceActions.deleteResourceFailuer(error));
    }
  };
};
export {fetchResurces, deleteResource};
