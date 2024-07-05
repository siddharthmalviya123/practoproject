import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import clinicReducer from "./clinicSlice"
import doctorReducer from "./doctorSlice";

const store = configureStore({
    reducer: {
        user: userReducer, // Use 'user' as the key for userReducer
        store_doctor: doctorReducer,
        store_clinic: clinicReducer,
    }
});

export default store;
