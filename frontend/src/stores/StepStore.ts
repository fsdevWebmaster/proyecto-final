import { makeAutoObservable, toJS } from "mobx";
import { StepModel } from "@models/Step/Step";
import { stepApi } from "@services/api/stepApi";
import { JourneyModel } from "@models/Journey/Journey";
import { Station } from "src/types/common";
class StepStore {
  stepsList: Station[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setStepsList(steps: Station[]) {
    this.stepsList = steps;
  }
  
  async handleSteps() {
    try {
      return await stepApi.getSteps();
    } catch (error) {
      console.log(error);
    }
  }

  async handleStepsForDriver() {
    try {
      return await stepApi.getStepsForDriver();
    } catch (error) {
      console.log(error);
    }
  }
}

export const MxStepStore = new StepStore();

