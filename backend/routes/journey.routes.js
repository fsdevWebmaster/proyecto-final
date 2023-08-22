import express from "express";
const journeyRouter = express.Router();
import { userAuth } from "../middlewares/users.middleware.js";
import { newContainer, newJourney, getJourneyByContainerNumber } from "../controllers/journey.controller.js";

journeyRouter.post('/container', userAuth, newContainer)
journeyRouter.post('/journey', userAuth, newJourney);

journeyRouter.get('/journey/:containerNumber',userAuth, getJourneyByContainerNumber)

export default journeyRouter;