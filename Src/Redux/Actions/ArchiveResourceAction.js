import {
    FETCH_ARCHIVED_PROGRESS,
    FETCH_ARCHIVED_SUCCESS,
    FETCH_ARCHIVED_FAIL,
    ARCHIVEUSER_PROGRESS,
    ARCHIVEUSER_SUCCESS,
    ARCHIVEUSER_FAIL
} from "../ActionConstant";
import request from '../../Util/request';
import Toast from 'react-native-simple-toast';
import requestformData from "../../Util/requestFormData";

export function getArchivedResources() {
    return async dispatch => {
        dispatch(ArchivedResourceDispatch({ isLading: true }, FETCH_ARCHIVED_PROGRESS));
        try {

            const res = await request({ url: '/resource/getAllArchive', method: 'GET' });
            console.log('Archived Resource Response', res.data.data);
            dispatch(
                ArchivedResourceDispatch(res.data.data.resources, FETCH_ARCHIVED_SUCCESS),
            );
        } catch (error) {
            console.log("Archived Resource Error", error)
            dispatch(ArchivedResourceDispatch(error, FETCH_ARCHIVED_FAIL))
        }
    }
}

export function ArchiveUser(id) {
    return async dispatch => {
        dispatch(ArchivedResourceDispatch({ isLading: true }, ARCHIVEUSER_PROGRESS))
        try {
            console.log("Id", id)
            const data = await requestformData({ url: '/resource/unarchive/' + id, method: 'PUT' })
            console.log('ArchiveUser Response', data.data);
            if (data.data.message) {
                Toast.show(
                    'Resource Unarchive Successfully',

                );
                dispatch(getArchivedResources())
                dispatch(ArchivedResourceDispatch(data, ARCHIVEUSER_SUCCESS))
            }
        } catch (error) {
            console.log("ArchiveUser Error", error)
            Toast.show(
                'Resource Not Unarchive Successfully',

            );
            dispatch(ArchivedResourceDispatch(error, ARCHIVEUSER_FAIL))
        }
    }
}

ArchivedResourceDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType,
    };
};
