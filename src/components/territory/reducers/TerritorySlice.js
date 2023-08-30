import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  territory: [],
  currentTerritoryItm:"",
  allTerritorys: 0,
  isLoading: false,
  error: false,
  navigation: "",
  modalVisible: false,
  editModalVisible: false,
  placeName: "",
  latitude: "",
  longitude: "",
  formData: {
    title: "",
    code: "",
    active: false,
    longitude: 0,
    latitude: 0,
  },

};
export const territorySlice = createSlice({
  name: "territory",
  initialState,
  reducers: {
    setModalVisible(state, action) {
      state.modalVisible = action.payload;
    },
    
    setEditModalVisible(state, action) {
      state.editModalVisible = action.payload;
    },
    setPlaceName: (state, action) => {
      state.placeName = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    resetTerritory: (state) => {
      state.placeName = "";
      state.latitude = "";
      state.longitude = "";
    },
    saveTerritory: (state, action) => {
      console.log(action.payload);
    },
    getTerritoryStart:(state,action)=>{
      state.isLoading=true;
    },
    getTerritorySuccess: (state, action) => {
      state.territory = action.payload;
      state.isLoading=false;
    },
    getTerritoryFailure:(state,action)=>{
      state.isLoading=false;
      state.error=action.payload
    },
    getAllTerritorys: (state, action) => {
      state.allTerritorys = action.payload;
    },
    changeCurrentTerritoryItm: (state, action) => {
      state.currentTerritoryItm = action.payload;
    },
    updateTerritory:(state,action)=>{
      state.currentTerritoryItm=action.payload
    }
    
  },
});
export const {
  setModalVisible,
  setLatitude,
  setLongitude,
  setPlaceName,
  resetTerritory,
  setEditModalVisible,
  saveTerritory,
  getTerritorySuccess,
  getTerritoryStart,
  getTerritoryFailure,
  getAllTerritorys,
  changeCurrentTerritoryItm,
} = territorySlice.actions;
export default territorySlice.reducer;
