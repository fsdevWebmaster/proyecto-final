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

    logout(userId: string): Promise<any> {
        return axiosClient.post(`${this.controller}/logout`, {userId});
    }
}

export const loginApi = new LoginApi();