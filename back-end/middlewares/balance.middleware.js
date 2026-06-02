// External Modules
import { body, validationResult } from "express-validator";

export const balanceRules = [
    body("amount")
        .isFloat({ min: 0.01 })
        .withMessage(
            "The deposit amount is required and must be greater than 0"
        ),
];

export const balanceValidation = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty())
        return res.status(400).json({ errors: validation.errors });

    next();
};
