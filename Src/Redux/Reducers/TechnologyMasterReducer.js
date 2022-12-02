import {
    FETCHTECHNOLOFY_PROGRESS,
    FETCHTECHNOLOFY_SUCCESS,
    FETCHTECHNOLOFY_FAIL,
    ADDTECHNOLGY_PROGRESS,
    ADDTECHNOLGY_SUCCESS,
    ADDTECHNOLGY_FAIL,
    UPDATETECHNOLOGY_PROGRESS,
    UPDATETECHNOLOGY_SUCCESS,
    UPDATETECHNOLOGY_FAIL,
    DELETETECHNOLOGY_PROGRESS,
    DELETETECHNOLOGY_SUCCESS,
    DELETETECHNOLOGY_FAIL
} from "../ActionConstant";

const initalState = {
    isLoading: false,
    technologyData: {},
    deleteTechnologyData: {},
    updateTechnologyData: {},
    addTechnologyData: {}
}


const TechnologyMasterReducer = (state = initalState, action) => {

    // console.log("TechnologyMasterReducer", action)
    switch (action.type) {
        case FETCHTECHNOLOFY_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case FETCHTECHNOLOFY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                technologyData: action.payload
            };
        case FETCHTECHNOLOFY_FAIL:
            return {
                ...state,
                isLoading: false,
                technologyData: action.payload
            };
        case ADDTECHNOLGY_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case ADDTECHNOLGY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addTechnologyData: action.payload
            };
        case ADDTECHNOLGY_FAIL:
            return {
                ...state,
                isLoading: false,
                addTechnologyData: action.payload
            };
        case UPDATETECHNOLOGY_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATETECHNOLOGY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updateTechnologyData: action.payload
            };
        case UPDATETECHNOLOGY_FAIL:
            return {
                ...state,
                isLoading: false,
                updateTechnologyData: action.payload
            };
        case DELETETECHNOLOGY_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case DELETETECHNOLOGY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteTechnologyData: action.payload
            };
        case DELETETECHNOLOGY_FAIL:
            return {
                ...state,
                isLoading: false,
                deleteTechnologyData: action.payload
            }
        default:
            return state;
    }


}
export default TechnologyMasterReducer;