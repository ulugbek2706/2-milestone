import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalVisible: false,
  confirmModalVisible:false,
  globalModalDispatch:""
};

const uModalSlice = createSlice({
  name: "uModal",
  initialState,
  reducers: {
    setUModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
    changeConfirmModalVisible:(state,action)=>{
      state.confirmModalVisible=action.payload
    },
    changeGlobalModalDispatch:(state,action)=>{
      state.globalModalDispatch=action.payload
    }
  },
});

export const { setUModalVisible,changeConfirmModalVisible,changeGlobalModalDispatch } = uModalSlice.actions;
export default uModalSlice.reducer;
