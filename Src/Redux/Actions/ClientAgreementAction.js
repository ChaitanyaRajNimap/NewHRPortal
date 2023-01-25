import {
  FETCHCLIENTAGREEMENT_PROGRESS,
  FETCHCLIENTAGREEMENT_SUCCESS,
  FETCHCLIENTAGREEMENT_FAIL,
  GETRESOURCE_PROGRESS,
  GETRESOURCE_SUCCESS,
  GETRESOURCE_FAIL,
  GETCLIENT_PROGRESS,
  GETCLIENT_SUCCESS,
  GETCLIENT_FAIL,
  ADDCLIENTAGREEMENT_PROGRESS,
  ADDCLIENTAGREEMENT_SUCCESS,
  ADDCLIENTAGREEMENT_FAIL,
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

//For getting initial clientAgreement data to display
export function getInitialClientAgreement() {
  return async dispatch => {
    dispatch(
      clientAgreementDispatch({isLoading: true}, FETCHCLIENTAGREEMENT_PROGRESS),
    );
    try {
      const res = await request({url: '/client-agreement', method: 'GET'});
      console.log('Client Agreement Response', res.data.data);
      dispatch(
        clientAgreementDispatch(
          res.data.data.clientAgreements,
          FETCHCLIENTAGREEMENT_SUCCESS,
        ),
      );
    } catch (error) {
      console.log('Client Agreement Error', error);
      dispatch(error, FETCHCLIENTAGREEMENT_FAIL);
    }
  };
}

//For getting resources to display in addClientAgreement
export function getResources() {
  return async dispatch => {
    dispatch(clientAgreementDispatch({}, GETRESOURCE_PROGRESS));
    try {
      const data = await request({url: '/resource', method: 'GET'});
      console.log('getResources response', data.data.data.resources);
      dispatch(
        clientAgreementDispatch(data.data.data.resources, GETRESOURCE_SUCCESS),
      );
    } catch (error) {
      dispatch(clientAgreementDispatch(error, GETRESOURCE_FAIL));
      console.log('getResources error', error);
    }
  };
}

//For getting client to display in addClientAgreement
export function getClient() {
  return async dispatch => {
    dispatch(clientAgreementDispatch({}, GETCLIENT_PROGRESS));
    try {
      const data = await request({url: '/client', method: 'GET'});
      // console.log('getClient response', data.data.data.clients);
      dispatch(
        clientAgreementDispatch(data.data.data.clients, GETCLIENT_SUCCESS),
      );
    } catch (error) {
      dispatch(clientAgreementDispatch(error, GETCLIENT_FAIL));
      console.log('getClient error', error);
    }
  };
}

//For adding client agreemnet data
export function addClientAgreement(values, navigation) {
  console.log('addClientAgreement : ', values);
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
      console.log('GO BACK REACHED!!!!!!!');
    } catch (err) {
      console.log('addClientAgreement error', err);
      dispatch(clientAgreementDispatch(err, ADDCLIENTAGREEMENT_FAIL));
      Toast.show('Client Agreement Not Added Successfully');
    }
  };
}

clientAgreementDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
