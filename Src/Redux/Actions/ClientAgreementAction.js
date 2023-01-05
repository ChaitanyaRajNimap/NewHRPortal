import {
  FETCHCLIENTAGREEMENT_PROGRESS,
  FETCHCLIENTAGREEMENT_SUCCESS,
  FETCHCLIENTAGREEMENT_FAIL,
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

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

clientAgreementDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
