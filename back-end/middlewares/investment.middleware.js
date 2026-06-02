// External Modules
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

// Internal Modules
import {
    getProjectDetails,
    getProjectPrecentage,
} from "../services/invetment.service.js";
import { getInvestorBalance } from "../services/balance.service.js";
import { errorResponse } from "../utils/error.response.js";

export const invetmentRules = [
    body("amount")
        .isFloat({ min: 0.01 })
        .withMessage(
            "The investment amount is required and must be greater than 0"
        ),
];

export const invetmentValidation = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty())
        return res.status(400).json({ errors: validation.errors });

    next();
};

export const projectExistenceCheck = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return errorResponse(res, 400, "Invalid ID format");

        const project = await getProjectDetails(id);

        if (!project) return errorResponse(res, 404, "Project not found!");

        next();
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const balanceCheck = async (req, res, next) => {
    const { amount } = req.body;
    try {
        const balance = await getInvestorBalance(req.user._id);

        if (amount > balance.balance)
            return errorResponse(
                res,
                400,
                "There is no sufficient balance to invest from!"
            );

        next();
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const investmentCheck = async (req, res, next) => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
        const project = await getProjectDetails(id);

        // Check if the project is open
        if (project.status == "closed")
            return errorResponse(res, 400, "The project is closed!");

        // Check if the amount percentage override the max percentage
        const amountPercentage = (+amount * 100) / project.capital;

        if (amountPercentage > project.maxPercentage)
            return errorResponse(
                res,
                400,
                `The investment cannot be proceeded because the amount percentage, which is '${amountPercentage}%', is overriding the max investment percentage '${project.maxPercentage}%'!`
            );

        // Check if the amount override the capital
        const currentAmount = amount + project.currentAmount;

        if (currentAmount > project.capital) {
            return errorResponse(
                res,
                400,
                `The investment cannot be proceeded because the amount will override the project capital which is '${
                    project.capital
                }'. Only the amount of '${
                    project.capital - project.currentAmount
                }' is allowed!`
            );
        }

        next();
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const percentageCheck = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await getProjectDetails(id);
        const investmentPercentage = await getProjectPrecentage(
            id,
            req.user._id
        );
        if (investmentPercentage >= project.maxPercentage)
            return errorResponse(
                res,
                400,
                `You cannot invest in this project any more because you will override the max allowed investment percentage '${project.maxPercentage}%'`
            );
        next();
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};
