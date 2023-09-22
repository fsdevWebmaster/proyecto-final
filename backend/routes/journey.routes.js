import express from "express";
const journeyRouter = express.Router();
import { userAuth } from "../middlewares/users.middleware.js";
import {  
  createJourney, 
  createJourneyLog,
  getJourneyLog,
  getStepJourneys,
  updateJourneyLog,
  getSteps,
  getJourneyByContainerNumber,
  updateJourney,
  getJourneyByDriver
} from "../controllers/journey.controller.js";

journeyRouter.post('/journey', userAuth, createJourney);
journeyRouter.patch('/journey', updateJourney);
journeyRouter.post('/journey-log', userAuth, createJourneyLog);
journeyRouter.patch('/journey-log', userAuth, updateJourneyLog);
journeyRouter.post('/journey-by-driv', userAuth, getJourneyByDriver);
journeyRouter.get('/journey-log/:journey', userAuth, getJourneyLog);
journeyRouter.get('/step-journeys/:step', userAuth, getStepJourneys);
journeyRouter.get('/steps', userAuth, getSteps);
journeyRouter.get('/journey/:containerNumber',userAuth, getJourneyByContainerNumber)


export default journeyRouter;