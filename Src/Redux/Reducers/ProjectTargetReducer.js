import {
    GETPROJECTTARGET_PROGRESS,
    GETPROJECTTARGET_SUCCESS,
    GETPROJECTTARGET_FAIL
} from "../ActionConstant";

const initalState = {
    isLoading: false,
    resourceData: {}
}

const ProjectTargetReducer = (state = initalState, action) => {

   // console.log("ProjectTargetReducer", action)
    switch (action.type) {
        case GETPROJECTTARGET_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case GETPROJECTTARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resourceData: action.payload
            };
        case GETPROJECTTARGET_FAIL:
            return {
                ...state,
                isLoading: false,
                resourceData: action.payload
            };
        default:
            return state;
    }
}
export default ProjectTargetReducer;