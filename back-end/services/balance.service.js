import Balance from "../models/balance.schema.js";

export const getInvestorBalance = async (investorId) =>
    await Balance.findOne({ investorId });

export const createBalance = async (investorId) =>
    await Balance.create({
        investorId,
    });

export const balanceDeposit = async (investorId, amount) => {
    const balance = await Balance.findOne({
        investorId,
    });

    balance.balance += +amount;

    return await balance.save();
};

export const decreaseBalance = async (investorId, amount) => {
    const balance = await Balance.findOne({
        investorId,
    });

    balance.balance -= +amount;

    return await balance.save();
};
