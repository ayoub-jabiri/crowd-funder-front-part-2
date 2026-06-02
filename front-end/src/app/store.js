import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSilce";
import projectsReducer from "../features/projects/projectsSilce";

export const store = configureStore({
    reducer: {
        userAuth: authReducer,
        projects: projectsReducer,
    },
});
