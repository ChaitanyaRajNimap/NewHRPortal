const initialState = {
  client: null,
  resource: null,
  agreementType: null,
  startDate: null,
  endDate: null,
  agreement: null,
  clientError: null,
  resourceError: null,
  agreementTypeError: null,
  startDateError: null,
  endDateError: null,
  agreementError: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'client':
      return {
        ...state,
        client: action.payload,
      };
    case 'resource':
      return {
        ...state,
        resource: action.payload,
      };
    case 'agreementType':
      return {
        ...state,
        agreementType: action.payload,
      };
    case 'startDate':
      return {
        ...state,
        startDate: action.payload,
      };
    case 'endDate':
      return {
        ...state,
        endDate: action.payload,
      };
    case 'agreement':
      return {
        ...state,
        agreement: action.payload,
      };
    case 'clientError':
      return {
        ...state,
        clientError: action.payload,
      };
    case 'resourceError':
      return {
        ...state,
        resourceError: action.payload,
      };
    case 'agreementTypeError':
      return {
        ...state,
        agreementTypeError: action.payload,
      };
    case 'startDateError':
      return {
        ...state,
        startDateError: action.payload,
      };
    case 'endDateError':
      return {
        ...state,
        endDateError: action.payload,
      };
    case 'agreementError':
      return {
        ...state,
        agreementError: action.payload,
      };
    default:
      return state;
  }
};

export {initialState, reducer};
