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
  GETCURRENTRES_PROGRESS,
  GETCURRENTRES_SUCCESS,
  GETCURRENTRES_FAIL,
  GETCURRENTRESFILTER_PROGRESS,
  GETCURRENTRESFILTER_SUCCESS,
  GETCURRENTRESFILTER_FAIL,
  GETDASHUPCOMINGRES_PROGRESS,
  GETDASHUPCOMINGRES_SUCCESS,
  GETDASHUPCOMINGRES_FAIL,
  GETDASHUPCOMINGRESFILTER_PROGRESS,
  GETDASHUPCOMINGRESFILTER_SUCCESS,
  GETDASHUPCOMINGRESFILTER_FAIL,
  GETDASHPROJECTTARGET_PROGRESS,
  GETDASHPROJECTTARGET_SUCCESS,
  GETDASHPROJECTTARGET_FAIL,
  GETDASHPROJECTTARGETFILTER_PROGRESS,
  GETDASHPROJECTTARGETFILTER_SUCCESS,
  GETDASHPROJECTTARGETFILTER_FAIL,
  GETRESCONTRACTEND_PROGRESS,
  GETRESCONTRACTEND_SUCCESS,
  GETRESCONTRACTEND_FAIL,
  GETPURCHASEORDEREND_PROGRESS,
  GETPURCHASEORDEREND_SUCCESS,
  GETPURCHASEORDEREND_FAIL,
  GETCLIENTAGREEMENTEND_PROGRESS,
  GETCLIENTAGREEMENTEND_SUCCESS,
  GETCLIENTAGREEMENTEND_FAIL,
  GETTECHNOLOGY_PROGRESS,
  GETTECHNOLOGY_SUCCESS,
  GETTECHNOLOGY_FAIL,
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

//For fetching current resources
export function getCurrentRes() {
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETCURRENTRES_PROGRESS));
    try {
      const data = await request({
        url: '/home/current-resource?search=',
        method: 'GET',
      });
      // console.log('getCurrentRes response from dashboard :====>', data.data);
      dispatch(dashboardDispatch(data.data, GETCURRENTRES_SUCCESS));
    } catch (error) {
      dispatch(dashboardDispatch(error, GETCURRENTRES_FAIL));
      console.log('getCurrentRes error from dashboard :====>', error);
    }
  };
}

//For fetching current resources filter data
export function getCurrentResFilter(location, technology, experience) {
  console.log('getCurrentResFilter ACTION REACHED!!!');
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETCURRENTRESFILTER_PROGRESS));
    try {
      console.log('getCurrentResFilter TRY REACHED!!!');
      const data = await request({
        url: `/home/current-resource-filter?location=${location}&Technology=${technology}&exp=${experience}`,
        method: 'GET',
      });
      console.log(
        'getCurrentResFilter response from dashboard :F====>',
        data.data.data.data,
      );
      dispatch(
        dashboardDispatch(data.data.data.data, GETCURRENTRESFILTER_SUCCESS),
      );
    } catch (error) {
      dispatch(dashboardDispatch(error.data.message, GETCURRENTRESFILTER_FAIL));
      // console.log(
      //   'getCurrentResFilter error from dashboard :F====>',
      //   error.data.message,
      // );
    }
  };
}

//For fetching dashboard upcoming resource
export function getDashUpcomingRes() {
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETDASHUPCOMINGRES_PROGRESS));
    try {
      const data = await request({
        url: '/resource/dashboard-upcoming-resource?search=',
        method: 'GET',
      });
      // console.log(
      //   'getDashUpcomingRes response from dashboard :====>',
      //   data.data,
      // );
      dispatch(dashboardDispatch(data.data, GETDASHUPCOMINGRES_SUCCESS));
    } catch (error) {
      dispatch(dashboardDispatch(error, GETDASHUPCOMINGRES_FAIL));
      console.log('getDashUpcomingRes error from dashboard :====>', error);
    }
  };
}

//For fetching dashboard upcoming resource filter data
export function getDashUpcomingResFilter(location, technology, experience) {
  console.log('getDashUpcomingResFilter ACTION REACHED!!!');
  console.log(
    'getDashUpcomingResFilter values : ',
    location,
    technology,
    experience,
  );
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETDASHUPCOMINGRESFILTER_PROGRESS));
    try {
      console.log('getDashUpcomingResFilter TRY REACHED!!!');
      const data = await request({
        url: `/home/upcoming-resource-filter?location=${location}&Technology=${technology}&exp=${experience}`,
        // url: `/resource/dashboard-upcoming-resource?location=${location}&Technology=${technology}&exp=${experience}`,
        method: 'GET',
      });
      console.log(
        'getDashUpcomingResFilter response from dashboard :F====>',
        data,
      );
      // dispatch(dashboardDispatch(data.data, GETDASHUPCOMINGRESFILTER_SUCCESS));
    } catch (error) {
      // dispatch(
      //   dashboardDispatch(error.data.message, GETDASHUPCOMINGRESFILTER_FAIL),
      // );
      console.log(
        'getDashUpcomingResFilter error from dashboard :====>',
        error.data.message,
      );
    }
  };
}

