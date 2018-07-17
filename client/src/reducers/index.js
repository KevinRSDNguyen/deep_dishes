import { combineReducers } from "redux";
import storeReducer from "./storeReducer";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  store: storeReducer
});
