import { makeAutoObservable } from "mobx";
import { StepModel } from "@models/Step/Step";
import { stepApi } from "@services/api/stepApi";
import { JourneyModel } from "@models/Journey/Journey";

class StepStore {
  stepsList: {
    step: StepModel,
    journeys: JourneyModel[]
  }[] = []

  constructor() {
      makeAutoObservable(this);
  }

  async handleSteps() {
    const steps = await stepApi.getSteps()
    if(this) {
      this.stepsList = steps.data
    }
  }

  setStepsList(items: []) {  
    this.stepsList = items
  }
}

export const MxStepStore = new StepStore();

