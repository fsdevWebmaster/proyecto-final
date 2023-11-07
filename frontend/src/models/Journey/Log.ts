import { StepModel } from "@models/Step/Step"
import { JourneyModel } from "./Journey"

export type JourneyLog = {
  id: string,
  journey: JourneyModel,
  step: string,
  stepValue: string | number | null
  user: string
  description: string
}