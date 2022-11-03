import {
  GETPROJECTTARGET_PROGRESS,
  GETPROJECTTARGET_SUCCESS,
  GETPROJECTTARGET_FAIL,
} from '../ActionConstant';
import request from '../../Util/request';

export function getResources() {
  return async dispatch => {
    dispatch(
      projectTargetDispatch({isLoading: true}, GETPROJECTTARGET_PROGRESS),
    );
    try {
      const res = await request({url: '/project-target', method: 'GET'});
      console.log('Project Target Response', res.data.data);
      dispatch(
        projectTargetDispatch(res.data.data.project, GETPROJECTTARGET_SUCCESS),
      );
    } catch (error) {
      console.log('Project Target error', error);
      dispatch(error, GETPROJECTTARGET_FAIL);
    }
  };
}

projectTargetDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
