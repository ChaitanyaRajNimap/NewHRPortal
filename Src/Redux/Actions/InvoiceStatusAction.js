import {
  INVOICESTATUS_FAIL,
  INVOICESTATUS_PROGRESS,
  INVOICESTATUS_SUCCESS,
  INVOICESTATUSSEARCH_PROGRESS,
  INVOICESTATUSSEARCH_SUCCESS,
  INVOICESTATUSSEARCH_FAIL,
  INVOICESTATUSMAILEXPORT_SUCCESS,
  INVOICESTATUSMAILEXPORT_FAIL,
  INVOICESTATUSMAILEXPORT_PROGRESS,
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

export function InvoiceStaus() {
  return async dispatch => {
    dispatch(invoicestatusDispatch({isLoading: true}, INVOICESTATUS_PROGRESS));
    try {
      const res = await request({
        url: '/invoice-master/invoice-details?type=forInternalInvoiceStatus',
        method: 'GET',
      });
      // console.log('invoice-details Response', res);
      dispatch(invoicestatusDispatch(res.data, INVOICESTATUS_SUCCESS));
    } catch (error) {
      console.log('invoice-details error', error);
      dispatch(error, INVOICESTATUS_FAIL);
    }
  };
}

export function InvoiceStausSearch(name) {
  console.log('nammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmtgddfgfdddd', name);
  return async dispatch => {
    dispatch(
      invoicestatusDispatch({isLoading: true}, INVOICESTATUSSEARCH_PROGRESS),
    );
    try {
      const res = await request({
        url: `/invoice-master/invoice-details?type=forInternalInvoiceStatus&search=${name}`,
        method: 'GET',
      });
      // console.log('invoice-details Response', res);
      dispatch(invoicestatusDispatch(res.data, INVOICESTATUSSEARCH_SUCCESS));
    } catch (error) {
      console.log('invoice-details error', error);
      dispatch(error, INVOICESTATUSSEARCH_FAIL);
    }
  };
}

export function SendInvoicestatesData(data) {
  console.log('datattttttttttttttttttttttttttt', data);
  let datas = {
    email: data.email,
    months: data.months,
  };
  return async dispatch => {
    dispatch(invoicestatusDispatch({}, INVOICESTATUSMAILEXPORT_PROGRESS));
    console.log('Form data', datas);

    try {
      const data = await request({
        url: `/invoice-master/export`,
        method: 'POST',
        data: datas,
      });
      console.log('updateEDITURCHASEORDER response', data.data);
      if (data.message) {
        dispatch(invoicestatusDispatch(data, INVOICESTATUSMAILEXPORT_SUCCESS));
      }
      Toast.show('Internal Invoice Details Sent Successfully');
    } catch (err) {
      console.log('updateVendor error', err.data);
      dispatch(invoicestatusDispatch(err, INVOICESTATUSMAILEXPORT_FAIL));
      Toast.show('EDITURCHASEORDER Not Updated Successfully');
    }
  };
}

const invoicestatusDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
