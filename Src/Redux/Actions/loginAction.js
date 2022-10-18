import {
    LOGIN_PROGRESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../ActionConstant'
import Toast from 'react-native-simple-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '../../Util/Configure'
import useApp from '../../context/appContext'
import appState from '../../constants/appstate'

export function loginuser(username, password) {
    const { setState } = useApp();

    return async (dispatch) => {
        dispatch(loginDispatch({ isLoading: true }, LOGIN_PROGRESS))

        var formData = {
            "email": username,
            "password": password
        }
        console.log(formData)
        try {
            const res = await axios.post(BASE_URL + '/auth/signIn', formData);
            console.log("login response", res.data)
            if (res.data) {
                dispatch(loginDispatch(res.data, LOGIN_SUCCESS))
                Toast.show(
                    'Login successfully',
                );
                await AsyncStorage.setItem('token', res.data.token);
            }
            setState(appState.APP_STATE_PRIVATE);
        } catch (error) {
            console.log("Login Error", error)
            Toast.show('Please check user email and password');
            dispatch(loginDispatch(error, LOGIN_FAIL))
        }
    }
}

loginDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType
    }
}