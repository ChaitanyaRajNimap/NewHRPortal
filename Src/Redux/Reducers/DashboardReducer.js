import {
  GETDASHBOARDHEAD_PROGRESS,
  GETDASHBOARDHEAD_SUCCESS,
  GETDASHBOARDHEAD_FAIL,
  GETTOPCLIENTS_PROGRESS,
  GETTOPCLIENTS_SUCCESS,
  GETTOPCLIENTS_FAIL,
  GETNOTES_PROGRESS,
  GETNOTES_SUCCESS,
  GETNOTES_FAIL,
  GETTOPCLIENTDETAILS_PROGRESS,
  GETTOPCLIENTDETAILS_SUCCESS,
  GETTOPCLIENTDETAILS_FAIL,
  EDITNOTES_PROGRESS,
  EDITNOTES_SUCCESS,
  EDITNOTES_FAIL,
} from '../ActionConstant';

const initialState = {
  isLoading: false,
  getDashboardHeadData: null,
  getTopClients: null,
  getNotes: null,
  getTopClientDetails: null,
  updateNotesData: null,
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETDASHBOARDHEAD_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETDASHBOARDHEAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getDashboardHeadData: action.payload,
      };
    case GETDASHBOARDHEAD_FAIL:
      return {
        ...state,
        isLoading: false,
        getDashboardHeadData: action.payload,
      };

    case GETTOPCLIENTS_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETTOPCLIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getTopClients: action.payload,
      };
    case GETTOPCLIENTS_FAIL:
      return {
        ...state,
        isLoading: false,
        getTopClients: action.payload,
      };

    case GETNOTES_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETNOTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getNotes: action.payload,
      };
    case GETNOTES_FAIL:
      return {
        ...state,
        isLoading: false,
        getNotes: action.payload,
      };

    case GETTOPCLIENTDETAILS_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETTOPCLIENTDETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getTopClientDetails: action.payload,
      };
    case GETTOPCLIENTDETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        getTopClientDetails: action.payload,
      };

    case EDITNOTES_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case EDITNOTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updateNotesData: action.payload,
      };
    case EDITNOTES_FAIL:
      return {
        ...state,
        isLoading: false,
        updateNotesData: action.payload,
      };

    default:
      return state;
  }
};

export default DashboardReducer;
