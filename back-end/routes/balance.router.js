// External Modules
import { Router } from "express";

// Internal Modules
import { getBalance, deposit } from "../controllers/balance.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../middlewares/auth.middleware.js";
import {
    balanceRules,
    balanceValidation,
} from "../middlewares/balance.middleware.js";

const balanceRoutes = Router();

balanceRoutes.use(authenticationCheck);

balanceRoutes.get("/", authorizationCheck(["investor"]), getBalance);

balanceRoutes.put(
    "/deposit",
    authorizationCheck(["investor"]),
    balanceRules,
    balanceValidation,
    deposit
);

export default balanceRoutes;
