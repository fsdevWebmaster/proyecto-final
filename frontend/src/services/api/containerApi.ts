import { ContainerModel } from "@models";
import { axiosClient } from "../axiosClient";

class ContainerApi {
    controller;

    constructor() {
        this.controller = '/api';
    }

    getContainers = () => {
      return axiosClient.get(`${this.controller}/containers`)
    }

    createContainer = (createData: ContainerModel) => {
      return axiosClient.post(`${this.controller}/container`, createData)
    }
}

export const containerApi = new ContainerApi();