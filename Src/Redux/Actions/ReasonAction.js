import {
    FETCHREASON_PROGRESS,
    FETCHREASON_SUCCESS,
    FETCHREASON_FAIL,
    ADDREASON_PROGRESS,
    ADDREASON_SUCCESS,
    ADDREASON_FAIL,
    EDITREASON_PROGRESS,
    EDITREASON_SUCCESS,
    EDITREASON_FAIL,
    DELETEREASON_PROGRESS,
    DELETEREASON_SUCCESS,
    DELETEREASON_FAIL
} from "../ActionConstant";

import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

export function getReason() {
    return async dispatch => {
        dispatch(
            ReasonDispatch({ isLoading: true }, FETCHREASON_PROGRESS),
        );
        try {
            const res = await request({ url: '/reason', method: 'GET' });
            console.log('getReason Response', res.data.data);
            dispatch(
                ReasonDispatch(res.data.data.reasonData, FETCHREASON_SUCCESS),
            );
        } catch (error) {
            console.log('getReason error', error);
            dispatch(ReasonDispatch(error, FETCHREASON_FAIL));
        }
    };
}

export function addReason(values, navigation) {
    return async dispatch => {
        dispatch(ReasonDispatch({}, ADDREASON_PROGRESS));
        try {
            const { data } = await request({
                url: '/reason',
                method: 'POST',
                data: values,
            });
            console.log('addReason response', data);
            if (data.data.message) {
                dispatch(ReasonDispatch(data.data, ADDREASON_SUCCESS));
                Toast.show('Reason Added Successfully');
            }
            navigation.goBack();
        } catch (err) {
            console.log('addReason error', err);
            dispatch(ReasonDispatch(err, ADDREASON_FAIL));
            Toast.show('Reason Not Added Successfully');
        }
    };
}

export function updateReason(values, navigation, id) {
    return async dispatch => {
        dispatch(ReasonDispatch({}, EDITREASON_PROGRESS))
        try {
            const data = await request({
                url: `/reason/${id}`,
                method: 'PUT',
                data: values,
            });
            console.log('updateReason response', data.data);
            if (data.data.msg) {
                dispatch(ReasonDispatch(data, EDITREASON_SUCCESS));
                Toast.show('Reason Updated Successfully');
            }
            navigation.goBack();
        } catch (error) {
            console.log('updateReason error', error);
            dispatch(ReasonDispatch(err, EDITREASON_FAIL));
            Toast.show('Reason Not Updated Successfully');
        }
    }
}

export function deleteReason(id) {
    return async dispatch => {
        dispatch(ReasonDispatch({}, DELETEREASON_PROGRESS));
        try {
            const data = await request({
                url: `/reason/${id}`,
                method: 'DELETE',
            });
            console.log('deleteReason response', data.data);
            if (data.data.msg) {
                dispatch(ReasonDispatch(data, DELETEREASON_SUCCESS));
                Toast.show('Reason deleted Successfully');
            }
        } catch (err) {
            console.log('deleteReason error', err);
            dispatch(ReasonDispatch(err, DELETEREASON_FAIL));
            Toast.show('Reason Not deleted Successfully');
        }
    };
}
ReasonDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType,
    };
};