import { Driver } from "@models/Driver/Driver";
import { axiosClient } from "../axiosClient";

export class DriverApi {
    controller;

    constructor() {
        this.controller = '/api';
    }

    newDriver(driverData:Driver): Promise<any> {
      return axiosClient.post(`${this.controller}/driver`, driverData)
    }


    getDriver = (idDoc: string): Promise<any> => {
      return axiosClient.get(`${this.controller}/driver/${idDoc}`)
    }
}

export const driverApi = new DriverApi();