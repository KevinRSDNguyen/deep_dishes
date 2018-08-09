import axios from "axios";
import setAuthToken from "./../utility/setAuthToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./types";

//Register User
export const registerUser = userData => {
  return axios
    .post("/api/users/register", userData)
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return Promise.reject(err.response.data.errors);
    });
};

//Login - Get User Token
export const loginUser = userData => dispatch => {
  return axios
    .post("/api/users/login", userData)
    .then(({ data: { token } }) => {
      //Set token to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current User
      dispatch(setCurrentUser(decoded));
      return "Done";
    })
    .catch(err => {
      return Promise.reject(err.response.data.errors);
    });
};

//Set Logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //Remove Auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
