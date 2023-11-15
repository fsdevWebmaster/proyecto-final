import express from "express";
import { userAuthWithCookie, userAuthWithBearer } from "../middlewares/users.middleware.js";
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
  getJourneyByDriverDocId,
  finishJourney,
  getStations
} from "../controllers/journey.controller.js";

const journeyRouter = express.Router();

journeyRouter.post('/journey', userAuthWithCookie, createJourney);
journeyRouter.post('/journey-log', userAuthWithCookie, createJourneyLog);
journeyRouter.post('/journey-by-driver', userAuthWithCookie, getJourneyByDriver);
journeyRouter.post('/journey-to-unload', userAuthWithCookie, journeyToUnload)
journeyRouter.post('/find-journey-log', userAuthWithCookie, getJourneyLog);
journeyRouter.post('/finish-journey', userAuthWithCookie, finishJourney);
journeyRouter.patch('/journey', userAuthWithCookie, updateJourney);
journeyRouter.patch('/journey-log', userAuthWithCookie, updateJourneyLog);
journeyRouter.get('/step-journeys/:step', userAuthWithCookie, getStepJourneys);
journeyRouter.get('/steps', userAuthWithCookie, getSteps);
journeyRouter.get('/journey-status/:containerNumber', userAuthWithCookie, getJourneyByContainerNumber)

// Driver panel
journeyRouter.get('/journey-logs/:journeyId', userAuthWithBearer, getJourneyLogs);
journeyRouter.get('/steps-driver', userAuthWithBearer, getStations);
journeyRouter.get('/journey-by-driver-doc-id/:docId', userAuthWithBearer, getJourneyByDriverDocId);

export default journeyRouter;
