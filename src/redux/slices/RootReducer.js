import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from "pages/login/reducers/LoginSlice";
import DashboardReducer from "components/navbar/reducers/DashboardSlice";
import TerritoryReducer from "components/territory/reducers/TerritorySlice";
import SettingsReducer from "components/settings/reducers/SettingsSlice";
import UModalReducer from "components/universalModal/reducers/UModalSlice";
import TableReducer from "components/universalTable/reducers/tableSlice";
import FilterReducer from "components/universalFilter/reducers/filterSlice";
import ClientReducer from "components/clients/reducers/ClientSlice";
import CustumerCategoryReducer from "components/customerCategory/reducers/CustomerCategorySlice";
import CompanyProfileReducer from "components/componyProfile/reducers/CompanyProfileSlice";
import DragReducer from "./drag/DragSlice"
import LanguageReducer from "./LanguageReducer";
import ClientOnMapReducer from "components/clientOnMap/reducers/clientOnMapSlice";
import WebAppReducer from "components/web-app/reducers/webAppSlice";

const rootReducer = combineReducers({
  // Add more reducers here if needed
  login: LoginReducer,
  dashboard: DashboardReducer,
  territory: TerritoryReducer,
  settings: SettingsReducer,
  uModal: UModalReducer,
  table: TableReducer,
  filter: FilterReducer,
  client: ClientReducer,
  customerCategory:CustumerCategoryReducer,
  companyProfile:CompanyProfileReducer,
  drag:DragReducer,
  language:LanguageReducer,
  clientonmap:ClientOnMapReducer,
  webapp:WebAppReducer
});

export default rootReducer;
