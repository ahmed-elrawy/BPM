import { RoleList } from "./role";

export interface IRouteData {
  roles?: RoleList;
  permissions?: string[];
  requiresAuth?: boolean;
  redirectTo?: string;
}