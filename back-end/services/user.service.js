// External Modules
import mongoose from "mongoose";

// Internal Modules
import User from "../models/user.schema.js";
import Project from "../models/project.schema.js";
import Investment from "../models/investment.schema.js";

export const registerUser = async (user) => await User.create(user);

export const getUser = async (query) => await User.findOne(query);

export const getUsers = async (query) => await User.find(query);

export const getInvestorData = async (investorId) => {
    const projects = await Project.find({ investorsIds: investorId });

    const totalInvestments = await Investment.countDocuments({ investorId });

    return {
        totalInvestments,
        fundedProjects: projects,
    };
};

export const getOwnerData = async (ownerId) => {
    const projects = await Project.find({ ownerId });

    const [{ initialInvestments, totalFunds }] = await Project.aggregate([
        {
            $match: { ownerId: new mongoose.Types.ObjectId(ownerId) },
        },
        {
            $group: {
                _id: null,
                initialInvestments: { $sum: "$initialInvestment" },
                totalFunds: { $sum: "$currentAmount" },
            },
        },
    ]);

    const totalMoneyCollected = totalFunds - initialInvestments;

    return {
        totalMoneyCollected,
        createdProjects: projects,
    };
};
