import { RoleList } from "./role";

export interface IUserInfo {
  id: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  roles: RoleList;
  emailVerified?: boolean;
}
