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

const initalState = {
    isLoading: false,
    externalProductData: {},
    deleteProductData: {},
    updateProductData: {},
    addProductData: {}
}

const ExternalProdReducer = (state = initalState, action) => {
    // console.log("ExternalProdReducer", action)
    switch (action.type) {
        case FETCHEXTERNALPROD_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case FETCHEXTERNALPROD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                externalProductData: action.payload
            };
        case FETCHEXTERNALPROD_FAIL:
            return {
                ...state,
                isLoading: false,
                externalProductData: action.payload
            };
        case DELETEPRODUCT_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case DELETEPRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteProductData: action.payload
            };
        case DELETEPRODUCT_FAIL:
            return {
                ...state,
                isLoading: false,
                deleteProductData: action.payload
            }
        case ADDPRODUCT_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case ADDPRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addProductData: action.payload
            };
        case ADDPRODUCT_FAIL:
            return {
                ...state,
                isLoading: false,
                addProductData: action.payload
            };
        case UPDATEPRODUCT_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATEPRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updateProductData: action.payload
            };
        case UPDATEPRODUCT_FAIL:
            return {
                ...state,
                isLoading: false,
                updateProductData: action.payload
            }

        default:
            return state;
    }
}
export default ExternalProdReducer;