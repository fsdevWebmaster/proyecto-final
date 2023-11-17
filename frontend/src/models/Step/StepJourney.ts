import { JourneyModel } from "@models/Journey/Journey";
import { StepModel } from "./Step";

export interface StepJourney
 {
  step: StepModel
  journeys: JourneyModel[]
}