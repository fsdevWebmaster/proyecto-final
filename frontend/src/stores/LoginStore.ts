import { Auth } from "@models/User/User";
import { makeAutoObservable } from "mobx";
import { axiosClient } from "@services/axiosClient";
import { loginApi } from "@services/api/loginApi";
import jwtDecode from "jwt-decode";
import { JWTHelper } from "@helpers/jwtHelper";

class LoginStore {
    auth: Auth = {
        isAuthenticated: false,
        token: '',
        logDate: null,
    };

    constructor() {
        makeAutoObservable(this);
    }

    initAuth(token: string, status: boolean) {
        this.auth = {
            isAuthenticated: status,
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

    setSession = async (token: string | null, status: boolean): Promise<void> => {
        if (token) {
            localStorage.setItem('accTkn', token);
            // axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`; keep it for later
            this.initAuth(token, status);
        } else {
            localStorage.removeItem('accTkn');
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

    getUserInfoByToken(token:string) {
        return JWTHelper.decodeToken(token);
    }

    async logOut (userId: string) {
        try {
            const response = await loginApi.logout(userId);
            const {logged, user} = response.data;
            this.resetAuth();
            this.setSession(user, logged);
        } catch (error) {
            console.error(error);
        }

    }
}

export const MxLoginStore = new LoginStore();

