// Internal Modules
import {
    getOwnerProjects,
    getOwnerProject,
    registerProject,
    updateProject,
    deleteProject,
} from "../services/project.service.js";
import { errorResponse } from "../utils/error.response.js";

export const getProjects = async (req, res) => {
    try {
        const projects = await getOwnerProjects(req.user._id);

        res.json(projects);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const getSingleProject = async (req, res) => {
    const { id } = req.params;
    try {
        const projects = await getOwnerProject(req.user._id, id);

        res.json(projects);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const register = async (req, res) => {
    const {
        title,
        description,
        capital,
        initialInvestment,
        maxPercentage,
        status,
    } = req.body;
    const ownerId = req.user._id;

    try {
        const project = await registerProject({
            title,
            description,
            capital,
            initialInvestment,
            maxPercentage,
            status,
            ownerId,
        });

        res.status(201).json({
            message: "The project has been registered successfully!",
            project,
        });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const update = async (req, res) => {
    const { title, description, capital, maxPercentage, status } = req.body;
    const { id } = req.params;

    try {
        const newProject = await updateProject(id, {
            title,
            description,
            capital,
            maxPercentage,
            status,
        });

        res.json({
            message: "The project has been updated successfully",
            newProject,
        });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const deletePr = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteProject({ _id: id });

        res.json({
            message: "The project has been deleted successfully",
        });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};
