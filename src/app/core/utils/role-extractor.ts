import { IDecodedToken } from '../Interfaces/decoded-token';
import { RoleList } from '../types';

export class RoleExtractor {
  static extractAllRoles(decodedToken: IDecodedToken): RoleList {
    const realmRoles = this.extractRealmRoles(decodedToken);
    const clientRoles = this.extractClientRoles(decodedToken);
    return [...realmRoles, ...clientRoles];
  }

  static extractRealmRoles(decodedToken: IDecodedToken): RoleList {
    return decodedToken.realm_access?.roles ?? [];
  }

  static extractClientRoles(decodedToken: IDecodedToken): RoleList {
    if (!decodedToken.resource_access) return [];

    const roles: string[] = [];
    Object.values(decodedToken.resource_access).forEach((client) => {
      if (client.roles) {
        roles.push(...client.roles);
      }
    });

    return roles;
  }
}
