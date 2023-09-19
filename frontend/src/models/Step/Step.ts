export type Step = {
  name: string;
  order: number;
  previous: string;
  next: string;
  isActive: boolean;
  id: string;
}