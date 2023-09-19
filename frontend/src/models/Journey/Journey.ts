import { Step } from "@models/Step/Step"

export type Journey = {
  id: string
  driver: string
  container: string
  step: Step
  containerNumber: string
  driverDoc: string
}