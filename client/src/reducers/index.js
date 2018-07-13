import { combineReducers } from "redux";
import storeReducer from "./storeReducer";

export default combineReducers({
  store: storeReducer
});
