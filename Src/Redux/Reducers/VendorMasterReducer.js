import {
    EDITVENDOR_PROGRESS,
    EDITVENDOR_SUCCESS,
    EDITVENDOR_FAIL,
    ADDVENDOR_PROGRESS,
    ADDVENDOR_SUCCESS,
    ADDVENDOR_FAIL,
    DELETEVENDOR_PROGRESS,
    DELETEVENDOR_SUCCESS,
    DELETEVENDOR_FAIL
} from "../ActionConstant";

const initalState = {
    isLoading: false,
    editVendorData: {},
    addVendorResponse: {},
    deleteVendorResponse: {}
}

const VendorMasterReducer = (state = initalState, action) => {
    // console.log("VendorMasterReducer", action)
    switch (action.type) {
        case EDITVENDOR_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case EDITVENDOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                editVendorData: action.payload
            };
        case EDITVENDOR_FAIL:
            return {
                ...state,
                isLoading: false,
                editVendorData: action.payload
            };
        case ADDVENDOR_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case ADDVENDOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addVendorResponse: action.payload
            };
        case ADDVENDOR_FAIL:
            return {
                ...state,
                isLoading: false,
                addVendorResponse: action.payload
            };
        case DELETEVENDOR_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case DELETEVENDOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteVendorResponse: action.payload
            };
        case DELETEVENDOR_FAIL:
            return {
                ...state,
                isLoading: false,
                deleteVendorResponse: action.payload
            }
        default:
            return state;
    }
};
export default VendorMasterReducer;
