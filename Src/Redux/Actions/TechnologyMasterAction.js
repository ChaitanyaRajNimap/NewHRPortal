import {
    FETCHTECHNOLOFY_PROGRESS,
    FETCHTECHNOLOFY_SUCCESS,
    FETCHTECHNOLOFY_FAIL,
    ADDTECHNOLGY_PROGRESS,
    ADDTECHNOLGY_SUCCESS,
    ADDTECHNOLGY_FAIL,
    UPDATETECHNOLOGY_PROGRESS,
    UPDATETECHNOLOGY_SUCCESS,
    UPDATETECHNOLOGY_FAIL,
    DELETETECHNOLOGY_PROGRESS,
    DELETETECHNOLOGY_SUCCESS,
    DELETETECHNOLOGY_FAIL
} from "../ActionConstant";

import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

export function getTechnology() {
    return async dispatch => {
        dispatch(
            TechnologyDispatch({ isLoading: true }, FETCHTECHNOLOFY_PROGRESS),
        );
        try {
            const res = await request({ url: '/technology', method: 'GET' });
            console.log('getTechnology Response', res.data.data);
            dispatch(
                TechnologyDispatch(res.data.data.technologies, FETCHTECHNOLOFY_SUCCESS),
            );
        } catch (error) {
            console.log('getTechnology error', error);
            TechnologyDispatch(error, FETCHTECHNOLOFY_FAIL);
        }
    };
}

export function deleteTechnology(id) {
    return async dispatch => {
        dispatch(TechnologyDispatch({}, DELETETECHNOLOGY_PROGRESS));
        try {
            const data = await request({
                url: `/technology/${id}`,
                method: 'DELETE',
            });
            console.log('deleteTechnology response', data.data);
            if (data.data.message) {
                dispatch(TechnologyDispatch(data, DELETETECHNOLOGY_SUCCESS));
                Toast.show('Technology deleted Successfully');
            }
        } catch (err) {
            console.log('deleteTechnology error', err);
            dispatch(TechnologyDispatch(err, DELETETECHNOLOGY_FAIL));
            Toast.show('Technology Not deleted Successfully');
        }
    };
}

export function addTechnology(values, navigation) {
    return async dispatch => {
        dispatch(TechnologyDispatch({}, ADDTECHNOLGY_PROGRESS));
        try {
            const { data } = await request({
                url: '/technology',
                method: 'POST',
                data: values,
            });
            console.log('addTechnology response', data);
            if (data.message) {
                dispatch(TechnologyDispatch(data.data, ADDTECHNOLGY_SUCCESS));
                Toast.show('Technology Added Successfully');
            }
            navigation.goBack();
        } catch (err) {
            console.log('addTechnology error', err);
            dispatch(TechnologyDispatch(err, ADDTECHNOLGY_FAIL));
            Toast.show('Technology Not Added Successfully');
        }
    };
}

export function editTechonolgy(values, navigation, id) {
    return async dispatch => {
        dispatch(TechnologyDispatch({}, UPDATETECHNOLOGY_PROGRESS))
        try {
            const data = await request({
                url: `/technology/${id}`,
                method: 'PUT',
                data: values,
            });
            console.log('editTechonolgy response', data.data);
            if (data.message) {
                dispatch(TechnologyDispatch(data, UPDATETECHNOLOGY_SUCCESS));
                Toast.show('Technology Updated Successfully');
            }
            navigation.goBack();
        } catch (error) {
            console.log('editTechonolgy error', error);
            dispatch(TechnologyDispatch(err, UPDATETECHNOLOGY_FAIL));
            Toast.show('Technology Not Updated Successfully');
        }
    }

}

TechnologyDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType,
    };
};