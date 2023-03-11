const initalState = {
  resume: null,
  resumeError: null,
  client: null,
  clientError: null,
  resource: null,
  resourceError: null,
  startDate: null,
  startDateError: null,
  EndDate: null,
  EndDateError: null,
  Order: null,
  OrderError: null,
};

const editreducer = (state, action) => {
  switch (action.type) {
    case 'resume':
      return {
        ...state,
        resume: action.payload,
      };

    case 'resumeError':
      return {
        ...state,
        resumeError: action.payload,
      };
    case 'client':
      return {
        ...state,
        client: action.payload,
      };

    case 'clientError':
      return {
        ...state,
        clientError: action.payload,
      };
    case 'resource':
      return {
        ...state,
        resource: action.payload,
      };

    case 'resourceError':
      return {
        ...state,
        resourceError: action.payload,
      };
    case 'startDate':
      return {
        ...state,
        startDate: action.payload,
      };

    case 'startDateError':
      return {
        ...state,
        startDateError: action.payload,
      };

    case 'EndDate':
      return {
        ...state,
        EndDate: action.payload,
      };
    case 'EndDateError':
      return {
        ...state,
        EndDateError: action.payload,
      };
    case 'Order':
      return {
        ...state,
        Order: action.payload,
      };
    case 'OrderError':
      return {
        ...state,
        OrderError: action.payload,
      };
    default:
      return state;
  }
};

export {initalState, editreducer};
