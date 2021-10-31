import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import notificationReducer from "./notificationReducer";

export default combineReducers({
  loading: loadingReducer,
  noti: notificationReducer,
});
