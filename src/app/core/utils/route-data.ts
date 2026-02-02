import { IRouteData } from "../Interfaces/route";
import { RoleList } from "../types";

export class RouteDataHelper {
  /**
   * Create route data with roles requirement
   */
  static withRoles(roles: RoleList, redirectTo?: string): IRouteData {
    return { roles, redirectTo };
  }

  /**
   * Create route data with permissions requirement
   */
  static withPermissions(permissions: string[], redirectTo?: string): IRouteData {
    return { permissions, redirectTo };
  }

  /**
   * Create route data with both roles and permissions
   */
  static withRolesAndPermissions(
    roles: RoleList,
    permissions: string[],
    redirectTo?: string
  ): IRouteData {
    return { roles, permissions, redirectTo };
  }

  /**
   * Create public route data (no auth required)
   */
  static public(): IRouteData {
    return { requiresAuth: false };
  }
}