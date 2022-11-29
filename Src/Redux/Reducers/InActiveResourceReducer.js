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

const initalState = {
    isLoading: false,
    InActiveResourceData: {},
    ActiveResourceData: {},
    Deletedata: {}
}

const InActiveResourceReducer = (state = initalState, action) => {
    // console.log("InActiveResourceReducer", action)

    switch (action.type) {
        case FETCHINACTIVE_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case FETCHINACTIVE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                InActiveResourceData: action.payload
            };
        case FETCHINACTIVE_FAIL:
            return {
                ...state,
                isLoading: false,
                InActiveResourceData: action.payload
            };
        case ACTIVERESOURCE_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case ACTIVERESOURCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ActiveResourceData: action.payload
            };
        case ACTIVERESOURCE_FAIL:
            return {
                ...state,
                isLoading: false,
                ActiveResourceData: action.payload
            };
        case DELETERESOURCE_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case DELETERESOURCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                Deletedata: action.payload
            };
        case DELETERESOURCE_FAIL:
            return {
                ...state,
                isLoading: false,
                Deletedata: action.payload
            }
        default:
            return state;
    }
}

export default InActiveResourceReducer;