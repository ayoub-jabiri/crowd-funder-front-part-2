import Project from "../models/project.schema.js";

export const registerProject = async (project) => await Project.create(project);

export const getProject = async (query) => await Project.findOne(query);

export const getOwnerProjects = async (ownerId) =>
    await Project.find({ ownerId });

export const getOwnerProject = async (ownerId, projectId) =>
    await Project.findOne({ ownerId, _id: projectId }).populate(
        "investorsIds",
        "name"
    );

export const deleteProject = async (projectId) =>
    await Project.deleteOne(projectId);

export const updateProject = async (id, newData) => {
    const project = await Project.findById(id).populate("investorsIds", "name");

    project.title = newData.title;
    project.description = newData.description;
    project.capital = newData.capital;
    project.maxPercentage = newData.maxPercentage;

    if (project.capital > project.currentAmount)
        project.status = newData.status;

    return await project.save();
};
