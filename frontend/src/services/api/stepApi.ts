import { axiosClient } from "../axiosClient";

class StepApi {
    controller;

    constructor() {
        this.controller = '/api';
    }

    getStepByRoute = (routeName:string) => {
      return axiosClient.get(`${this.controller}/step`, {
        params: { routeName }
      });      
    }

    getSteps(): Promise<any> {
      return axiosClient.get(`${this.controller}/steps`)
    }

    getStepsForDriver(): Promise<any> {
      return axiosClient.get(`${this.controller}/steps-driver`)
    }
}

export const stepApi = new StepApi();
