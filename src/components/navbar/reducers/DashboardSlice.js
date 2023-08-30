// DashboardSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getPhoneAndNumberSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchPhoneAndNumber: (state) => {
      state.loading = true;
    },
    fetchPhoneAndNumberError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPhoneAndNumberSuccess,
  fetchPhoneAndNumber,
  fetchPhoneAndNumberError,
} = dashboardSlice.actions;


export default dashboardSlice.reducer;
