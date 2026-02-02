import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { AuthDenialReason, DefaultRoutes } from '../enums/auth';
import { AuthGuardResult, RoleList } from '../types';
import { StorageUtil } from '../utils/storage';
import { IRouteData } from '../Interfaces/route';
import { IAuthResult } from '../Interfaces/auth';
import { StorageKeys } from '../enums/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  /**
   * Main authorization logic for route access
   */
  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<AuthGuardResult> {
    // Ensure user is authenticated
    if (!this.authenticated) {
      await this.handleUnauthenticatedUser(state.url);
      return false;
    }

    // Extract route requirements
    const routeData = this.extractRouteData(route);

    // Validate access
    const authResult = await this.validateAccess(routeData);

    if (authResult.allowed) {
      return true;
    }

    // Handle authorization failure
    return this.handleAuthorizationFailure(authResult, routeData);
  }

  /**
   * Extract and validate route data
   */
  private extractRouteData(route: ActivatedRouteSnapshot): IRouteData {
    return {
      roles: route.data['roles'] as RoleList | undefined,
      permissions: route.data['permissions'] as string[] | undefined,
      requiresAuth: route.data['requiresAuth'] !== false, // Default true
      redirectTo: route.data['redirectTo'] as string | undefined,
    };
  }

  /**
   * Validate user access based on route requirements
   */
  private async validateAccess(routeData: IRouteData): Promise<IAuthResult> {
    // Check if authentication is required
    if (!routeData.requiresAuth) {
      return { allowed: true };
    }

    // Validate token
    const tokenValid = await this.validateToken();
    if (!tokenValid) {
      return {
        allowed: false,
        reason: AuthDenialReason.TOKEN_EXPIRED,
      };
    }

    // Check roles if specified
    if (routeData.roles && routeData.roles.length > 0) {
      const hasRequiredRole = this.checkRoles(routeData.roles);
      if (!hasRequiredRole) {
        return {
          allowed: false,
          reason: AuthDenialReason.INSUFFICIENT_ROLES,
        };
      }
    }

    // Check permissions if specified
    if (routeData.permissions && routeData.permissions.length > 0) {
      const hasRequiredPermission = this.checkPermissions(routeData.permissions);
      if (!hasRequiredPermission) {
        return {
          allowed: false,
          reason: AuthDenialReason.INSUFFICIENT_PERMISSIONS,
        };
      }
    }

    return { allowed: true };
  }

  /**
   * Check if user has any of the required roles
   */
  private checkRoles(requiredRoles: RoleList): boolean {
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }

    const userRoles = this.getUserRoles();
    return requiredRoles.some((role) => userRoles.includes(role));
  }

  /**
   * Check if user has any of the required permissions
   */
  private checkPermissions(requiredPermissions: string[]): boolean {
    if (!Array.isArray(requiredPermissions) || requiredPermissions.length === 0) {
      return true;
    }

    // Implement your permission checking logic here
    // This could involve checking against stored permissions or making an API call
    const userRoles = this.getUserRoles();

    // Example: treating permissions as roles for now
    return requiredPermissions.some((permission) => userRoles.includes(permission));
  }

  /**
   * Get user roles from Keycloak and localStorage
   */
  private getUserRoles(): RoleList {
    // Try to get roles from Keycloak first
    const keycloakRoles = this.roles || [];

    // Fallback to localStorage
    const storedRoles = StorageUtil.getRoles();

    // Combine and deduplicate
    return [...new Set([...keycloakRoles, ...storedRoles])];
  }

  /**
   * Validate token freshness
   */
  private async validateToken(): Promise<boolean> {
    try {
      const isTokenExpired = this.keycloak.isTokenExpired(10); // 10 seconds threshold

      if (isTokenExpired) {
        // Attempt to refresh token
        const refreshed = await this.keycloak.updateToken(30);
        return refreshed;
      }

      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }

  /**
   * Handle unauthenticated user
   */
  private async handleUnauthenticatedUser(redirectUrl: string): Promise<void> {
    try {
      await this.keycloak.login({
        redirectUri: window.location.origin + redirectUrl,
      });
    } catch (error) {
      console.error('Login failed:', error);
      this.router.navigate([DefaultRoutes.LOGIN]);
    }
  }

  /**
   * Handle authorization failure
   */
  private handleAuthorizationFailure(
    authResult: IAuthResult,
    routeData: IRouteData
  ): AuthGuardResult {
    console.warn('Access denied:', authResult.reason);

    // Use custom redirect if specified
    const redirectUrl = routeData.redirectTo || DefaultRoutes.DASHBOARD;

    return this.router.createUrlTree([redirectUrl], {
      queryParams: { reason: authResult.reason },
    });
  }

  /**
   * Get current access token
   */
  public getToken(): string | null {
    try {
      // Try Keycloak first
      const token = this.keycloak.getKeycloakInstance().token;
      if (token) {
        return token;
      }

      // Fallback to localStorage
      return StorageUtil.getItem(StorageKeys.ACCESS_TOKEN);
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  }

  /**
   * Get refresh token
   */
  public getRefreshToken(): string | null {
    try {
      const refreshToken = this.keycloak.getKeycloakInstance().refreshToken;
      if (refreshToken) {
        return refreshToken;
      }

      return StorageUtil.getItem(StorageKeys.REFRESH_TOKEN);
    } catch (error) {
      console.error('Failed to retrieve refresh token:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  /**
   * Check if user has specific role
   */
  public hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  /**
   * Check if user has any of the specified roles
   */
  public hasAnyRole(roles: RoleList): boolean {
    return this.checkRoles(roles);
  }

  /**
   * Check if user has all of the specified roles
   */
  public hasAllRoles(roles: RoleList): boolean {
    const userRoles = this.getUserRoles();
    return roles.every((role: string) => userRoles.includes(role));
  }

  /**
   * Get user profile
   */
  public async getUserProfile() {
    try {
      return await this.keycloak.loadUserProfile();
    } catch (error) {
      console.error('Failed to load user profile:', error);
      return null;
    }
  }

  /**
   * Logout user
   */
  public async logout(redirectUri?: string): Promise<void> {
    try {
      // Clear localStorage
      StorageUtil.clear();

      // Logout from Keycloak
      await this.keycloak.logout(redirectUri || window.location.origin);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
