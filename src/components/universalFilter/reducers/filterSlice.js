import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    data: [],
    loading: false,
    mapData: {},
    requestParam: null,
    columns: [],
    error: null,
    filterSelectRef:null,
  },
  reducers: {

    changeFilterSelectRef:(state,action)=>{
      state.filterSelectRef=action.payload
    },
    saveFilterMap: (state, action) => {
      state.mapData = {...state.mapData,[action.payload.title]:action.payload.value};
    },
    clearMapData:(state)=>{
      state.mapData={}
    },
    getDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addToMap: (state, action) => {
      console.log(action.payload);
      state.mapData.set();
    },
    getDataSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },
    getDataFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    saveAxiosUrl: (state, action) => {
      state.requestParam = action.payload;
    },
    // dynamic columnlar valuelarini olib kelish funksiyalari

    getLocationColumnOfFilter: (state, action) => {
      // state.columns[]
      // for (let i = 0; i < state.columns.length; i++) {
      //   if (state.columns[i].urlValue === action.payload.urlValue) {
      //     state.columns[i].values = action.payload.data;
      //   }
      // }
    },
  },
});

export const getData = () => ({
  type: "filter/getData",
  payload: null,
});

export const sendFilterAxiosUrl = (url) => ({
  type: "filter/sendUrl",
  payload: url,
});

export const {
  getDataFailure,
  getDataStart,
  getDataSuccess,
  saveAxiosUrl,
  saveFilterMap,
  addToMap,
  changeFilterSelectRef,
  clearMapData
} = filterSlice.actions;
export default filterSlice.reducer;
