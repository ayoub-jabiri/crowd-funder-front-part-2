import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogin: (currentState, action) => {
            const { token } = action.payload;

            localStorage.setItem("token", token);
            currentState.token = token;
        },
        userLogout: (currentState) => {
            localStorage.removeItem("token");
            currentState.token = null;
        },
    },
});

export const { userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
