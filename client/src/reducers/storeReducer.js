import { GET_STORES, GET_STORE } from "../actions/types";

const initialState = {
  stores: [],
  store: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORES:
      return {
        ...state,
        stores: action.payload,
        loading: false
      };
    case GET_STORE:
      return {
        ...state,
        store: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
