import {
  GETCLIENTAGREEMENT_PROGRESS,
  GETCLIENTAGREEMENT_SUCCESS,
  GETCLIENTAGREEMENT_FAIL,
  ADDCLIENTAGREEMENT_PROGRESS,
  ADDCLIENTAGREEMENT_SUCCESS,
  ADDCLIENTAGREEMENT_FAIL,
  EDITCLIENTAGREEMENT_PROGRESS,
  EDITCLIENTAGREEMENT_SUCCESS,
  EDITCLIENTAGREEMENT_FAIL,
  DELETECLIENTAGREEMENT_PROGRESS,
  DELETECLIENTAGREEMENT_SUCCESS,
  DELETECLIENTAGREEMENT_FAIL,
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

export function getClientAgreement() {
  return async dispatch => {
    dispatch(
      clientAgreementDispatch({isLoading: true}, GETCLIENTAGREEMENT_PROGRESS),
    );
    try {
      const res = await request({uri: '/client-agreement', method: 'GET'});
      console.log('Client Agreement Response', res.data.data);
      dispatch(
        clientAgreementDispatch(
          res.data.data.client,
          GETCLIENTAGREEMENT_SUCCESS,
        ),
      );
    } catch (error) {
      console.log('Client Agreement Error', error);
      dispatch(error, GETCLIENTAGREEMENT_FAIL);
    }
  };
}

export function addClientAgreement(values, navigation) {
  return async dispatch => {
    dispatch(clientAgreementDispatch({}, ADDCLIENTAGREEMENT_PROGRESS));
    try {
      const {data} = await request({
        url: '/client-agreement',
        method: 'POST',
        data: values,
      });
      console.log('addClientAgreement response', data);
      if (data.data.message) {
        dispatch(data.data, ADDCLIENTAGREEMENT_SUCCESS);
        Toast.show('Client Agreement Added Successfully');
      }
      navigation.goBack();
    } catch (error) {
      console.log('addClientAgreement error', error);
      dispatch(clientAgreementDispatch(error, ADDCLIENTAGREEMENT_FAIL));
      Toast.show('Client Agreement Not Added Successfully');
    }
  };
}

export function updateClientAgreement(resource, date, id, navigation) {
  return async dispatch => {
    dispatch(
      clientAgreementDispatch({isLoading: true}, EDITCLIENTAGREEMENT_PROGRESS),
    );
    var formData = {
      resource: resource,
      date: date,
    };
    try {
      const data = await request({
        url: `/client-agreement/${id}`,
        method: 'PUT',
        data: formData,
      });
      console.log('updateClientAgreement response', data.data);
      if (data.message) {
        dispatch(clientAgreementDispatch(data, EDITCLIENTAGREEMENT_SUCCESS));
        Toast.show('Client Agreement Updated Successfully');
      }
      navigation.goBack();
    } catch (error) {
      console.log('updateClientAgreement error', error);
      dispatch(clientAgreementDispatch(error, EDITCLIENTAGREEMENT_FAIL));
      Toast.show('Client Agreement Not Updated Successfully');
    }
  };
}

export function deleteClientAgreement(values) {
  return async dispatch => {
    dispatch(clientAgreementDispatch({}, DELETECLIENTAGREEMENT_PROGRESS));
    try {
      const data = await request({
        url: `/client-agreement/${values}`,
        method: 'DELETE',
      });
      console.log('deleteClientAgreement response', data.data);
      if (data.data.message) {
        dispatch(clientAgreementDispatch(data, DELETECLIENTAGREEMENT_SUCCESS));
        Toast.show('Client Agreement Deleted Successfully');
      }
    } catch (error) {
      console.log('deleteClientAgreement error', error);
      dispatch(clientAgreementDispatch(error, DELETECLIENTAGREEMENT_FAIL));
      Toast.show('Client Agreement Not Deleted Successfully');
    }
  };
}

clientAgreementDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
