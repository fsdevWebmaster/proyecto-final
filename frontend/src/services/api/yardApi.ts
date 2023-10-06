import { axiosClient } from "../axiosClient";

class YardApi {
    controller;

    constructor() {
        this.controller = '/api';
    }

}

export const loginApi = new YardApi();