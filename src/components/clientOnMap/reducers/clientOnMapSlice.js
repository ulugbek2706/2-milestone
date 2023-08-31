import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
    territories:[],
    error:null
};
export const clientonmapSlice = createSlice({
    name: "clientonmap",
    initialState,
    reducers: {

        getTerritoriesStart: (state, action)=>{
            state.isLoading=true
        },
        getTerritoriesSuccess: (state, action)=>{
            state.territories=action.payload
            state.isLoading=false
        },
        getTerritoriesFailure: (state, action)=>{
            state.error=action.payload
            state.isLoading=false
        }
    },
});
export const { getTerritoriesStart,getTerritoriesSuccess,getTerritoriesFailure} =
    clientonmapSlice.actions;
export default clientonmapSlice.reducer;
