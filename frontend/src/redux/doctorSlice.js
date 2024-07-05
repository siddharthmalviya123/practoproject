import {createSlice} from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name:"store_doctor",
    initialState:{
        store_doctor:null,
        // isLoading:false
    },
    reducers:{
        // actions
        setDoctor:(state,action)=>{
            state.store_doctor = action.payload;
        },
    }
});
export const {setDoctor} = doctorSlice.actions;
export default doctorSlice.reducer;