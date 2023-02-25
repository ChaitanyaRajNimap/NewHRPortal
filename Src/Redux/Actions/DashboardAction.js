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
  GETTOPCLIENTDETAILS_PROGRESS,
  GETTOPCLIENTDETAILS_SUCCESS,
  GETTOPCLIENTDETAILS_FAIL,
  ADDNOTES_PROGRESS,
  ADDNOTES_SUCCESS,
  ADDNOTES_FAIL,
  EDITNOTES_PROGRESS,
  EDITNOTES_SUCCESS,
  EDITNOTES_FAIL,
  DELETENOTES_PROGRESS,
  DELETENOTES_SUCCESS,
  DELETENOTES_FAIL,
  RESET_NOTES,
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
      console.log('getDashboardHead error from dashboard :====>', error);
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
      console.log('getTopClients error from dashboard :====>', error);
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
      console.log('getNotes error from dashboard :====>', error);
    }
  };
}

//For adding note
export function addNote(values, navigation) {
  return async dispatch => {
    dispatch(dashboardDispatch({}, ADDNOTES_PROGRESS));
    try {
      const data = await request({
        url: '/note',
        method: 'POST',
        data: values,
      });
      console.log('addNote response data ====>', data.data.message);
      if (data.data.message) {
        dispatch(dashboardDispatch(data, ADDNOTES_SUCCESS));
        Toast.show(data.data.message);
      }
      navigation.goBack();
    } catch (err) {
      console.log('addNote error', err);
      dispatch(dashboardDispatch(err, ADDNOTES_FAIL));
      Toast.show(err);
    }
  };
}

//For fetching top clients
export function getTopClientDetails(id) {
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETTOPCLIENTDETAILS_PROGRESS));
    try {
      const data = await request({
        url: `/client/top-client/${id}`,
        method: 'GET',
      });
      // console.log(
      //   'getTopClientDetails response from dashboard :====>',
      //   data.data.data,
      // );
      dispatch(dashboardDispatch(data.data.data, GETTOPCLIENTDETAILS_SUCCESS));
      return data.data.data;
    } catch (error) {
      dispatch(dashboardDispatch(error, GETTOPCLIENTDETAILS_FAIL));
      console.log('getTopClientDetails error from dashboard :====>', error);
    }
  };
}

//For editing note
export function editNote(values, id, navigation) {
  // console.log('VAL X ', values, 'ID X ', id);
  return async dispatch => {
    dispatch(dashboardDispatch({isLoading: true}, EDITNOTES_PROGRESS));
    try {
      const data = await request({
        url: `/note/${id}`,
        method: 'PUT',
        data: values,
      });
      // console.log('editNote response data ====>', data.data.message);
      if (data.data.message) {
        dispatch(dashboardDispatch(data, EDITNOTES_SUCCESS));
        Toast.show(data.data.message);
      }
      navigation.goBack();
    } catch (err) {
      console.log('editNote error', err);
      dispatch(dashboardDispatch(err, EDITNOTES_FAIL));
      Toast.show(err);
    }
  };
}

//For deleteing note
export function deleteNotes(id) {
  return async dispatch => {
    dispatch(dashboardDispatch({}, DELETENOTES_PROGRESS));
    try {
      const data = await request({
        url: `/note/${id}`,
        method: 'DELETE',
      });
      console.log('deleteNotes response ====>', data);
      if (data.data.message) {
        dispatch(dashboardDispatch(data, DELETENOTES_SUCCESS));
        Toast.show(data.data.message);
      }
    } catch (err) {
      console.log('deleteNotes error', err);
      dispatch(dashboardDispatch(err, DELETENOTES_FAIL));
      Toast.show(err);
    }
  };
}

//For deleteing note
export function resetNotes() {
  return dispatch => {
    dispatch(dashboardDispatch(null, DELETENOTES_SUCCESS));
  };
}

//For clearing top client details
export function resetTopClientDetails() {
  return dispatch => {
    dispatch(dashboardDispatch(null, GETTOPCLIENTDETAILS_SUCCESS));
  };
}

dashboardDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
