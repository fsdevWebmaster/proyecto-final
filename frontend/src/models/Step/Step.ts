export type StepModel = {
  id: string
  name: string
  url: string
  order: number
  previous: StepModel | string | null
  next: StepModel | string | null
  routeName: string
  isActive: boolean
}