// External Modules
import { Router } from "express";

// Internal Modules
import {
    getProjects,
    getSingleProject,
    register,
    update,
    deletePr,
} from "../controllers/project.controller.js";
import {
    projectRules,
    updateRules,
    projectValidation,
    projectCheck,
    verifyOwnership,
} from "../middlewares/project.middleware.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";

const projectRoutes = Router();

projectRoutes.use(authenticationCheck);

projectRoutes.get("/", authorizationCheck(["owner"]), getProjects);
projectRoutes.get("/:id", authorizationCheck(["owner"]), getSingleProject);

projectRoutes.post(
    "/register",
    authorizationCheck(["owner"]),
    projectRules,
    projectValidation,
    register
);

projectRoutes.put(
    "/:id",
    authorizationCheck(["owner"]),
    projectCheck,
    verifyOwnership,
    updateRules,
    projectValidation,
    update
);

projectRoutes.delete(
    "/:id",
    authorizationCheck(["owner"]),
    projectCheck,
    verifyOwnership,
    deletePr
);

export default projectRoutes;
