// Internal Modules
import { getUsers } from "../services/user.service.js";
import { getInvestorData, getOwnerData } from "../services/user.service.js";
import { errorResponse } from "../utils/error.response.js";

export const getInvestors = async (req, res) => {
    try {
        const investors = await getUsers({ role: "investor" });

        res.json(investors);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const getOwners = async (req, res) => {
    try {
        const owners = await getUsers({ role: "owner" });

        res.json(owners);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const getInvestorPortfolio = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await getInvestorData(id);

        res.json(data);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const getOwnerPortfolio = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await getOwnerData(id);

        res.json(data);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};
