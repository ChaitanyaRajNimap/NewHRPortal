import {
  EXTERNALINVOICEHISTORY_FAIL,
  EXTERNALINVOICEHISTORY_PROGRESS,
  EXTERNALINVOICEHISTORY_SUCCESS,
  EXTERNALINVOICEHISTORYMONTHDATA_FAIL,
  EXTERNALINVOICEHISTORYMONTHDATA_PROGRESS,
  EXTERNALINVOICEHISTORYMONTHDATA_SUCCESS,
  EXTERNALINVOICEHISTORYMAILEXPORT_FAIL,
  EXTERNALINVOICEHISTORYMAILEXPORT_PROGRESS,
  EXTERNALINVOICEHISTORYMAILEXPORT_SUCCESS,
} from '../ActionConstant';

import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

export const GetExternalInvoiceHistory = () => {
  console.log('dispatch external invoice hiistory');
  return async dispatch => {
    dispatch(
      EXTERNALInvoiceHistory(
        {isLoading: true},
        EXTERNALINVOICEHISTORY_PROGRESS,
      ),
    );
    try {
      const res = await request({
        url: 'internal-invoice-history?type=forExternalInvoiceHistory',
        method: 'GET',
      });
      // console.log("ressssssssssss",res.data)
      dispatch(
        EXTERNALInvoiceHistory(res.data, EXTERNALINVOICEHISTORY_SUCCESS),
      );
    } catch (error) {
      dispatch(error, EXTERNALINVOICEHISTORY_FAIL);
    }
  };
};

export function getExternalInvoiceMonthlyData(MonthData) {
  console.log('Form data=>>>>>>>>>>>>>>>>>>>>>>>>', MonthData);
  return async dispatch => {
    // console.log("Form data dispatch=>>>>>>>>>>>>>>>>>>>>>>>>", MonthData)
    dispatch(
      EXTERNALInvoiceHistory({}, EXTERNALINVOICEHISTORYMONTHDATA_PROGRESS),
    );
    console.log('Form data after=>>>>>>>>>>>>>>>>>>>>>>>>', MonthData);
    try {
      const data = await request({
        url: 'internal-invoice-history?type=forInternalInvoiceHistory',
        method: 'GET',
        data: MonthData,
      });
      console.log(
        'EXTERNALINVOICEHISTORYMONTHDATA response=>>>>>>>>>>>>>>',
        data.data.data,
      );
      dispatch(
        EXTERNALInvoiceHistory(
          data.data.data,
          EXTERNALINVOICEHISTORYMONTHDATA_SUCCESS,
        ),
      );
    } catch (err) {
      console.log('EXTERNALINVOICEHISTORYMONTHDATA error', err);
      dispatch(
        EXTERNALInvoiceHistory(err, EXTERNALINVOICEHISTORYMONTHDATA_FAIL),
      );
      Toast.show('EXTERNALINVOICEHISTORYMONTHDATA added Successfully');
    }
  };
}

export function SendExternalInvoiceHistoryData(data) {
  console.log('datattttttttttttttttttttttttttt', data);
  let datas = {
    email: data.email,
    months: data.months,
  };
  return async dispatch => {
    dispatch(
      EXTERNALInvoiceHistory({}, EXTERNALINVOICEHISTORYMAILEXPORT_PROGRESS),
    );
    console.log('Form data', datas);

    try {
      const data = await request({
        url: `/internal-invoice-history/export`,
        method: 'POST',
        data: datas,
      });
      console.log('updateEDITURCHASEORDER response', data.data);
      if (data.message) {
        dispatch(
          EXTERNALInvoiceHistory(
            data,
            EXTERNALINVOICEHISTORYMAILEXPORT_SUCCESS,
          ),
        );
      }
      Toast.show('Internal Invoice Details Sent Successfully');
    } catch (err) {
      console.log('updateVendor error', err.data);
      dispatch(
        EXTERNALInvoiceHistory(err, EXTERNALINVOICEHISTORYMAILEXPORT_FAIL),
      );
      Toast.show('EDITURCHASEORDER Not Updated Successfully');
    }
  };
}

const EXTERNALInvoiceHistory = (data, actionType) => {
  return {
    payload: data,
    type: actionType,
  };
};
