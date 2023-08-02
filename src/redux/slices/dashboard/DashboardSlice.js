import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};
const dashboardSilce = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getPhoneAndNumberSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {getPhoneAndNumberSuccess} =dashboardSilce.actions;
const DashboardReducer = dashboardSilce.reducer;
export default DashboardReducer;
