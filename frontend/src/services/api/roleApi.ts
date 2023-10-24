import { axiosClient } from "../axiosClient";

class RoleApi {
    controller;

    constructor() {
        this.controller = '/api';
    }

    getRoles(): Promise<any> {
        return axiosClient.get(`${this.controller}/roles`)
    }
}

export const roleApi = new RoleApi();