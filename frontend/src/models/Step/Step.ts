export type StepModel = {
  id: string
  name: string
  order: number
  previous: StepModel | string | null
  next: StepModel | string | null
  isActive: boolean
}