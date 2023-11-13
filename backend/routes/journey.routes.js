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
  getJourneyByDriver,
  journeyToUnload,
  getJourneyLogs,
  getJourneyByDriverDocId
} from "../controllers/journey.controller.js";

journeyRouter.post('/journey', /* userAuthWithCookie,*/ createJourney);
journeyRouter.patch('/journey', /* userAuthWithCookie, */ updateJourney);
journeyRouter.post('/journey-log', /*userAuthWithCookie,*/ createJourneyLog);
journeyRouter.patch('/journey-log', /*userAuthWithCookie,*/ updateJourneyLog);
journeyRouter.post('/journey-by-driver', /*userAuthWithCookie,*/ getJourneyByDriver);
journeyRouter.post('/journey-to-unload', /*userAuthWithCookie,*/ journeyToUnload)
journeyRouter.post('/find-journey-log', /*userAuthWithCookie,*/ getJourneyLog);
journeyRouter.get('/step-journeys/:step', /*userAuthWithCookie,*/ getStepJourneys);
journeyRouter.get('/steps', /*userAuthWithCookie,*/ getSteps);
journeyRouter.get('/journey/:containerNumber', /*userAuthWithCookie,*/ getJourneyByContainerNumber)
journeyRouter.get('/journey-logs/:journeyId', getJourneyLogs);
journeyRouter.get('/journey-by-driver-doc-id/:driverDocId', getJourneyByDriverDocId);

export default journeyRouter;
