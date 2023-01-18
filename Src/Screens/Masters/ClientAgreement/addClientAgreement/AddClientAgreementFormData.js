const initialState = {
  agreement: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'agreement':
      return {
        ...state,
        agreement: action.payload,
      };
  }
};

export {initialState, reducer};
