import express from "express";
const containerRouter = express.Router();
import { userAuth } from "../middlewares/users.middleware.js";
import { containerByNumber } from "../controllers/container.controller.js";

containerRouter.get('/container/:containerNumber', userAuth, containerByNumber);

export default containerRouter;