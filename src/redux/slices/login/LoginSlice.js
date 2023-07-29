import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
    supportPhone: null,
    accessToken: null,
  },
  reducers: {
    loginUserStart: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },

    getSupportPhoneSuccess: (state, action) => {
      state.supportPhone = action.payload;
    },
    getToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const loginUser = (userData) => ({
  type: "user/loginUser",
  payload: userData,
});

export const getSupportPhone = () => ({
  type: "user/getSupportPhone",
  payload: null,
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  loginUserStart,
  addPhone,
  getSupportPhoneSuccess,
  getToken,
} = authSlice.actions;
export default authSlice.reducer;
