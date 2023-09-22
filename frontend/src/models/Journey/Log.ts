import { StepModel } from "@models/Step/Step"

export type JourneyLog = {
  id: string,
  journey: string,
  step: StepModel,
  stepValue: string | number | null
  user: string
  description: string
}