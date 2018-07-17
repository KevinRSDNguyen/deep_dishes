import axios from "axios";

import {
  GET_STORES,
  GET_STORE,
  CLEAR_STORE,
  STORE_LOADING,
  GET_TAGS
} from "./types";

export const getStores = () => dispatch => {
  dispatch(setStoreLoading());
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
  dispatch({ type: CLEAR_STORE });
  dispatch(setStoreLoading());
  axios
    .get(`/api/stores/id/${id}`)
    .then(({ data }) => {
      dispatch({
        type: GET_STORE,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_STORE,
        payload: null
      });
    });
};

export const getStoreBySlug = slug => dispatch => {
  dispatch({ type: CLEAR_STORE });
  dispatch(setStoreLoading());
  axios
    .get(`/api/stores/slug/${slug}`)
    .then(({ data }) => {
      dispatch({
        type: GET_STORE,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_STORE,
        payload: null
      });
    });
};

//Add Store
export const addStore = (store, history) => dispatch => {
  axios
    .post("/api/stores/add", store)
    .then(response => {
      history.push("/");
    })
    .catch(({ response }) => {
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: response.data
      // });
      console.log(response.data);
    });
};

//Add Store
export const editStore = (id, store, history) => dispatch => {
  axios
    .post(`/api/stores/id/${id}/edit`, store)
    .then(res => {
      history.push(`/store/${store.slug}`);
      // this.props.getStore(this.props.match.params.id);
    })
    .catch(({ response }) => {
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: response.data
      // });
      console.log(response.data);
    });
};

export const getTags = () => dispatch => {
  // dispatch({ type: CLEAR_STORE });
  // dispatch(setStoreLoading());
  axios
    .get(`/api/stores/tags`)
    .then(({ data }) => {
      dispatch({
        type: GET_TAGS,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_TAGS,
        payload: []
      });
    });
};

//Set Loading State
export const setStoreLoading = () => {
  return {
    type: STORE_LOADING
  };
};
