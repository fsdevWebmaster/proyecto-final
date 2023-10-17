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

    getSteps() {
      return axiosClient.get(`${this.controller}/steps`)
    }
}

export const stepApi = new StepApi();
