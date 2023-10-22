import { Role, rolePermissions } from "@models/Role/Role";
import { PagesStatus, appPages } from "../types/common";

export class PageHelper {
  static findPageByPath(path: string) {
    const currentPage = path.replace('/', '');
    return appPages.find(page => page.path === currentPage);
  }

  static allowedPagesByUserRoles(roles: Role[]) {
    const allowedPages: PagesStatus[] = [];

    if(roles) {
      const finds = roles.flatMap(role => {
        return rolePermissions[role.role];
      });

      if (finds.includes(rolePermissions['ADMINISTRATOR'][0])) {
        return appPages;
      }

      appPages.forEach((page: PagesStatus) => {
        if (finds.includes(page.path)) {
          allowedPages.push(page);
        }
      });

      return allowedPages;
    }
  }
}