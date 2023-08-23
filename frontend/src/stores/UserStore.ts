import { User } from "@models/User/User";
import { userApi } from "@services/api/userApi";
import { makeAutoObservable } from "mobx";

class UserStore {
  user: User | null = null;
  
  constructor() {
    makeAutoObservable(this);
  }

  get userInfo() {
    return this.user;
  }

  createUser(user: User): void {
    this.user = user;
  }
  
  async loadProfile(id: string) {
    return await userApi.getProfile(id);
  }

  initProfile = async(profileId: string) => {
    try {
      await this.loadProfile(profileId).then((rs) => {
        if (rs.data) {
          this.createUser({
            email: rs.data.email,
            id: rs.data['_id'],
            name: rs.data.name,
            personalId: rs.data.idDoc
          } as User)
        }
      });            
    } catch (error) {
      console.error(error);
    }
  }
}

export const MxUserStore = new UserStore();