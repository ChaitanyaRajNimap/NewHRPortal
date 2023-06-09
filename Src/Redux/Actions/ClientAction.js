import {
  FETCHEXTERNALPROD_PROGRESS,
  FETCHEXTERNALPROD_SUCCESS,
  FETCHEXTERNALPROD_FAIL,
  GETCLIENT_PROGRESS,
  GETCLIENT_SUCCESS,
  GETCLIENT_FAIL,
  ADDCLIENT_PROGRESS,
  ADDCLIENT_SUCCESS,
  ADDCLIENT_FAIL,
  DELETECLIENT_PROGRESS,
  DELETECLIENT_SUCCESS,
  DELETECLIENT_FAIL,
  EDITCLIENT_PROGRESS,
  EDITCLIENT_SUCCESS,
  EDITCLIENT_FAIL,
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

//For fetching external product data
export function getExternalProduct() {
  return async dispatch => {
    dispatch(clientDispatch({isLoading: true}, FETCHEXTERNALPROD_PROGRESS));
    try {
      const data = await request({url: '/external-products', method: 'GET'});
      // console.log(
      //   'getExternalProduct response from Client :====> ',
      //   data.data.data.product,
      // );
      dispatch(
        clientDispatch(data.data.data.product, FETCHEXTERNALPROD_SUCCESS),
      );
    } catch (error) {
      dispatch(clientDispatch(error, FETCHEXTERNALPROD_FAIL));
      console.log('getExternalProduct error', error);
    }
  };
}

//For getting client to display
export function getClient() {
  return async dispatch => {
    dispatch(clientDispatch({}, GETCLIENT_PROGRESS));
    try {
      const data = await request({url: '/client', method: 'GET'});
      // console.log('GetClient response from Client :====> ', data.data.data.clients);
      dispatch(clientDispatch(data.data.data.clients, GETCLIENT_SUCCESS));
    } catch (error) {
      dispatch(clientDispatch(error, GETCLIENT_FAIL));
      console.log('getClient error', error);
    }
  };
}

//For adding client
export function addClient(values, navigation) {
  return async dispatch => {
    dispatch(clientDispatch({}, ADDCLIENT_PROGRESS));
    try {
      const data = await request({
        url: '/client',
        method: 'POST',
        data: values,
      });
      // console.log('addClient response data ====>', data);
      if (data.message) {
        dispatch(clientDispatch(data, ADDCLIENT_SUCCESS));
        Toast.show(data.message);
      }
      navigation.goBack();
    } catch (err) {
      console.log('addClient error', err);
      dispatch(clientDispatch(err, ADDCLIENT_FAIL));
      Toast.show('Client Not Added Successfully');
    }
  };
}

//For deleteing client
export function deleteClient(values) {
  return async dispatch => {
    dispatch(clientDispatch({}, DELETECLIENT_PROGRESS));
    try {
      const data = await request({
        url: `/client/${values}`,
        method: 'DELETE',
      });
      // console.log('deleteClient response ====>', data.data);
      if (data.data.message) {
        dispatch(clientDispatch(data, DELETECLIENT_SUCCESS));
        Toast.show('Client deleted Successfully');
      }
    } catch (err) {
      console.log('deleteClient error', err);
      dispatch(clientDispatch(err, DELETECLIENT_FAIL));
      Toast.show('Client Not deleted Successfully');
    }
  };
}

//For editing client
export function editClient(values, id, navigation) {
  return async dispatch => {
    dispatch(clientDispatch({isLoading: true}, EDITCLIENT_PROGRESS));
    try {
      const data = await request({
        url: `/client/${id}`,
        method: 'PUT',
        data: values,
      });
      console.log('editClient response data ====>', data);
      if (data.message) {
        dispatch(clientDispatch(data, EDITCLIENT_SUCCESS));
        Toast.show('Client updated Successfully');
      }
      navigation.goBack();
    } catch (err) {
      console.log('editClient error', err);
      dispatch(clientDispatch(err, EDITCLIENT_FAIL));
      Toast.show('Client Not Edited Successfully');
    }
  };
}

clientDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
