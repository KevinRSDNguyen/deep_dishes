import axios from "axios";

import { GET_STORES } from "./types";

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
        payload: null
      });
    });
};
