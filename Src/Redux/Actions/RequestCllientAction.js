import {
  FETCHREQUESTCLIENT_FAILURE,
  FETCHREQUESTCLIENT_PROGRESS,
  FETCHREQUESTCLIENT_SUCCESS,
  DELETEREQUESTCLIENT_FAIL,
  DELETEREQUESTCLIENT_PROGRESS,
  DELETEREQUESTCLIENT_SUCCESS,
  GETCLIENT_FAIL,
  GETCLIENT_PROGRESS,
  GETCLIENT_SUCCESS,
  ADDRQUESTCLIENT_FAIL,
  ADDRQUESTCLIENT_SUCCESS,
  ADDRQUESTCLIENT_PROGRESS,
  UPDATERQUESTCLIENT_FAIL,
  UPDATERQUESTCLIENT_SUCCESS,
  UPDATERQUESTCLIENT_PROGRESS,
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

// functon for dispatching client_request data to RequestClient.js
export function getRequetsClient() {
  return async dispatch => {
    dispatch(
      RequetsClientDispatch({isLoading: true}, FETCHREQUESTCLIENT_PROGRESS),
    );
    try {
      const res = await request({url: '/client-request', method: 'GET'});
      console.log('client-request Response', res.data);
      dispatch(RequetsClientDispatch(res.data, FETCHREQUESTCLIENT_SUCCESS));
    } catch (error) {
      console.log('client-request', error);
      dispatch(error, FETCHREQUESTCLIENT_FAILURE);
    }
  };
}

export function deleteRequetsClient(values) {
  console.log('valuesssssssssssss=>>>>>>>>>>>', values);
  return async dispatch => {
    dispatch(RequetsClientDispatch({}, DELETEREQUESTCLIENT_PROGRESS));
    try {
      const data = await request({
        url: `/client-request/${values}`,
        method: 'DELETE',

        // Accept: 'application/json',
      });
      console.log('DELETEREQUESTCLIENT=>>>>>>>>>>>', data.data.message);
      if (data.data.message) {
        dispatch(RequetsClientDispatch(data.url, DELETEREQUESTCLIENT_SUCCESS));
        Toast.show('DELETEREQUESTCLIENT deleted Successfully');
      }
    } catch (err) {
      console.log('DELETEREQUESTCLIENT err', err);
      dispatch(RequetsClientDispatch(err, DELETEREQUESTCLIENT_FAIL));
      Toast.show('DELETEREQUESTCLIENT Not deleted Successfully');
    }
  };
}
export function getRequestClientsname() {
  return async dispatch => {
    dispatch(RequetsClientDispatch({}, GETCLIENT_PROGRESS));
    try {
      const {data} = await request({url: '/client', method: 'GET'});
      console.log('getResources client response', data.data.clients);
      dispatch(RequetsClientDispatch(data.data.clients, GETCLIENT_SUCCESS));
    } catch (error) {
      dispatch(RequetsClientDispatch(error, GETCLIENT_FAIL));
      console.log('getResources error', error);
    }
  };
}

export function submitRequestClients(newdata, navigation, id) {
  console.log('values', newdata, id);
  return async dispatch => {
    dispatch(RequetsClientDispatch({}, UPDATERQUESTCLIENT_PROGRESS));

    try {
      const {data} = await request({
        url: `/client-request/accept-existing/${id}`,
        method: 'PUT',
        data: newdata,
      });
      console.log('RequetsClientDispatch response', data);
      if (data.message) {
        dispatch(RequetsClientDispatch(data.data, UPDATERQUESTCLIENT_SUCCESS));
        Toast.show('RequetsClientDispatch Added Successfully');
      }
      navigation.navigate('RequestClient');
    } catch (err) {
      console.log('RequetsClientDispatch error', err);
      dispatch(RequetsClientDispatch(err, UPDATERQUESTCLIENT_FAIL));
      Toast.show('RequetsClientDispatch Not Added Successfully');
    }
  };
}

export function AddRequestClients(newdata, navigation, id) {
  console.log('values', newdata, id);
  return async dispatch => {
    dispatch(RequetsClientDispatch({}, ADDRQUESTCLIENT_PROGRESS));
    try {
      const {data} = await request({
        url: `/client-request/accept/${id}`,
        method: 'PUT',
        data: newdata,
      });
      console.log('RequetsClientDispatch response', data);
      if (data.message) {
        dispatch(RequetsClientDispatch(data.data, ADDRQUESTCLIENT_SUCCESS));
        Toast.show('RequetsClientDispatch Added Successfully');
      }
      navigation.navigate('RequestClient');
    } catch (err) {
      console.log('RequetsClientDispatch error', err);
      dispatch(RequetsClientDispatch(err, ADDRQUESTCLIENT_FAIL));
      Toast.show('RequetsClientDispatch Not Added Successfully');
    }
  };
}

const RequetsClientDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
