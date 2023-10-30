import { makeAutoObservable } from "mobx";
import { JourneyModel } from "@models/Journey/Journey";

class JourneyStore {
  journey: JourneyModel | undefined = undefined
  stepId: string | undefined = undefined;
  constructor() {
      makeAutoObservable(this);
  }

  setStepId(stepId: string){
    this.stepId = stepId;
  }
}

export const MxJourneyStore = new JourneyStore();

