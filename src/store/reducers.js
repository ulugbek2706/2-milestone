import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data:null,
    loading:false,
    error:null,
  };
const reducer = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        getPhoneAndNumberSuccess:(state,action)=>{
            state.data=action.payload;
            state.loading=false;
            state.error=null;
        }
    }
})

export const actions = {...reducer.actions};
const DashboardReducer = reducer.reducer;
export default DashboardReducer;