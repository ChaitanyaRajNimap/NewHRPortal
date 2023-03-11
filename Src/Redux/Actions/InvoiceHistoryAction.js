import request from '../../Util/request';
import {
  INVOICEHISTORY_FAIL,
  INVOICEHISTORY_PROGRESS,
  INVOICESTATUS_SUCCESS,
  INVOICEHISTORYHISTORYMONTHDATA_FAIL,
  INVOICEHISTORYHISTORYMONTHDATA_PROGRESS,
  INVOICEHISTORYHISTORYMONTHDATA_SUCCESS,
  INVOICEHISTORYMAILEXPORT_PROGRESS,
  INVOICEHISTORYMAILEXPORT_FAIL,
  INVOICEHISTORYMAILEXPORT_SUCCESS,
  INVOICEHISTORYHISTORYMONTHSEARCHDATA_FAIL,
  INVOICEHISTORYHISTORYMONTHSEARCHDATA_SUCCESS,
  INVOICEHISTORYHISTORYMONTHSEARCHDATA_PROGRESS,
} from '../ActionConstant';
import Toast from 'react-native-simple-toast';

export const GetInvoiceHistoryData = () => {
  return async dispatch => {
    dispatch(InvoiceHistory({isLoading: true}, INVOICEHISTORY_PROGRESS));
    try {
      const res = await request({
        url: '/internal-invoice-history?type=forExternalInvoiceHistory',
        method: 'GET',
      });
      console.log('ressssssssssss', res.data.data);
      dispatch(InvoiceHistory(res.data, INVOICESTATUS_SUCCESS));
    } catch (error) {
      dispatch(error, INVOICEHISTORY_FAIL);
    }
  };
};

export function GetInvoiceHistoryDataMonthlyData(getyearvalue, getMonthvalue) {
  console.log(
    'INTERNALForm data=>>>>>>>>>>>>>>>>>>>>>>>>',
    getyearvalue,
    getMonthvalue,
  );
  const year = getyearvalue;
  const month = getMonthvalue;
  console.log('month=========', month);
  return async dispatch => {
    // console.log("Form data dispatch=>>>>>>>>>>>>>>>>>>>>>>>>", MonthData)
    dispatch(InvoiceHistory({}, INVOICEHISTORYHISTORYMONTHDATA_PROGRESS));
    // console.log("INTERNALForm data after=>>>>>>>>>>>>>>>>>>>>>>>>", MonthData)
    try {
      const data = await request({
        url: `internal-invoice-history?type=forInternalInvoiceHistory&month=${month}&year=${year}`,
        method: 'GET',
      });
      console.log('internal-invoice response=>>>>>>>>>>>>>>', data.data.data);
      dispatch(
        InvoiceHistory(data.data.data, INVOICEHISTORYHISTORYMONTHDATA_SUCCESS),
      );
    } catch (err) {
      console.log('internal-invoice error', err);
      dispatch(InvoiceHistory(err, INVOICEHISTORYHISTORYMONTHDATA_FAIL));
      // Toast.show('internal-invoice added Successfully');
    }
  };
}

export function SendInvoiceHistoryData(data) {
  console.log('datattttttttttttttttttttttttttt', data);
  let datas = {
    email: data.email,
    months: data.months,
  };
  return async dispatch => {
    dispatch(InvoiceHistory({}, INVOICEHISTORYMAILEXPORT_PROGRESS));
    console.log('Form data', datas);

    try {
      const data = await request({
        url: `/internal-invoice-history/export`,
        method: 'POST',
        data: datas,
      });
      console.log('updateEDITURCHASEORDER response', data.data);
      if (data.message) {
        dispatch(InvoiceHistory(data, INVOICEHISTORYMAILEXPORT_SUCCESS));
      }
      Toast.show('Internal Invoice Details Sent Successfully');
    } catch (err) {
      console.log('updateVendor error', err.data);
      dispatch(InvoiceHistory(err, INVOICEHISTORYMAILEXPORT_FAIL));
      Toast.show('EDITURCHASEORDER Not Updated Successfully');
    }
  };
}

export function GetInvoiceHistoryDataMonthlySearchData(
  getyearvalue,
  getMonthvalue,
  searchValue,
) {
  console.log(
    ' called GetInvoiceHistoryDataMonthlySearchData data=>>>>>>>>>>>>>>>>>>>>>>>>',
    getyearvalue,
    getMonthvalue,
    searchValue,
  );
  const year = getyearvalue;
  const month = getMonthvalue;
  const searchVale = searchValue;
  return async dispatch => {
    // console.log("Form data dispatch=>>>>>>>>>>>>>>>>>>>>>>>>", MonthData)
    dispatch(InvoiceHistory({}, INVOICEHISTORYHISTORYMONTHSEARCHDATA_PROGRESS));
    // console.log("INTERNALForm data after=>>>>>>>>>>>>>>>>>>>>>>>>", MonthData)
    try {
      const data = await request({
        url: `internal-invoice-history?type=forInternalInvoiceHistory&month=${month}&year=${year}&search=${searchVale}`,
        method: 'GET',
      });
      console.log(
        'GetInvoiceHistoryDataMonthlySearchData search response=>>>>>>>>>>>>>>',
        data.data,
      );
      dispatch(
        InvoiceHistory(data.data, INVOICEHISTORYHISTORYMONTHSEARCHDATA_SUCCESS),
      );
    } catch (err) {
      console.log('internal-invoice error', err);
      dispatch(InvoiceHistory(err, INVOICEHISTORYHISTORYMONTHSEARCHDATA_FAIL));
      // Toast.show('internal-invoice added Successfully');
    }
  };
}

const InvoiceHistory = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
