import { User } from "@models/User/User";
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

    registerUser(regData:User): Promise<any> {
      return axiosClient.post(`${this.controller}/register`, regData)
    }

    getUsers = () => {
      return axiosClient.get(`${this.controller}/users`)
    }
}

export const userApi = new UserApi();