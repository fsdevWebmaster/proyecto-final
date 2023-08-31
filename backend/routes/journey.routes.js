import express from "express";
const journeyRouter = express.Router();
import { userAuth } from "../middlewares/users.middleware.js";
import { 
  getInTransit, 
  newContainer, 
  newJourney, 
  createJourneyLog,
  getJourneyLog
  getSteps
} from "../controllers/journey.controller.js";

journeyRouter.post('/container', userAuth, newContainer)
journeyRouter.post('/journey', userAuth, newJourney);
journeyRouter.get('/in-transit', userAuth, getInTransit);
journeyRouter.post('/journey-log', userAuth, createJourneyLog);
journeyRouter.get('/journey-log/:journey', userAuth, getJourneyLog);
journeyRouter.get('/steps', userAuth, getSteps);

export default journeyRouter;