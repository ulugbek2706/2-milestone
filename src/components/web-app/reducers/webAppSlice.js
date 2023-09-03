import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    webClient: null,
    webLongitude: null,
    webLatitude: null,
    webConfirmModalVisible: false

};

const WebAppSlice = createSlice({
    name: "webapp",
    initialState,
    reducers: {
        saveWebClient: (state, action) => {
            state.webClient = action.payload
        },
        setWebLocation: (state, action) => {
            state.webLongitude = action.payload.longitude;
            state.webLatitude = action.payload.latitude;
        },
        changeWebConfirmModalVisible: (state, action) => {
            state.webConfirmModalVisible = action.payload;
        }

    }
});

export const {setWebLocation,saveWebClient, changeWebConfirmModalVisible} = WebAppSlice.actions;
export default WebAppSlice.reducer;
