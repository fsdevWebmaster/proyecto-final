import { axiosClient } from "../axiosClient";
import { JourneyModel } from "@models/Journey/Journey";
import { StepModel } from "@models/Step/Step";

class JourneyApi {
    controller;

    constructor() {
        this.controller = '/api';
    }

    getStepJourneys = (step:string) => {
      return axiosClient.get(`${this.controller}/step-journeys`, {
        params: { step }
      });
    }

    createJourney(createData: any) {
      return axiosClient.post(`${this.controller}/journey`, createData)
    }

    async getJourneyByContainerNumber(containerNumber: string) {
      return axiosClient.get(`${this.controller}/journey/${containerNumber}`)
    }

    async getJourneyLog(journey:JourneyModel, step:StepModel) {
      return axiosClient.post(`${this.controller}/find-journey-log`, { 
        journey: journey.id, 
        step: step.id
      })
    }
  
    updateJourney(updateData: any) {
      return axiosClient.patch(`${this.controller}/journey`, updateData)
    }

    journeyToUnload(updateData: any) {
      return axiosClient.post(`${this.controller}/journey-to-unload`, updateData)

    }
}

export const journeyApi = new JourneyApi();
