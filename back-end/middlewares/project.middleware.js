// External Modules
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

// Internal Modules
import { errorResponse } from "../utils/error.response.js";
import { getProject } from "../services/project.service.js";

export const projectRules = [
    body("title").notEmpty().withMessage("The project title is required"),
    body("description")
        .notEmpty()
        .withMessage("The project description is required"),
    body("capital")
        .isFloat({ min: 0.01 })
        .withMessage(
            "The project capital is required and must be greater than 0"
        ),
    body("initialInvestment")
        .isFloat({ min: 0.01 })
        .withMessage("The project initial investment is required ")
        .custom((value, { req }) => {
            if (+value > +req.body.capital) {
                throw new Error(
                    "The project initial investment cannot be greater than the capital"
                );
            }
            return true;
        }),
    body("maxPercentage")
        .isInt()
        .withMessage("The project max percentage is required "),
    body("status")
        .isIn(["open", "closed"])
        .withMessage(
            "The project status is required and must be either 'open' or 'closed'"
        ),
];

export const updateRules = [
    body("title").notEmpty().withMessage("The project title is required"),
    body("description")
        .notEmpty()
        .withMessage("The project description is required"),
    body("capital")
        .isFloat({ min: 0.01 })
        .withMessage(
            "The project capital is required and must be greater than 0"
        ),
    body("maxPercentage")
        .isInt()
        .withMessage("The project max percentage is required "),
    body("status")
        .isIn(["open", "closed"])
        .withMessage(
            "The role is required and must be either 'open' or 'closed'"
        ),
];

export const projectValidation = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty())
        return res.status(400).json({ errors: validation.errors });

    next();
};

export const projectCheck = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return errorResponse(res, 400, "Invalid ID format");

    try {
        const project = await getProject({ _id: id });

        if (!project) return errorResponse(res, 404, "Project not found!");

        next();
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const verifyOwnership = async (req, res, next) => {
    const { id } = req.params;

    try {
        const project = await getProject({ _id: id });

        if (project.ownerId != req.user._id)
            return errorResponse(
                res,
                403,
                "You don't have the right to access or manipulate this project!"
            );

        next();
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};
