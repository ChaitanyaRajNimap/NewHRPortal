import request from '../../../../Util/request';
import technologyActions from '../../../../Redux/Actions/technologyActions';

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

export {fetchTechnology};
