import { createSlice } from "@reduxjs/toolkit";

const dragSlice = createSlice({
    name: "language",
    initialState: {
       selectedLanguage:localStorage.getItem("language") || "eng"
    },
    reducers: {
       changeLanguage:(state, action)=>{
           state.selectedLanguage=action.payload
       }
    },
});

export const { changeLanguage } =
    dragSlice.actions;
export default dragSlice.reducer;
