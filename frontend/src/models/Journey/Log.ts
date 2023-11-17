import { StepModel } from "@models/Step/Step"
import { JourneyModel } from "./Journey"

export type JourneyLog = {
  id: string,
  journey: JourneyModel,
  step: StepModel,
  stepValue: string | number | null
  user: string
  description: string
}