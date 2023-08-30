import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalClients: false,
  territory: [],
  customerCategory: [],
  clients: [],
  isLoading: false,
  error: false,
  allLocations:[],
  editingData:"",
  currentClient:""
};
export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    getTeritoriesSuccess: (state, action) => {
      state.territory = action.payload;
    },
    getClientsSuccess: (state, action) => {
      state.clients = action.payload;
    },
    saveClient: (state, action) => {},
    setModalClients: (state, action) => {
      state.editingData={
      territory: "",
      category: "",
      name: "",
      companyName: "",
      address: "",
      telephone: "",
      tin:"",
      active: "",
      }
      
      
      state.modalClients = action.payload;
    },
    getAllCustomerCategorySuccess:(state,action)=>{
      state.customerCategory=action.payload
    },

    getAllLocations:(state,action)=>{
      state.allLocations=action.payload
    },
    setEditingData:(state, action) => {
      state.editingData = action.payload
  },
  updateCurrentClient:(state,action)=>{
      state.currentClient=action.payload
  }
  },
});
export const { getTeritoriesSuccess, getClientsSuccess, setModalClients,getAllCustomerCategorySuccess,getAllLocations,setEditingData,updateCurrentClient } =
  clientSlice.actions;
export default clientSlice.reducer;
