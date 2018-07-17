import { combineReducers } from "redux";
import storeReducer from "./storeReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  store: storeReducer
});
