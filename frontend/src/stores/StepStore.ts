import { makeAutoObservable } from "mobx";
import { StepModel } from "@models/Step/Step";
import { stepApi } from "@services/api/stepApi";
import { JourneyModel } from "@models/Journey/Journey";
import { AxiosResponse } from "axios";

class StepStore {
  stepsList: StepModel[] = []

  constructor() {
      makeAutoObservable(this);
  }

  async handleSteps() {
    const steps = await stepApi.getSteps()
    this.stepsList = steps.data

    console.log('setted steps:', steps.data)
  }

  setStepsList(items: []) {  
    this.stepsList = items
  }

  getStepsList() {
    
    console.log("step store", this.stepsList)
    
    return "tal"
  }


}

export const MxStepStore = new StepStore();

