import { makeAutoObservable } from "mobx";
import { StepModel } from "@models/Step/Step";
import { PagesStatus } from "../types/common";

class ConfigStore {
  sidebar: boolean = false;
  currentStep: StepModel | null = null
  pagesStatus: PagesStatus[] = [];
  currentPage: PagesStatus | null = null;

  constructor() {
      makeAutoObservable(this);
  }

  setSideBar(flag:boolean) {
    this.sidebar = flag;
  }

  setCurrentStep(step:StepModel) {
    this.currentStep = step;
  }

  setPagesStatus(pages: PagesStatus[]): void {
    this.pagesStatus = pages;
  }

  setCurrentPage(page: PagesStatus): void {
    this.currentPage = page;
  }
}

export const MxConfigStore = new ConfigStore();

