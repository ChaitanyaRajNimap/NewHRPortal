import {
    FETCHINACTIVE_PROGRESS,
    FETCHINACTIVE_SUCCESS,
    FETCHINACTIVE_FAIL,
    ACTIVERESOURCE_PROGRESS,
    ACTIVERESOURCE_SUCCESS,
    ACTIVERESOURCE_FAIL,
    DELETERESOURCE_PROGRESS,
    DELETERESOURCE_SUCCESS,
    DELETERESOURCE_FAIL
} from "../ActionConstant";
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';
import requestformData from "../../Util/requestFormData";

export function getInActiveresources() {

    return async dispatch => {
        dispatch(InActiveResourceDispatch({ isLading: true }, FETCHINACTIVE_PROGRESS));
        try {

            const res = await request({ url: '/resource/getAllInactive', method: 'GET' });
            console.log('InActive Resource Response', res.data.data);
            dispatch(
                InActiveResourceDispatch(res.data.data.resources, FETCHINACTIVE_SUCCESS),
            );
        } catch (error) {
            console.log("InActive Resource Error", error)
            dispatch(InActiveResourceDispatch(error, FETCHINACTIVE_FAIL))
        }
    }
}

export function ActiveResource(id) {
    return async dispatch => {
        dispatch(InActiveResourceDispatch({ isLading: true }, ACTIVERESOURCE_PROGRESS))
        try {
            console.log("Id", id)
            const data = await requestformData({ url: '/resource/InActive/' + id, method: 'PUT' })
            console.log('ArchiveUser Response', data.data);
            if (data.data.message) {
                Toast.show(
                    'Resource actived Successfully',

                );
                dispatch(getInActiveresources())
                dispatch(InActiveResourceDispatch(data, ACTIVERESOURCE_SUCCESS))
            }
        } catch (error) {
            console.log("ArchiveUser Error", error)
            Toast.show(
                'Resource Not actived Successfully',

            );
            dispatch(InActiveResourceDispatch(error, ACTIVERESOURCE_FAIL))
        }
    }
}

export function deleteInActiveUser(values) {
    return async dispatch => {
        dispatch(InActiveResourceDispatch({}, DELETERESOURCE_PROGRESS));
        try {
            const data = await request({
                url: `resource/disable/${values}`,
                method: 'DELETE',
            });
            console.log('deleteInActiveUser response', data.data);
            if (data.data.message) {
                dispatch(InActiveResourceDispatch(data, DELETERESOURCE_SUCCESS));
                Toast.show('InActive Resource deleted Successfully');
            }
        } catch (err) {
            console.log('deleteInActiveUser error', err);
            dispatch(InActiveResourceDispatch(err, DELETERESOURCE_FAIL));
            Toast.show('InActive Resource Not deleted Successfully');
        }
    };
}


InActiveResourceDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType,
    };
};