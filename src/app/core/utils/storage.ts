import { StorageKeys } from "../enums/storage-keys";
import { RoleList } from "../Interfaces/role";
import { Nullable } from "../types";

export class StorageUtil {
  static setItem(key: StorageKeys, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Failed to set ${key} in localStorage:`, error);
    }
  }

  static getItem(key: StorageKeys): Nullable<string> {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Failed to get ${key} from localStorage:`, error);
      return null;
    }
  }

  static removeItem(key: StorageKeys): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove ${key} from localStorage:`, error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }

  static setRoles(roles: RoleList): void {
    this.setItem(StorageKeys.REALM_ROLES, JSON.stringify(roles));
  }

  static getRoles(): RoleList {
    const rolesJson = this.getItem(StorageKeys.REALM_ROLES);
    if (!rolesJson) return [];
    
    try {
      return JSON.parse(rolesJson) as RoleList;
    } catch {
      return [];
    }
  }
}