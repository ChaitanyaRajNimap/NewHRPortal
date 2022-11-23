import {
    FETCH_ARCHIVED_PROGRESS,
    FETCH_ARCHIVED_SUCCESS,
    FETCH_ARCHIVED_FAIL,
    ARCHIVEUSER_PROGRESS,
    ARCHIVEUSER_SUCCESS,
    ARCHIVEUSER_FAIL
} from "../ActionConstant";

const initalState = {
    isLoading: false,
    archiveResourceData: {},
    archiveuser: {}
};

const ArchiveResourceReducer = (state = initalState, action) => {
    // console.log("ArchiveResourceReducer", action)

    switch (action.type) {
        case FETCH_ARCHIVED_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_ARCHIVED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                archiveResourceData: action.payload
            };
        case FETCH_ARCHIVED_FAIL:
            return {
                ...state,
                isLoading: false,
                archiveResourceData: action.payload
            };
        case ARCHIVEUSER_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case ARCHIVEUSER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                archiveuser: action.payload
            };
        case ARCHIVEUSER_FAIL:
            return {
                ...state,
                isLoading: false,
                archiveuser: action.payload
            }
        default:
            return state;
    }
}
export default ArchiveResourceReducer;