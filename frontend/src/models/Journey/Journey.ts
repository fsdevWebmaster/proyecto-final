import { StepModel } from "@models/Step/Step"

export type JourneyModel = {
  id: string
  driver: string
  driverDoc: string
  container: string
  containerNumber: string
  step: StepModel
  status: string
}