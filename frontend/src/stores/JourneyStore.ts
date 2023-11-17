import { makeAutoObservable } from "mobx";
import { JourneyModel } from "@models/Journey/Journey";
import { Driver, JourneyLog } from "@models";

class JourneyStore {
  journey: JourneyModel | undefined = undefined
  stepId: string = '';
  stepName: string = '';
  driver: Driver | undefined = undefined;
  logs: JourneyLog[] = [];
  
  constructor() {
      makeAutoObservable(this);
  }

  setStepId(id: string){
    this.stepId = id;
  }

  setStepName(name: string){
    this.stepName = name;
  }

  setJourney(data: JourneyModel) {
    this.journey = data;
  }

  setDriver(info: Driver) {
    this.driver = info;
  }

  setJourneyLogs(list: JourneyLog[]) {
    this.logs = list;
  }
}

export const MxJourneyStore = new JourneyStore();

