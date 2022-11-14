import request from '../../../../Util/request';
import technologyActions from '../../../../Redux/Actions/technologyActions';
import resourceActions from '../../../../Redux/Actions/resourceActions';

const fetchTechnology = () => {
  return async dispatch => {
    dispatch(technologyActions.fetchTechnologyRequest);
    try {
      const {data, status} = await request({url: '/technology', method: 'GET'});

      if (status === 200) {
        dispatch(technologyActions.fetchTechnologySuccess(data));
      }
    } catch (error) {
      dispatch(technologyActions.fetchTechnologyFailuer(error));
    }
  };
};

const AddResource = postObject => {
  return async dispatch => {
    dispatch(resourceActions.addResourceRequest);
    try {
      const {data, status} = await request({
        url: '/resource',
        method: 'POST',
        data: postObject,
      });

      if (status === 200) {
        dispatch(resourceActions.addResourceSuccess(data));
      }
    } catch (error) {
      dispatch(resourceActions.addResourceFailuer(error));
    }
  };
};

export {fetchTechnology, AddResource};
