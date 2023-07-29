import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "../slices/login/LoginSlice";
import DashboardReducer from "../slices/dashboard/Dashboard";

const rootReducer = combineReducers({
  // Add more reducers here if needed
  login: LoginReducer,
  dashboard: DashboardReducer,
});

export default rootReducer;
