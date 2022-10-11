import {
    LOGIN_PROGRESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../ActionConstant'

const initalState = {
    isLoading: false,
    loginData: {}
};

const loginReducer = (state = initalState, action) => {
    //console.log('loginReducer', action)
    switch (action.type) {
        case LOGIN_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                loginData: action.payload
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                loginData: action.payload
            };
        default:
            return state;

    }
}
export default loginReducer