import {
    FETCHREASON_PROGRESS,
    FETCHREASON_SUCCESS,
    FETCHREASON_FAIL,
    ADDREASON_PROGRESS,
    ADDREASON_SUCCESS,
    ADDREASON_FAIL,
    EDITREASON_PROGRESS,
    EDITREASON_SUCCESS,
    EDITREASON_FAIL,
    DELETEREASON_PROGRESS,
    DELETEREASON_SUCCESS,
    DELETEREASON_FAIL
} from "../ActionConstant";

const initalState = {
    isLoading: false,
    reasonData: {},
    deleteReasonData: {},
    updateReasonData: {},
    addReasonData: {}
}

const ReasonReducer = (state = initalState, action) => {

    // console.log("ReasonReducer", action)
    switch (action.type) {
        case FETCHREASON_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case FETCHREASON_SUCCESS:
            return {
                ...state,
                isLoading: false,
                reasonData: action.payload
            };
        case FETCHREASON_FAIL:
            return {
                ...state,
                isLoading: false,
                reasonData: action.payload
            };
        case ADDREASON_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case ADDREASON_FAIL:
            return {
                ...state,
                isLoading: false,
                addReasonData: action.payload
            };
        case ADDREASON_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addReasonData: action.payload
            };
        case EDITREASON_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case EDITREASON_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updateReasonData: action.payload
            };
        case EDITREASON_FAIL:
            return {
                ...state,
                isLoading: false,
                updateReasonData: action.payload
            };
        case DELETEREASON_PROGRESS:
            return {
                ...state,
                isLoading: true,

            };
        case DELETEREASON_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteReasonData: action.payload
            };
        case DELETEREASON_FAIL:
            return {
                ...state,
                isLoading: false,
                deleteReasonData: action.payload
            };
        default:
            return state;

    }
}
export default ReasonReducer