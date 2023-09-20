export type StepModel = {
  id: string
  name: string
  order: number
  previous: string | null
  next: StepModel | null
  isActive: boolean
}