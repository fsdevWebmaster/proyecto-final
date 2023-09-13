import express from "express";
import { userAuth } from "../middlewares/users.middleware.js";
import { newContainer, getContainers, containerByNumber } from "../controllers/container.controller.js";

const containerRouter = express.Router();

containerRouter.post('/container', userAuth, newContainer)
containerRouter.get('/containers', userAuth, getContainers);
containerRouter.get('/container/:containerNumber', userAuth, containerByNumber);

export default containerRouter;