import { makeAutoObservable } from "mobx";
import { StepModel } from "@models/Step/Step";
import { stepApi } from "@services/api/stepApi";

class ConfigStore {
  sidebar: boolean = false;
  currentStep: StepModel | null = null

  constructor() {
      makeAutoObservable(this);
  }

  setSideBar(flag:boolean) {
    this.sidebar = flag;
  }

  setCurrentStep(step:StepModel) {
    this.currentStep = step;
  }

}

export const MxConfigStore = new ConfigStore();

