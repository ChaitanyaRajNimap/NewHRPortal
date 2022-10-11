import {
    FORGOTPASSWORD_PROGRESS,
    FORGOTPASSWORD_SUCCESS,
    FORGOTPASSWORD_FAIL
} from "../ActionConstant";

import Toast from 'react-native-simple-toast'
import axios from 'axios'
import { BASE_URL } from '../../Util/Configure'

export function forgotPassword(email) {
    return async (dispatch) => {
        dispatch(forgotPasswordDispatch({ isLoading: true }, FORGOTPASSWORD_PROGRESS))

        var formData = {
            "email": email,
        }
        console.log(formData)
        try {
            const res = await axios.post(BASE_URL + '/auth/forgot-password', formData);
            console.log("Forgot Password response", res.data)
            if (res.data) {
                dispatch(forgotPasswordDispatch(res.data, FORGOTPASSWORD_SUCCESS))
                Toast.show(
                    'OTP sent',
                );
            }
        } catch (error) {
            console.log("Forgot Password Error", error)
            Toast.show('Please check user email ');
            dispatch(forgotPasswordDispatch(error, FORGOTPASSWORD_FAIL))
        }
    }
}
forgotPasswordDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType
    }
}