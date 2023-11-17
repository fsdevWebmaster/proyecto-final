import { Role } from "@models/Role/Role";
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
          const user: User = {
            email: rs.data.email,
            avatar: `${rs.data.name.charAt(0)}${rs.data.lastName.charAt(0)}`,
            id: rs.data.id,
            lastName: rs.data.lastName,
            name: rs.data.name,
            idDoc: rs.data.idDoc,
            roles: [],
          }

          this.createUser(user);

          // set roles
          if (rs.data.roles) {
            const roles = rs.data.roles.map((role: any) => {
              return {
                id: role.id,
                code: role.code,
                role: role.name,
              } as Role;
            });

            this.setUserRoles(roles);
          }
        }
      });            
    } catch (error) {
      console.error(error);
    }
  }

  setUserRoles(roles: Role[]): void {
    if (this.user) {
      this.user.roles = roles;
    }
  }
}

export const MxUserStore = new UserStore();