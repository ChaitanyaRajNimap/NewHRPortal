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
  ADDNOTES_PROGRESS,
  ADDNOTES_SUCCESS,
  ADDNOTES_FAIL,
  EDITNOTES_PROGRESS,
  EDITNOTES_SUCCESS,
  EDITNOTES_FAIL,
  DELETENOTES_PROGRESS,
  DELETENOTES_SUCCESS,
  DELETENOTES_FAIL,
  GETCURRENTRES_PROGRESS,
  GETCURRENTRES_SUCCESS,
  GETCURRENTRES_FAIL,
  GETDASHUPCOMINGRES_PROGRESS,
  GETDASHUPCOMINGRES_SUCCESS,
  GETDASHUPCOMINGRES_FAIL,
  GETDASHPROJECTTARGET_PROGRESS,
  GETDASHPROJECTTARGET_SUCCESS,
  GETDASHPROJECTTARGET_FAIL,
  GETRESCONTRACTEND_PROGRESS,
  GETRESCONTRACTEND_SUCCESS,
  GETRESCONTRACTEND_FAIL,
  GETPURCHASEORDEREND_PROGRESS,
  GETPURCHASEORDEREND_SUCCESS,
  GETPURCHASEORDEREND_FAIL,
  GETCLIENTAGREEMENTEND_PROGRESS,
  GETCLIENTAGREEMENTEND_SUCCESS,
  GETCLIENTAGREEMENTEND_FAIL,
  GETTECHNOLOGY_PROGRESS,
  GETTECHNOLOGY_SUCCESS,
  GETTECHNOLOGY_FAIL,
} from '../ActionConstant';

const initialState = {
  isLoading: false,
  getDashboardHeadData: null,
  getTopClients: null,
  getNotes: null,
  getTopClientDetails: null,
  getCurrentRes: null,
  getDashUpcomingRes: null,
  getDashProjectTarget: null,
  getResContractEnd: null,
  getPurchaseOrderEnd: null,
  getClientAgreementEnd: null,
  getTechnology: null,
  addNotesData: null,
  updateNotesData: null,
  deleteNotesData: null,
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

    case GETCURRENTRES_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETCURRENTRES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getCurrentRes: action.payload,
      };
    case GETCURRENTRES_FAIL:
      return {
        ...state,
        isLoading: false,
        getCurrentRes: action.payload,
      };

    case GETDASHUPCOMINGRES_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETDASHUPCOMINGRES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getDashUpcomingRes: action.payload,
      };
    case GETDASHUPCOMINGRES_FAIL:
      return {
        ...state,
        isLoading: false,
        getDashUpcomingRes: action.payload,
      };

    case GETDASHPROJECTTARGET_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETDASHPROJECTTARGET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getDashProjectTarget: action.payload,
      };
    case GETDASHPROJECTTARGET_FAIL:
      return {
        ...state,
        isLoading: false,
        getDashProjectTarget: action.payload,
      };

    case GETRESCONTRACTEND_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETRESCONTRACTEND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getResContractEnd: action.payload,
      };
    case GETRESCONTRACTEND_FAIL:
      return {
        ...state,
        isLoading: false,
        getResContractEnd: action.payload,
      };

    case GETPURCHASEORDEREND_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETPURCHASEORDEREND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getPurchaseOrderEnd: action.payload,
      };
    case GETPURCHASEORDEREND_FAIL:
      return {
        ...state,
        isLoading: false,
        getPurchaseOrderEnd: action.payload,
      };

    case GETCLIENTAGREEMENTEND_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETCLIENTAGREEMENTEND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getClientAgreementEnd: action.payload,
      };
    case GETCLIENTAGREEMENTEND_FAIL:
      return {
        ...state,
        isLoading: false,
        getClientAgreementEnd: action.payload,
      };

    case GETTECHNOLOGY_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case GETTECHNOLOGY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getTechnology: action.payload,
      };
    case GETTECHNOLOGY_FAIL:
      return {
        ...state,
        isLoading: false,
        getTechnology: action.payload,
      };

    case ADDNOTES_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case ADDNOTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addNotesData: action.payload,
      };
    case ADDNOTES_FAIL:
      return {
        ...state,
        isLoading: false,
        addNotesData: action.payload,
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

    case DELETENOTES_PROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case DELETENOTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteNotesData: action.payload,
      };
    case DELETENOTES_FAIL:
      return {
        ...state,
        isLoading: false,
        deleteNotesData: action.payload,
      };

    default:
      return state;
  }
};

export default DashboardReducer;
