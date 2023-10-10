import { axiosClient } from "../axiosClient";

class StationApi {
    controller;

    constructor() {
        this.controller = '/api';
    }

    getStations(): Promise<any> {
        return axiosClient.get(`${this.controller}/steps`);
    }
}

export const stationApi = new StationApi();