import {
  FETCH_RESOURCE_REQUEST,
  FETCH_RESOURCE_SUCCESS,
  FETCH_RESOURCE_FAILURE,
  DELETE_RESOURCE_FAILURE,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_REQUEST,
  ADD_RESOURCE_REQUEST,
  ADD_RESOURCE_SUCCESS,
  ADD_RESOURCE_FAILURE,
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

// const fetchResourceRequest = () => {
//   return {type: FETCH_RESOURCE_REQUEST};
// };

// const fetchResourceSuccess = resources => {
//   return {type: FETCH_RESOURCE_SUCCESS, payload: resources};
// };

// const fetchResourceFailuer = error => {
//   return {type: FETCH_RESOURCE_FAILURE, payload: error};
// };

// const deleteResourceRequest = () => {
//   return {type: DELETE_RESOURCE_REQUEST};
// };

// const deleteResourceSuccess = deletedResources => {
//   return {type: DELETE_RESOURCE_SUCCESS, payload: deletedResources};
// };

// const deleteResourceFailuer = error => {
//   return {type: DELETE_RESOURCE_FAILURE, payload: error};
// };

// const addResourceRequest = () => {
//   return {type: ADD_RESOURCE_REQUEST};
// };

// const addResourceSuccess = addResources => {
//   return {type: ADD_RESOURCE_SUCCESS, payload: addResources};
// };

// const addResourceFailuer = error => {
//   return {type: ADD_RESOURCE_FAILURE, payload: error};
// };
// const resourceActions = {
//   fetchResourceFailuer,
//   fetchResourceRequest,
//   fetchResourceSuccess,
//   deleteResourceRequest,
//   deleteResourceSuccess,
//   deleteResourceFailuer,
//   addResourceRequest,
//   addResourceSuccess,
//   addResourceFailuer,
// };

// export default resourceActions;

//For fetching resources
export function getResource() {
  return async dispatch => {
    dispatch(resourceDispatch({isLoading: true}, FETCH_RESOURCE_REQUEST));
    try {
      const data = await request({url: '/resource', method: 'GET'});
      dispatch(
        resourceDispatch(data.data.data.resource, FETCH_RESOURCE_SUCCESS),
      );
    } catch (error) {
      console.log('getResource error', error);
      dispatch(resourceDispatch(error, FETCH_RESOURCE_FAILURE));
    }
  };
}

//For adding resources
export function addresource(values, navigation) {
  return async dispatch => {
    dispatch(resourceDispatch({}, ADD_RESOURCE_REQUEST));
    try {
      const data = await request({
        url: '/resource',
        method: 'POST',
        data: values,
      });
      if (data.message) {
        dispatch(resourceDispatch(data, ADD_RESOURCE_SUCCESS));
        Toast.show('Resource Added Successfully');
      }
      navigation.goBack();
    } catch (error) {
      console.log('addResource error', error);
      dispatch(resourceDispatch(error, ADD_RESOURCE_FAILURE));
      Toast.show('Resource Not Added Successfully');
    }
  };
}

//For deleteing resource
export function deleteResource(values) {
  return async dispatch => {
    dispatch(resourceDispatch({}, DELETE_RESOURCE_REQUEST));
    try {
      const data = await request({
        url: `/resource/${values}`,
        method: 'DELETE',
      });
      if (data.data.message) {
        dispatch(resourceDispatch(data, DELETE_RESOURCE_SUCCESS));
        Toast.show('Resource deleted Successfully');
      }
    } catch (err) {
      console.log('deleteResource error', err);
      dispatch(resourceDispatch(err, DELETE_RESOURCE_FAILURE));
      Toast.show('Resource Not deleted Successfully');
    }
  };
}

resourceDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
