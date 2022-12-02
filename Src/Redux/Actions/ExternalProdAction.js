import {
    FETCHEXTERNALPROD_PROGRESS,
    FETCHEXTERNALPROD_SUCCESS,
    FETCHEXTERNALPROD_FAIL,
    DELETEPRODUCT_PROGRESS,
    DELETEPRODUCT_SUCCESS,
    DELETEPRODUCT_FAIL,
    ADDPRODUCT_PROGRESS,
    ADDPRODUCT_SUCCESS,
    ADDPRODUCT_FAIL,
    UPDATEPRODUCT_PROGRESS,
    UPDATEPRODUCT_SUCCESS,
    UPDATEPRODUCT_FAIL
} from "../ActionConstant";

import request from '../../Util/request';
import Toast from 'react-native-simple-toast';

export function getExternalProduct() {
    return async dispatch => {
        dispatch(
            ExternalProductDispatch({ isLoading: true }, FETCHEXTERNALPROD_PROGRESS),
        );
        try {
            const res = await request({ url: '/external-products', method: 'GET' });
            //console.log('ExternalProduct Response', res.data.data);
            dispatch(
                ExternalProductDispatch(res.data.data.product, FETCHEXTERNALPROD_SUCCESS),
            );
        } catch (error) {
            console.log('ExternalProduct error', error);
            ExternalProductDispatch(error, FETCHEXTERNALPROD_FAIL);
        }
    };
}

export function deleteExternalProduct(id) {
    return async dispatch => {
        dispatch(ExternalProductDispatch({}, DELETEPRODUCT_PROGRESS));
        try {
            const data = await request({
                url: `/external-products/${id}`,
                method: 'DELETE',
            });
            console.log('deleteProduct response', data.data);
            if (data.data.message) {
                dispatch(ExternalProductDispatch(data, DELETEPRODUCT_SUCCESS));
                Toast.show('Product deleted Successfully');
            }
        } catch (err) {
            console.log('deleteProduct error', err);
            dispatch(ExternalProductDispatch(err, DELETEPRODUCT_FAIL));
            Toast.show('Product Not deleted Successfully');
        }
    };
}

export function addExternalProduct(values, navigation) {
    return async dispatch => {
        dispatch(ExternalProductDispatch({}, ADDPRODUCT_PROGRESS));
        try {
            const { data } = await request({
                url: '/external-products',
                method: 'POST',
                data: values,
            });
            console.log('addExternalProduct response', data);
            if (data.message) {
                dispatch(ExternalProductDispatch(data.data, ADDPRODUCT_SUCCESS));
                Toast.show('Product Added Successfully');
            }
            navigation.goBack();
        } catch (err) {
            console.log('addExternalProduct error', err);
            dispatch(ExternalProductDispatch(err, ADDPRODUCT_FAIL));
            Toast.show('Product Not Added Successfully');
        }
    };
}

export function editProduct(values, navigation, id) {
    return async dispatch => {
        dispatch(ExternalProductDispatch({}, UPDATEPRODUCT_PROGRESS))
        try {
            const data = await request({
                url: `/external-products/${id}`,
                method: 'PUT',
                data: values,
            });
            console.log('editProduct response', data.data);
            if (data.message) {
                dispatch(ExternalProductDispatch(data, UPDATEPRODUCT_SUCCESS));
                Toast.show('Product Updated Successfully');
            }
            navigation.goBack();
        } catch (error) {
            console.log('updateProjectTarget error', error);
            dispatch(ExternalProductDispatch(err, UPDATEPRODUCT_FAIL));
            Toast.show('Product Not Updated Successfully');
        }
    }

}

ExternalProductDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType,
    };
};