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


const initalState = {
    isLoading: false,
    accountData: {},
    deleteAccountyData: {},
    updateACcountData: {},
    addAccountData: {}
}

const AccountReducer = (state = initalState, action) => {

    // console.log("AccountReducer", action)
    switch (action.type) {

        case FETCHACCOUNT_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case FETCHACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accountData: action.payload
            };
        case FETCHACCOUNT_FAIL:
            return {
                ...state,
                isLoading: false,
                accountData: action.payload
            };
        case ADDACCOUNT_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case ADDACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addAccountData: action.payload
            };
        case ADDACCOUNT_FAIL:
            return {
                ...state,
                isLoading: false,
                addAccountData: action.payload
            };
        case EDITACCOUNT_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case EDITACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updateACcountData: action.payload
            };
        case EDITACCOUNT_FAIL:
            return {
                ...state,
                isLoading: false,
                updateACcountData: action.payload
            };
        case DELETEACCOUNT_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case DELETEACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteAccountyData: action.payload
            };
        case DELETEACCOUNT_FAIL:
            return {
                ...state,
                isLoading: false,
                deleteAccountyData: action.payload
            };
        default:
            return state;
    }
}
export default AccountReducer