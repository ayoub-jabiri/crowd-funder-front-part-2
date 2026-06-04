import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogin: (currentState, action) => {
            const { token, role } = action.payload;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            currentState.token = token;
            currentState.role = role;
        },
        userLogout: (currentState) => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            currentState.token = null;
            currentState.role = null;
        },
    },
});

export const { userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
