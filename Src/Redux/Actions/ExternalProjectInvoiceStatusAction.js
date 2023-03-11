import {
  EXTERNALINVOICESTATUS_FAIL,
  EXTERNALINVOICESTATUS_SUCCESS,
  EXTERNALINVOICESTATUS_PROGRESS,
  EXTERNALINVOICESTATUSMAILEXPORT_PROGRESS,
  EXTERNALINVOICESTATUSMAILEXPORT_FAIL,
  EXTERNALINVOICESTATUSMAILEXPORT_SUCCESS,
  EXTERNALINVOICESTATUSSEARCH_FAIL,
  EXTERNALINVOICESTATUSSEARCH_PROGRESS,
  EXTERNALINVOICESTATUSSEARCH_SUCCESS,
} from '../ActionConstant';
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

export function ExternalInvoiceStatus() {
  return async dispatch => {
    dispatch(
      ExternalinvoicestatusDispatch(
        {isLoading: true},
        EXTERNALINVOICESTATUS_PROGRESS,
      ),
    );
    try {
      const res = await request({
        url: '/invoice-master/invoice-details?type=forExternalInvoiceStatus',
        method: 'GET',
      });
      // console.log('invoice-details Response', res);
      dispatch(
        ExternalinvoicestatusDispatch(res.data, EXTERNALINVOICESTATUS_SUCCESS),
      );
    } catch (error) {
      console.log('invoice-details error', error);
      dispatch(error, EXTERNALINVOICESTATUS_FAIL);
    }
  };
}

export function ExternalInvoiceStausSearch(name) {
  console.log('nammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmtgddfgfdddd', name);
  let clientname = name;
  console.log('clientname======', clientname);
  return async dispatch => {
    dispatch(
      ExternalinvoicestatusDispatch(
        {isLoading: true},
        EXTERNALINVOICESTATUSSEARCH_PROGRESS,
      ),
    );
    try {
      const res = await request({
        url: `/invoice-master/invoice-details?type=forExternalInvoiceStatus&search=${clientname}`,
        method: 'GET',
      });
      // console.log('invoice-details Response', res);
      dispatch(
        ExternalinvoicestatusDispatch(
          res.data,
          EXTERNALINVOICESTATUSSEARCH_SUCCESS,
        ),
      );
    } catch (error) {
      console.log('invoice-details error', error);
      dispatch(error, EXTERNALINVOICESTATUSSEARCH_FAIL);
    }
  };
}

export function SendExternalInvoicestatesData(data) {
  console.log('datattttttttttttttttttttttttttt', data);
  let datas = {
    email: data.email,
    months: data.months,
  };
  return async dispatch => {
    dispatch(
      ExternalinvoicestatusDispatch(
        {},
        EXTERNALINVOICESTATUSMAILEXPORT_PROGRESS,
      ),
    );
    console.log('Form data', datas);

    try {
      const data = await request({
        url: `/invoice-master/export`,
        method: 'POST',
        data: datas,
      });
      console.log('updateEDITURCHASEORDER response', data.data);
      if (data.message) {
        dispatch(
          ExternalinvoicestatusDispatch(
            data,
            EXTERNALINVOICESTATUSMAILEXPORT_SUCCESS,
          ),
        );
      }
      Toast.show('Internal Invoice Details Sent Successfully');
    } catch (err) {
      console.log('updateVendor error', err.data);
      dispatch(
        ExternalinvoicestatusDispatch(
          err,
          EXTERNALINVOICESTATUSMAILEXPORT_FAIL,
        ),
      );
      Toast.show('EDITURCHASEORDER Not Updated Successfully');
    }
  };
}

const ExternalinvoicestatusDispatch = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
