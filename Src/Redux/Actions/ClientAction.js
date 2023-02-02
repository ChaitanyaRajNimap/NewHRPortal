import {
  GETCLIENT_PROGRESS,
  GETCLIENT_SUCCESS,
  GETCLIENT_FAIL,
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

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

clientDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
