import { Driver, JourneyLog } from "@models";
import { JourneyModel } from "@models/Journey/Journey";
import { axiosClient } from "@services/axiosClient";
import { loginApi } from "@services/api/loginApi";
import { makeAutoObservable } from "mobx";
import { journeyApi } from "@services/api/journeyApi";
import { error } from "console";

class DriverStore {
  isAuthenticated = false;
  driver: Driver | null = null;
  journey: JourneyModel | null = null;
  currentJourneyId: string | null = null;
  journeyLogs: JourneyLog[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }

  async loginDriver(idDoc: string) {
    try {
      return loginApi.loginDriver(idDoc);
    } catch (error) {
      console.log(error);
    }
  }

  setDriver(info: Driver | null) {
    this.driver = info;
  }

  setDriverAuth(flag: boolean) {
    this.isAuthenticated = flag;
  }

  setSession = (token: string | null): void => {
    if (token) {
        localStorage.setItem('driTkn', token);
        axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        this.setDriverAuth(true);
    } else {
        localStorage.removeItem('driTkn');
        this.setDriverAuth(false);
        delete axiosClient.defaults.headers.common.Authorization;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('driTkn');
}

  async getJourneyByDriverId(idDoc: string) {
    let journeyId = null;

    try {
      const response = await journeyApi.getJourneyInfoByDriverId(idDoc);
      journeyId = response.data.journeyId;

    } catch (error) {
      console.log(error);
    }

    return journeyId;
  }

  async setCurrentStationInLogByJourneyId(journeyId: string | null) {
    try {
      if (journeyId) {
        const response = await journeyApi.getJourneyLogsDriverByJourneyId(journeyId);
        if(response.data) {
          this.setJourneyLogs(response.data)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  setCurrentJourneyId(id: string | null): void {
    this.currentJourneyId = id;
  }

  setJourneyLogs(logs: any[]) {
    this.journeyLogs = logs;
  }

  logOut() {
    this.setDriverAuth(false);
    this.setCurrentJourneyId(null);
    this.setDriver(null);
    this.setSession(null);
  }
}

export const MxDriverStore = new DriverStore();