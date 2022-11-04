import {
  GETPROJECTTARGET_PROGRESS,
  GETPROJECTTARGET_SUCCESS,
  GETPROJECTTARGET_FAIL,
  EDITPROJECTTARGET_PROGRESS,
  EDITPROJECTTARGET_SUCCESS,
  EDITPROJECTTARGET_FAIL,
  GETRESOURCE_PROGRESS,
  GETRESOURCE_SUCCESS,
  GETRESOURCE_FAIL,
  ADDPROJECT_PROGRESS,
  ADDPROJECT_SUCCESS,
  ADDPROJECT_FAIL,
  DELETEPROJECT_PROGRESS,
  DELETEPROJECT_SUCCESS,
  DELETEPROJECT_FAIL,
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

export function getProjectTarget() {
  return async dispatch => {
    dispatch(
      projectTargetDispatch({isLoading: true}, GETPROJECTTARGET_PROGRESS),
    );
    try {
      const res = await request({url: '/project-target', method: 'GET'});
      //console.log('Project Target Response', res.data.data);
      dispatch(
        projectTargetDispatch(res.data.data.project, GETPROJECTTARGET_SUCCESS),
      );
    } catch (error) {
      console.log('Project Target error', error);
      dispatch(error, GETPROJECTTARGET_FAIL);
    }
  };
}

export function updateProjectTarget(resource, date, id, navigation) {
  return async dispatch => {
    dispatch(
      projectTargetDispatch({isLoading: true}, EDITPROJECTTARGET_PROGRESS),
    );
    var formData = {
      resource: resource,
      date: date,
    };
    try {
      const data = await request({
        url: `/project-target/${id}`,
        method: 'PUT',
        data: formData,
      });
     // console.log('updateProjectTarget response', data.data);
      if (data.message) {
        dispatch(projectTargetDispatch(data, EDITPROJECTTARGET_SUCCESS));
        Toast.show('Project Target Updated Successfully');
      }
      navigation.goBack();
    } catch (err) {
      console.log('updateProjectTarget error', err);
      dispatch(projectTargetDispatch(err, EDITPROJECTTARGET_FAIL));
      Toast.show('Project Target Not Updated Successfully');
    }
  };
}

export function getResources() {
  return async dispatch => {
    dispatch(projectTargetDispatch({}, GETRESOURCE_PROGRESS));
    try {
      const data = await request({url: '/resource', method: 'GET'});
     // console.log('getResources response', data.data.data.resources);
      dispatch(
        projectTargetDispatch(data.data.data.resources, GETRESOURCE_SUCCESS),
      );
    } catch (error) {
      dispatch(projectTargetDispatch(error, GETRESOURCE_FAIL));
      console.log('getResources error', error);
    }
  };
}

export function addProjectTarget(values, navigation) {
  return async dispatch => {
    dispatch(projectTargetDispatch({}, ADDPROJECT_PROGRESS));
    try {
      const {data} = await request({
        url: '/project-target',
        method: 'POST',
        data: values,
      });
      //console.log('addProjectTarget response', data);
      if (data.data.message) {
        dispatch(data.data, ADDPROJECT_SUCCESS);
        Toast.show('Project Target Added Successfully');
      }
      navigation.goBack();
    } catch (err) {
      console.log('addProjectTarget error', err);
      dispatch(projectTargetDispatch(err, ADDPROJECT_FAIL));
      Toast.show('Project Target Not Added Successfully');
    }
  };
}

export function deleteProjectTarget(values) {
  return async dispatch => {
    dispatch(projectTargetDispatch({}, DELETEPROJECT_PROGRESS));
    try {
      const data = await request({
        url: `/project-target/${values}`,
        method: 'DELETE',
      });
     // console.log('deleteProjectTarget response', data.data);
      if (data.data.message) {
        dispatch(projectTargetDispatch(data, DELETEPROJECT_SUCCESS));
        Toast.show('Project Target deleted Successfully');
      }
    } catch (err) {
      console.log('deleteProjectTarget error', err);
      dispatch(projectTargetDispatch(err, DELETEPROJECT_FAIL));
      Toast.show('Project Target Not deleted Successfully');
    }
  };
}

projectTargetDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
