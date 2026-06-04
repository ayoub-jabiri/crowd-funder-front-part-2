import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSilce";
import projectsReducer from "./slices/projects/projectsSilce";

export const store = configureStore({
    reducer: {
        userAuth: authReducer,
        projects: projectsReducer,
    },
});
