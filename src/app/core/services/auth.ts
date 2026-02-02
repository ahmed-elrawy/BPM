import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { KeycloakProfile } from 'keycloak-js';
import { StorageUtil } from '../utils/storage';
import { JwtUtil } from '../utils/jwt';
import { RoleExtractor } from '../utils/role-extractor';
import { IDecodedToken } from '../Interfaces/decoded-token';
import { IUserInfo } from '../Interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {}

  isAuthenticated(): boolean {
    return this.keycloak.isLoggedIn();
  }

  login(redirectUri?: string): Observable<void> {
    return from(this.keycloak.login({ redirectUri: redirectUri || window.location.href })).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  logout(redirectUri?: string): Observable<void> {
    StorageUtil.clear();
    return from(this.keycloak.logout(redirectUri || window.location.origin)).pipe(
      catchError((error) => {
        console.error('Logout failed:', error);
        throw error;
      })
    );
  }

  register(redirectUri?: string): Observable<void> {
    return from(this.keycloak.register({ redirectUri: redirectUri || window.location.href })).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        throw error;
      })
    );
  }

  getUserInfo(): Observable<IUserInfo | null> {
    return from(this.keycloak.loadUserProfile()).pipe(
      map((profile) => this.mapProfileToUserInfo(profile)),
      catchError(() => of(null))
    );
  }

  private mapProfileToUserInfo(profile: KeycloakProfile): IUserInfo {
    const decodedToken = this.getDecodedToken();
    const roles = decodedToken ? RoleExtractor.extractAllRoles(decodedToken) : [];

    return {
      id: profile.id || '',
      username: profile.username || '',
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      fullName: this.getFullName(profile),
      emailVerified: profile.emailVerified,
      roles,
    };
  }

  getAccessToken(): string | undefined {
    return this.keycloak.getKeycloakInstance().token;
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | undefined {
    return this.keycloak.getKeycloakInstance().refreshToken;
  }

  /**
   * Get decoded token
   */
  getDecodedToken(): IDecodedToken | null {
    const token = this.getAccessToken();
    return token ? JwtUtil.decode(token) : null;
  }

  private getFullName(profile: KeycloakProfile): string {
    const firstName = profile.firstName || '';
    const lastName = profile.lastName || '';

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }

    return firstName || lastName || profile.username || 'Unknown User';
  }
}
