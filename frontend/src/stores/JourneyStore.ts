import { makeAutoObservable } from "mobx";
import { JourneyModel } from "@models/Journey/Journey";

class JourneyStore {
  journey: JourneyModel | undefined = undefined
  stepId: string = '';
  stepName: string = '';
  constructor() {
      makeAutoObservable(this);
  }

  setStepId(id: string){
    this.stepId = id;
  }

  setStepName(name: string){
    this.stepName = name;
  }
}

export const MxJourneyStore = new JourneyStore();

