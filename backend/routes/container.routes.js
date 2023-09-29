import express from "express";

import { userAuthWithCookie } from "../middlewares/users.middleware.js";
import { newContainer, getContainers, containerByNumber, updateContainer } from "../controllers/container.controller.js";

const containerRouter = express.Router();

containerRouter.post('/container', userAuthWithCookie, newContainer)
containerRouter.get('/containers', userAuthWithCookie, getContainers);
containerRouter.get('/container/:containerNumber', userAuthWithCookie, containerByNumber);

containerRouter.patch('/container/:id', userAuth, updateContainer)

export default containerRouter;