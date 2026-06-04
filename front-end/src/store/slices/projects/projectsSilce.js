import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ownerProjects: null,
    currentProject: null,
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        getProjects: (currentState, action) => {
            const { projects } = action.payload;
            currentState.ownerProjects = projects;
        },
        createProject: (currentState, action) => {
            const { newProject } = action.payload;
            currentState.ownerProjects.push(newProject);
        },
        getSingleProject: (currentState, action) => {
            const { project } = action.payload;

            currentState.currentProject = project;
        },
        handleOpenAndCloseProject: (currentState, action) => {
            const { project } = action.payload;

            currentState.currentProject = project;
        },
        deleteProject: (currentState, action) => {
            const { projectId } = action.payload;
            currentState.ownerProjects = currentState.ownerProjects.filter(
                (project) => project._id !== projectId
            );
        },
    },
});

export const {
    getProjects,
    createProject,
    getSingleProject,
    handleOpenAndCloseProject,
    deleteProject,
} = projectsSlice.actions;
export default projectsSlice.reducer;
