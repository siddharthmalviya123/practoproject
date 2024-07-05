import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
        isLoading: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setUser, setLoading } = userSlice.actions; // Export actions
export default userSlice.reducer; // Export reducer as default
