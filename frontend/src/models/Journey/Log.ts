export type JourneyLog = {
  step: string,
  value: string | number | boolean;
  status: any;
  date: Date;
  containerNumber: string;
}