//For fetching dashboard project target
export function getDashProjectTarget() {
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETDASHPROJECTTARGET_PROGRESS));
    try {
      const data = await request({
        url: '/home/project-target-dashboard?search=',
        method: 'GET',
      });
      // console.log(
      //   'getDashProjectTarget response from dashboard :====>',
      //   data.data,
      // );
      dispatch(dashboardDispatch(data.data, GETDASHPROJECTTARGET_SUCCESS));
    } catch (error) {
      dispatch(dashboardDispatch(error, GETDASHPROJECTTARGET_FAIL));
      console.log('getDashProjectTarget error from dashboard :====>', error);
    }
  };
}

//For fetching dashboard project target
export function getDashProjectTargetFilter(location, technology, experience) {
  console.log('getDashProjectTargetFilter ACTION REACHED!!!');
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETDASHPROJECTTARGETFILTER_PROGRESS));
    try {
      console.log('getDashProjectTargetFilter TRY REACHED!!!');
      const data = await request({
        url: `/home/project-target-filter?location=${location}&Technology=${technology}&exp=${experience}`,
        method: 'GET',
      });
      console.log(
        'getDashProjectTargetFilter response from dashboard :F====>',
        data,
      );
      // dispatch(dashboardDispatch(data.data, GETDASHPROJECTTARGETFILTER_SUCCESS));
    } catch (error) {
      // dispatch(dashboardDispatch(error.data.message, GETDASHPROJECTTARGETFILTER_FAIL));
      console.log(
        'getDashProjectTargetFilter error from dashboard :====>',
        error,
      );
    }
  };
}

//For fetching reesource contract end
export function getResContractEnd() {
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETRESCONTRACTEND_PROGRESS));
    try {
      const data = await request({
        url: '/home/resource-contract-end',
        method: 'GET',
      });
      // console.log(
      //   'getResContractEnd response from dashboard :====>',
      //   data.data.resourceData,
      // );
      dispatch(
        dashboardDispatch(data.data.resourceData, GETRESCONTRACTEND_SUCCESS),
      );
    } catch (error) {
      dispatch(dashboardDispatch(error, GETRESCONTRACTEND_FAIL));
      console.log('getResContractEnd error from dashboard :====>', error);
    }
  };
}

//For fetching purchase order end
export function getPurchaseOrderEnd() {
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETPURCHASEORDEREND_PROGRESS));
    try {
      const data = await request({
        url: '/home/purchase-order-end',
        method: 'GET',
      });
      // console.log(
      //   'getPurchaseOrderEnd response from dashboard :PPPP>',
      //   data.data.purchaseOrder,
      // );
      dispatch(
        dashboardDispatch(data.data.purchaseOrder, GETPURCHASEORDEREND_SUCCESS),
      );
    } catch (error) {
      dispatch(dashboardDispatch(error, GETPURCHASEORDEREND_FAIL));
      console.log('getPurchaseOrderEnd error from dashboard :====>', error);
    }
  };
}

//For fetching client agreemnet end
export function getClientAgreementEnd() {
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETCLIENTAGREEMENTEND_PROGRESS));
    try {
      const data = await request({
        url: '/resource/readClientAgreements',
        method: 'GET',
      });
      // console.log(
      //   'getClientAgreementEnd response from dashboard :CCCC>',
      //   data.data.data.clientAgreements,
      // );
      dispatch(
        dashboardDispatch(
          data.data.data.clientAgreements,
          GETCLIENTAGREEMENTEND_SUCCESS,
        ),
      );
    } catch (error) {
      dispatch(dashboardDispatch(error, GETCLIENTAGREEMENTEND_FAIL));
      console.log('getClientAgreementEnd error from dashboard :====>', error);
    }
  };
}

//For fetching technology
export function getTechnology() {
  return async dispatch => {
    dispatch(dashboardDispatch({}, GETTECHNOLOGY_PROGRESS));
    try {
      const data = await request({
        url: '/technology',
        method: 'GET',
      });
      // console.log(
      //   'getTechnology response from filter modal :====>',
      //   data.data.data,
      // );
      dispatch(dashboardDispatch(data.data.data, GETTECHNOLOGY_SUCCESS));
    } catch (error) {
      dispatch(dashboardDispatch(error, GETTECHNOLOGY_FAIL));
      console.log('getTechnology error from filter modal :====>', error);
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
      // console.log('addNote response data ====>', data.data.message);
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
      // console.log('deleteNotes response ====>', data);
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

dashboardDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
