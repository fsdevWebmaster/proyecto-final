import { axiosClient } from "../axiosClient";

class LoginApi {
    controller;

    constructor() {
        this.controller = '/api';
    }

    login(email: string, password:string): Promise<any> {
        return axiosClient.post(`${this.controller}/login`, {
            username: email,
            password
        });
    }
}

export const loginApi = new LoginApi();