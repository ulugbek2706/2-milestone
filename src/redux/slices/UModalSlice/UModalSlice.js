import { createSlice } from "@reduxjs/toolkit";

const initialState={

}

const uModalSlice=createSlice({
    name:"uModal",
    initialState,
    reducers:{
        setUModal:(state,action)=>{

        }
    }
})

export const {setUModal}=uModalSlice.actions;
export default uModalSlice.reducer;  