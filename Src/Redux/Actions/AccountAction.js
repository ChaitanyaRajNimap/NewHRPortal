import {
    FETCHACCOUNT_PROGRESS,
    FETCHACCOUNT_SUCCESS,
    FETCHACCOUNT_FAIL,
    ADDACCOUNT_PROGRESS,
    ADDACCOUNT_SUCCESS,
    ADDACCOUNT_FAIL,
    EDITACCOUNT_PROGRESS,
    EDITACCOUNT_SUCCESS,
    EDITACCOUNT_FAIL,
    DELETEACCOUNT_PROGRESS,
    DELETEACCOUNT_SUCCESS,
    DELETEACCOUNT_FAIL
} from "../ActionConstant";
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

export function getAccount() {
    return async dispatch => {
        dispatch(
            AccountDispatch({ isLoading: true }, FETCHACCOUNT_PROGRESS),
        );
        try {
            const res = await request({ url: '/account', method: 'GET' });
            console.log('getAccount Response', res.data.data);
            dispatch(
                AccountDispatch(res.data.data.accounts, FETCHACCOUNT_SUCCESS),
            );
        } catch (error) {
            console.log('getAccount error', error);
            dispatch(AccountDispatch(error, FETCHACCOUNT_FAIL));
        }
    };

}

export function addAccount(values, navigation) {
    return async dispatch => {
        dispatch(AccountDispatch({}, ADDACCOUNT_PROGRESS));
        try {
            const { data } = await request({
                url: '/account',
                method: 'POST',
                data: values,
            });
            console.log('addAccount response', data);
            if (data.message) {
                dispatch(AccountDispatch(data.data, ADDACCOUNT_SUCCESS));
                Toast.show('Account Added Successfully');
            }
            navigation.goBack();
        } catch (err) {
            console.log('addAccount error', err);
            dispatch(AccountDispatch(err, ADDACCOUNT_FAIL));
            Toast.show('Account Not Added Successfully');
        }
    };

}

export function updateAccount(values, navigation, id) {
    return async dispatch => {
        dispatch(AccountDispatch({}, EDITACCOUNT_PROGRESS))
        try {
            const data = await request({
                url: `/account/${id}`,
                method: 'PUT',
                data: values,
            });
            console.log('updateAccount response', data.data);
            if (data.message) {
                dispatch(AccountDispatch(data, EDITACCOUNT_SUCCESS));
                Toast.show('Account Updated Successfully');
            }
            navigation.goBack();
        } catch (error) {
            console.log('updateAccount error', error);
            dispatch(AccountDispatch(err, EDITACCOUNT_FAIL));
            Toast.show('Account Not Updated Successfully');
        }
    }

}

export function deleteAccount(id) {
    return async dispatch => {
        dispatch(AccountDispatch({}, DELETEACCOUNT_PROGRESS));
        try {
            const data = await request({
                url: `/account/${id}`,
                method: 'DELETE',
            });
            console.log('deleteAccount response', data.data);
            if (data.data.message) {
                dispatch(AccountDispatch(data, DELETEACCOUNT_SUCCESS));
                Toast.show('Account deleted Successfully');
            }
        } catch (err) {
            console.log('deleteAccount error', err);
            dispatch(AccountDispatch(err, DELETEACCOUNT_FAIL));
            Toast.show('Account Not deleted Successfully');
        }
    };
}
AccountDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType,
    };
};