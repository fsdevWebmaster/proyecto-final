import { axiosClient } from "../axiosClient";

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
  
}

export const journeyApi = new JourneyApi();
