const initialState = {
  Authentication: [],
  isLoggedIn: false,
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_AUTH_PENDING':
      return {
        ...state,
        isLoggedIn: false,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'GET_AUTH_REJECTED':
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_AUTH_FULFILLED':
      return {
        ...state,
        isLoading: true,
        isLoading: false,
        isFulfilled: true,
        Authentication: action.payload.data,
      };
    default:
      return state;
  }
};

export default Auth;
