import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import habit from "./habit";
import history from "./history";
export default combineReducers({ auth, alert, habit, history });
