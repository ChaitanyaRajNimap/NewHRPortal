const initalState = {
  previousclient: null,
  previousclientError: null,
  dateofinvoice: null,
  dateofinvoiceError: null,
  creditperiod: null,
  creditperiodError: null,
  Adddateofinvoice: null,
  AdddateofinvoiceError: null,
  Addcreditperiod: null,
  AddcreditperiodError: null,
};

const reducer = (state = initalState, action) => {
  console.log('acttttttttttt', action);
  switch (action.type) {
    case 'previousclient':
      return {
        ...state,
        previousclient: action.payload,
      };

    case 'previousclientError':
      return {
        ...state,
        previousclientError: action.payload,
      };
    case 'dateofinvoice':
      return {
        ...state,
        dateofinvoice: action.payload,
      };

    case 'dateofinvoiceError':
      return {
        ...state,
        dateofinvoiceError: action.payload,
      };
    case 'creditperiod':
      return {
        ...state,
        creditperiod: action.payload,
      };

    case 'creditperiodError':
      return {
        ...state,
        creditperiodError: action.payload,
      };
    case 'Adddateofinvoice':
      return {
        ...state,
        Adddateofinvoice: action.payload,
      };

    case 'AdddateofinvoiceError':
      return {
        ...state,
        AdddateofinvoiceError: action.payload,
      };
    case 'Addcreditperiod':
      return {
        ...state,
        Addcreditperiod: action.payload,
      };

    case 'AddcreditperiodError':
      return {
        ...state,
        AddcreditperiodError: action.payload,
      };
    default:
      return state;
  }
};

export {initalState, reducer};
