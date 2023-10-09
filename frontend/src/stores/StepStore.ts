import { makeAutoObservable } from "mobx";
import { StepModel } from "@models/Step/Step";
import { stepApi } from "@services/api/stepApi";

class StepStore {
  stepsList: StepModel[] = []

  constructor() {
      makeAutoObservable(this);
  }

  async handleSteps() {
    const steps = await stepApi.getSteps()
    this.stepsList = steps.data
  }

  setStepsList(items: []) {  
    this.stepsList = items
  }
}

export const MxStepStore = new StepStore();

