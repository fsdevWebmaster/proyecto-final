import { populate } from "dotenv";
import JourneyLog from "../models/journeyLog.model.js";
import jwt from 'jsonwebtoken';
import Step from "../models/step.model.js";

export const getStep = async (data) => {
  try {
    const journeyLog = await JourneyLog.findOne({ 
      journeyId: data.journey, 
      step: data.step 
    }).populate("step")
    const rawStep = journeyLog.step
    let step = await Step.findById(rawStep._id)
      .populate("previous")
      .populate("next")
    return step
  } catch (error) {
    console.log(`Error finding journey ${error}`)
  }
}

export const getToken = (payload, expirationTime) => {
  const token = jwt.sign(payload, process.env.LOGIN_SECRET, { expiresIn: expirationTime });
  return token;
}