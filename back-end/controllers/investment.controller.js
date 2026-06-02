// Internal Modules
import {
    getOpenProjects,
    getProjectDetails,
    investInProject,
    getInvestorInvestments,
} from "../services/invetment.service.js";
import { decreaseBalance } from "../services/balance.service.js";
import { errorResponse } from "../utils/error.response.js";

export const openProjects = async (req, res) => {
    try {
        const projects = await getOpenProjects();

        res.json(projects);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const projectDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await getProjectDetails(id);

        res.json(project);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const projectInvest = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
        const investment = await investInProject(id, amount, req.user._id);

        await decreaseBalance(req.user._id, amount);

        res.json(investment);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const getInvestments = async (req, res) => {
    try {
        const investments = await getInvestorInvestments(req.user._id);

        res.send(investments);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};
