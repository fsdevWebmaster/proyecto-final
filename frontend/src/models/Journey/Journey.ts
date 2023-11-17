import { StepModel } from "@models/Step/Step"

export type JourneyModel = {
  id: string
  driver: string
  container: string
  step: StepModel
  containerNumber: string
  driverDoc: string
  createdAt: Date
  status: string
}