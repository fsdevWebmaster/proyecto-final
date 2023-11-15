import { axiosClient } from "../axiosClient";
import { JourneyModel } from "@models/Journey/Journey";
import { StepModel } from "@models/Step/Step";

class JourneyApi {
    controller;

    constructor() {
        this.controller = '/api';
    }

    getStepJourneys = (step:string) => {
      return axiosClient.get(`${this.controller}/step-journeys/${step}`)
    }

    createJourney(createData: any) {
      return axiosClient.post(`${this.controller}/journey`, createData)
    }

    async getJourneyByContainerNumber(containerNumber: string) {
      return axiosClient.get(`${this.controller}/journey-status/${containerNumber}`)
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

    finishJourney(updateData: any) {
      return axiosClient.post(`${this.controller}/finish-journey`, updateData)
    }
    
    getJourneyInfoByDriverId(idDoc: string): Promise<any> {
      return axiosClient.get(`${this.controller}/journey-by-driver-doc-id/${idDoc}`);
    }

    getJourneyLogsDriverByJourneyId(journeyId: string): Promise<any> {
      return axiosClient.get(`${this.controller}/journey-logs/${journeyId}`);
    }
}

export const journeyApi = new JourneyApi();
