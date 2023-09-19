
export type JourneyLog = {
  journey: string
  step: string
  stepValue: string | number | boolean | null
  user: string
  description?: string
}