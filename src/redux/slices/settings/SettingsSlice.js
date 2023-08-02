import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  settings:[]
};

const SettingsSlice=createSlice({
    name:"settings",
    initialState,
    reducers:{
        getSettings:(state,action)=>{
            state.settings=action.payload
        }
    }
});

export const {getSettings}=SettingsSlice.actions;
export default SettingsSlice.reducer;
