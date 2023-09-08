import express from "express";
const journeyRouter = express.Router();
import { userAuth } from "../middlewares/users.middleware.js";
import { 
  getInTransit, 
  newContainer, 
  newJourney, 
  createJourneyLog,
  getJourneyLog,
  getStepJourneys,
  updateJourneyLog,
  getSteps,
  getJourneyByContainerNumber
} from "../controllers/journey.controller.js";

journeyRouter.post('/container', userAuth, newContainer)
journeyRouter.post('/journey', userAuth, newJourney);
journeyRouter.get('/in-transit', userAuth, getInTransit);
journeyRouter.post('/journey-log', userAuth, createJourneyLog);
journeyRouter.patch('/journey-log', userAuth, updateJourneyLog);
journeyRouter.get('/journey-log/:journey', userAuth, getJourneyLog);
journeyRouter.get('/step-journeys/:step', userAuth, getStepJourneys);
journeyRouter.get('/steps', userAuth, getSteps);

journeyRouter.get('/journey/:containerNumber',userAuth, getJourneyByContainerNumber)

export default journeyRouter;