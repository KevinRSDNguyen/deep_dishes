import axios from "axios";

import { GET_STORES, GET_STORE } from "./types";

export const getStores = () => dispatch => {
  axios
    .get(`/api/stores`)
    .then(({ data }) => {
      dispatch({
        type: GET_STORES,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_STORES,
        payload: []
      });
    });
};

export const getStore = id => dispatch => {
  dispatch({ type: "CLEAR_STORE" });
  axios
    .get(`/api/stores/${id}`)
    .then(({ data }) => {
      dispatch({
        type: GET_STORE,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_STORE,
        payload: {}
      });
    });
};
