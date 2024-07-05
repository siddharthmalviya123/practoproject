import {createSlice} from "@reduxjs/toolkit";

const clinicSlice = createSlice({
    name:"store_clinic",
    initialState:{
        store_clinic:null,
        // isLoading:false
    },
    reducers:{
        // actions
        setClinic:(state,action)=>{
            state.store_clinic = action.payload;
        },
    }
});
export const {setClinic} = clinicSlice.actions;
export default clinicSlice.reducer;