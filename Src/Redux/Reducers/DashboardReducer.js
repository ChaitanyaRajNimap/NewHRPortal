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
} from '../ActionConstant';

const initialState = {
  isLoading: false,
  getDashboardHeadData: null,
  getTopClients: null,
  getNotes: null,
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

    default:
      return state;
  }
};

export default DashboardReducer;
