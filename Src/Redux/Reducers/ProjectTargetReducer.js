import {
    GETPROJECTTARGET_PROGRESS,
    GETPROJECTTARGET_SUCCESS,
    GETPROJECTTARGET_FAIL,
    EDITPROJECTTARGET_PROGRESS,
    EDITPROJECTTARGET_SUCCESS,
    EDITPROJECTTARGET_FAIL,
    GETRESOURCE_PROGRESS,
    GETRESOURCE_SUCCESS,
    GETRESOURCE_FAIL,
    ADDPROJECT_PROGRESS,
    ADDPROJECT_SUCCESS,
    ADDPROJECT_FAIL
} from "../ActionConstant";

const initalState = {
    isLoading: false,
    resourceData: {},
    updateProjectTarget: {},
    getResorceData: {},
    addProjectData: {}
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
        case EDITPROJECTTARGET_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case EDITPROJECTTARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updateProjectTarget: action.payload
            };
        case EDITPROJECTTARGET_FAIL:
            return {
                ...state,
                isLoading: false,
                updateProjectTarget: action.payload
            };
        case GETRESOURCE_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case GETRESOURCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getResorceData: action.payload
            };
        case GETRESOURCE_FAIL:
            return {
                ...state,
                isLoading: false,
                getResorceData: action.payload
            };
        case ADDPROJECT_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case ADDPROJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                addProjectData: action.payload
            };
        case ADDPROJECT_FAIL:
            return {
                ...state,
                isLoading: false,
                addProjectData: action.payload
            }
        default:
            return state;
    }
}
export default ProjectTargetReducer;