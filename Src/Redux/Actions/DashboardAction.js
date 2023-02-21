import {
  GETDASHBOARDHEAD_PROGRESS,
  GETDASHBOARDHEAD_SUCCESS,
  GETDASHBOARDHEAD_FAIL,
  GETTOPCLIENTS_PROGRESS,
  GETTOPCLIENTS_SUCCESS,
  GETTOPCLIENTS_FAIL,
  GETNOTES_PROGRESS,
  GETNOTES_SUCCESS,
  GETNOTES_FAIL,
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

//For fetching dashboard head
export function getDashboardHead() {
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETDASHBOARDHEAD_PROGRESS));
    try {
      const data = await request({url: '/home/dashboard-head', method: 'GET'});
      // console.log('getDashboardHead response from dashboard :====>', data.data);
      dispatch(dashboardDispatch(data.data, GETDASHBOARDHEAD_SUCCESS));
    } catch (error) {
      dispatch(dashboardDispatch(error, GETDASHBOARDHEAD_FAIL));
      console.log('getDashboardHead error from dashboard :====>');
    }
  };
}

//For fetching top clients
export function getTopClients() {
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETTOPCLIENTS_PROGRESS));
    try {
      const data = await request({url: '/client/top-client', method: 'GET'});
      // console.log(
      //   'getTopClients response from dashboard :====>',
      //   data.data.client,
      // );
      dispatch(dashboardDispatch(data.data.client, GETTOPCLIENTS_SUCCESS));
    } catch (error) {
      dispatch(dashboardDispatch(error, GETTOPCLIENTS_FAIL));
      console.log('getTopClients error from dashboard :====>');
    }
  };
}

//For fetching top clients
export function getNotes() {
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETNOTES_PROGRESS));
    try {
      const data = await request({url: '/note', method: 'GET'});
      // console.log(
      //   'getNotes response from dashboard :====>',
      //   data.data.data.notes,
      // );
      dispatch(dashboardDispatch(data.data.data.notes, GETNOTES_SUCCESS));
    } catch (error) {
      dispatch(dashboardDispatch(error, GETNOTES_FAIL));
      console.log('getNotes error from dashboard :====>');
    }
  };
}

dashboardDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};