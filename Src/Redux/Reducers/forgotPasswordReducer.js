import {
    FORGOTPASSWORD_PROGRESS,
    FORGOTPASSWORD_SUCCESS,
    FORGOTPASSWORD_FAIL
} from "../ActionConstant";

const initalState = {
    isLoading: false,
    forgotPassData: {}
};

const forgotPasswordReducer = (state = initalState, action) => {
    //console.log('forgotPasswordReducer', action)
    switch (action.type) {
        case FORGOTPASSWORD_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case FORGOTPASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                forgotPassData: action.payload
            };
        case FORGOTPASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                forgotPassData: action.payload
            };
        default:
            return state;

    }
}
export default forgotPasswordReducer