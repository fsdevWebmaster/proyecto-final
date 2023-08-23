import { Auth } from "@models/User/User";
import { makeAutoObservable } from "mobx";
import { axiosClient } from "@services/axiosClient";
import { loginApi } from "@services/api/loginApi";

class LoginStore {
    auth: Auth = {
        isAuthenticated: false,
        token: '',
        logDate: null,
    };

    constructor() {
        makeAutoObservable(this);
    }

    initAuth(token: string) {
        this.auth = {
            isAuthenticated: true,
            token,
            logDate: new Date()
        };
    }

    resetAuth() {
        this.auth = {
            isAuthenticated: false,
            token: '',
            logDate: null
        };
    }

    setSession = (token: string | null): void => {
        if (token) {
            localStorage.setItem('accTkn', token);
            // axiosInstance.headers.common.Authorization = `Bearer ${token}`;
            axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
            this.initAuth(token);
        } else {
            localStorage.removeItem('accTkn');
            // delete axiosInstance.headers.common.Authorization;
            delete axiosClient.defaults.headers.common.Authorization;
            this.resetAuth();
        }
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accTkn');
    }

    async loginUser(username: string, password: string) {
        return await loginApi.login(username, password);
    }

    logout () {
        this.resetAuth();
        this.setSession(null);
    }
}

export const MxLoginStore = new LoginStore();

