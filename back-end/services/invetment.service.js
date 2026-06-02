// External Modules
import mongoose from "mongoose";

// Internal Modules
import Project from "../models/project.schema.js";
import Investment from "../models/investment.schema.js";

export const getOpenProjects = async () =>
    await Project.find({ status: "open" });

export const getProjectDetails = async (projectId) =>
    await Project.findById(projectId);

export const investInProject = async (projectId, amount, investorId) => {
    const project = await getProjectDetails(projectId);

    project.currentAmount += +amount;

    if (!project.investorsIds.includes(investorId))
        project.investorsIds.push(investorId);

    if (project.currentAmount == project.capital) project.status = "closed";

    await project.save();

    const amountPercentage = (+amount * 100) / project.capital;

    return await Investment.create({
        amount,
        investorId,
        projectId: project._id,
        percentageHeld: amountPercentage,
    });
};

export const getInvestorInvestments = async (investorId) => {
    const investments = await Investment.aggregate([
        {
            $match: { investorId: new mongoose.Types.ObjectId(investorId) },
        },
        {
            $lookup: {
                from: "projects",
                localField: "projectId",
                foreignField: "_id",
                as: "project",
            },
        },
        {
            $unwind: "$project",
        },
        {
            $project: {
                _id: 0,
                project: 1,
                amount: 1,
                percentageHeld: 1,
            },
        },
    ]);

    return { investments };
};

export const getProjectPrecentage = async (projectId, investorId) => {
    const data = await Investment.aggregate([
        {
            $match: {
                projectId: new mongoose.Types.ObjectId(projectId),
                investorId: new mongoose.Types.ObjectId(investorId),
            },
        },
        {
            $group: {
                _id: null,
                totalPercantage: { $sum: "$percentageHeld" },
            },
        },
    ]);

    const totalPercantage = data.length ? data[0].totalPercantage : 0;

    return totalPercantage;
};
