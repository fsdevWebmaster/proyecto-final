import express from "express";
const containerRouter = express.Router();
import { userAuth } from "../middlewares/users.middleware.js";
import { getContainers } from "../controllers/container.controller.js";
import { containerByNumber, updateContainer } from "../controllers/container.controller.js";

containerRouter.get('/containers', userAuth, getContainers);
containerRouter.get('/container/:containerNumber', userAuth, containerByNumber);

containerRouter.patch('/container/:id', userAuth, updateContainer)

export default containerRouter;