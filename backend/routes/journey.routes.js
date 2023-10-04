import express from "express";

const journeyRouter = express.Router();
import { userAuthWithCookie } from "../middlewares/users.middleware.js";
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

journeyRouter.post('/journey', userAuthWithCookie, createJourney);
journeyRouter.patch('/journey', userAuthWithCookie, updateJourney);
journeyRouter.post('/journey-log', userAuthWithCookie, createJourneyLog);
journeyRouter.patch('/journey-log', userAuthWithCookie, updateJourneyLog);
journeyRouter.post('/journey-by-driver', userAuthWithCookie, getJourneyByDriver);
journeyRouter.get('/journey-log/:journey', userAuthWithCookie, getJourneyLog);
journeyRouter.get('/step-journeys/:step', userAuthWithCookie, getStepJourneys);
journeyRouter.get('/steps', userAuthWithCookie, getSteps);
journeyRouter.get('/journey/:containerNumber',userAuthWithCookie, getJourneyByContainerNumber)



export default journeyRouter;