import { axiosClient } from "../axiosClient";

class UserApi {
    controller;

    constructor() {
        this.controller = '/api';
    }

    getProfile(userId: string): Promise<any> {
        return axiosClient.get(`${this.controller}/profile`, {
            params: {
                userId,
            }
        })
    }
}

export const userApi = new UserApi();