import express from "express";

import { userAuthWithCookie } from "../middlewares/users.middleware.js";
import { newContainer, getContainers, containerByNumber, updateContainer, containerById } from "../controllers/container.controller.js";

const containerRouter = express.Router();

containerRouter.post('/container', userAuthWithCookie, newContainer)
containerRouter.get('/containers', userAuthWithCookie, getContainers);
containerRouter.get('/container/:containerNumber', userAuthWithCookie, containerByNumber);
containerRouter.get('/container/find/:containerId', userAuthWithCookie, containerById);

containerRouter.patch('/container/:id', userAuthWithCookie, updateContainer)

export default containerRouter;