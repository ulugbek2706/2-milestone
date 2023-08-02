import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "../slices/login/LoginSlice";
import DashboardReducer from "../slices/dashboard/DashboardSlice";
import TerritoryReducer from "./Territory/TerritorySlice";
import SettingsReducer from "./settings/SettingsSlice"

const rootReducer = combineReducers({
  // Add more reducers here if needed
  login: LoginReducer,
  dashboard: DashboardReducer,
  territory: TerritoryReducer,
  settings: SettingsReducer
});

export default rootReducer;
