import { makeAutoObservable } from "mobx";
import { StepModel } from "@models/Step/Step";
// import { stepApi } from "@services/api/stepApi";
import { JourneyModel } from "@models/Journey/Journey";
import { AxiosResponse } from "axios";

class JourneyStore {
  journey: JourneyModel | undefined = undefined
  stepsList: StepModel[] = []

  constructor() {
      makeAutoObservable(this);
  }



}

export const MxJourneyStore = new JourneyStore();

