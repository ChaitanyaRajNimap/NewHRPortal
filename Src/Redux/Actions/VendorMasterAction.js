import {
    EDITVENDOR_PROGRESS,
    EDITVENDOR_SUCCESS,
    EDITVENDOR_FAIL,
    ADDVENDOR_PROGRESS,
    ADDVENDOR_SUCCESS,
    ADDVENDOR_FAIL,
    DELETEVENDOR_PROGRESS,
    DELETEVENDOR_SUCCESS,
    DELETEVENDOR_FAIL
} from "../ActionConstant";
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';
import requestformData from "../../Util/requestFormData";


export function updateVendor(formData, id, navigation) {
    return async dispatch => {
        dispatch(vendorMasterDispatch({}, EDITVENDOR_PROGRESS))
        console.log("Form data", formData)
        try {
            const data = await requestformData({
                url: `/vendor/${id}`,
                method: 'PUT',
                data: formData,
            });
            console.log('updateVendor response', data.data);
            if (data.message) {
                dispatch(vendorMasterDispatch(data, EDITVENDOR_SUCCESS));
                Toast.show(' Vendor Updated Successfully');
            }
            navigation.goBack();

        } catch (err) {
            console.log('updateVendor error', err.data);
            dispatch(vendorMasterDispatch(err, EDITVENDOR_FAIL));
            Toast.show('Vendor Not Updated Successfully');
        }
    }
}

export function addVendor(formData, navigation) {
    return async dispatch => {
        dispatch(vendorMasterDispatch({}, ADDVENDOR_PROGRESS))
        console.log("Form data", formData)
        try {
            const data = await request({
                url: `/vendor`,
                method: 'POST',
                data: formData,
            });
            console.log('addVendor response', data.data);
            if (data.message) {
                dispatch(vendorMasterDispatch(data, ADDVENDOR_SUCCESS));
                Toast.show(' Vendor added Successfully');
            }
            navigation.goBack();

        } catch (err) {
            console.log('addVendor error', err);
            dispatch(vendorMasterDispatch(err, ADDVENDOR_FAIL));
            Toast.show('Vendor Not added Successfully');
        }
    }
}

export function deleteVendor(values) {
    return async dispatch => {
        dispatch(vendorMasterDispatch({}, DELETEVENDOR_PROGRESS));
        try {
            const data = await request({
                url: `/vendor/${values}`,
                method: 'DELETE',
            });
            console.log('deleteVendor response', data.data);
            if (data.data.message) {
                dispatch(vendorMasterDispatch(data, DELETEVENDOR_SUCCESS));
                Toast.show('Vendor deleted Successfully');
            }
        } catch (err) {
            console.log('deleteVendor error', err);
            dispatch(vendorMasterDispatch(err, DELETEVENDOR_FAIL));
            Toast.show('Vendor Not deleted Successfully');
        }
    }

}

vendorMasterDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType,
    };
};