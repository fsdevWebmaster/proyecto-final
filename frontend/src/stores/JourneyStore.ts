import { makeAutoObservable } from "mobx";
import { StepModel } from "@models/Step/Step";
import { JourneyModel } from "@models/Journey/Journey";

class JourneyStore {
  journey: JourneyModel | undefined = undefined

  constructor() {
      makeAutoObservable(this);
  }

}

export const MxJourneyStore = new JourneyStore();

