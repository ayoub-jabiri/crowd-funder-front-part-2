// Internal Modules
import {
    getInvestorBalance,
    balanceDeposit,
} from "../services/balance.service.js";
import { errorResponse } from "../utils/error.response.js";

export const getBalance = async (req, res) => {
    try {
        const balance = await getInvestorBalance(req.user._id);

        res.json(balance);
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};

export const deposit = async (req, res) => {
    const { amount } = req.body;
    try {
        const balance = await balanceDeposit(req.user._id, amount);

        res.json({
            message: "The deposit operation has been done successfully!",
            balance,
        });
    } catch (error) {
        console.error(error.message);
        errorResponse(res, 500, "An internal error occured!");
    }
};
