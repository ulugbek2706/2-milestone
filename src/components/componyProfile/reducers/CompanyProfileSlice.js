import { createSlice } from "@reduxjs/toolkit";

const initialState={
    companyProfile:[],
    companyProfileModal:false,
    totalCompanyProfile:0
}

const companyProfileSlice=createSlice({
    name:"companyProfile",
    initialState,
    reducers:{
        getCompanyProfile:(state,action)=>{

        },
        getCompanyProfileSuccess:(state,action)=>{
            state.companyProfile=action.payload
        }

    }

})

export const {getCompanyProfile,getCompanyProfileSuccess}=companyProfileSlice.actions;
export default companyProfileSlice.reducer