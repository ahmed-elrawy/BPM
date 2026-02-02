
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';
import { take, catchError } from 'rxjs/operators';
import { of, lastValueFrom } from 'rxjs';
import { environment } from './enviroments';
import { ApiEndpoints, KeycloakConstants } from '../app/core/constatnts/env';
import { HttpMethod } from '../app/core/enums/http-method';
import { StorageUtil } from '../app/core/utils/storage';
import { StorageKeys } from '../app/core/enums/storage-keys';
import { RoleExtractor } from '../app/core/utils/role-extractor';
import { ITokenResponse } from '../app/core/Interfaces/token-response';
import { JwtUtil } from '../app/core/utils/jwt';
import { IDecodedToken } from '../app/core/Interfaces/decoded-token';
import { IRole } from '../app/core/Interfaces/role';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return async (): Promise<boolean> => {
    try {
      console.log(`Initializing Keycloak for environment: ${environment.envName}`);

      // Angular automatically replaces 'environment' with the correct file
      // based on your angular.json configuration
      const initialized = await keycloak.init({
        config: {
          url: environment.keycloakHost,
          realm: environment.keycloakRealm,
          clientId: environment.keycloakClientId
        },
        initOptions: KeycloakConstants.DEFAULT_INIT_OPTIONS,
        loadUserProfileAtStartUp: true,
        enableBearerInterceptor: true,
        bearerPrefix: KeycloakConstants.BEARER_PREFIX,
        bearerExcludedUrls: [...KeycloakConstants.ACCEPTABLE_PATHS],
        shouldAddToken: (request) => shouldAddTokenToRequest(request)
      });

      if (!initialized) {
        throw new Error('Keycloak initialization failed');
      }

      console.log('Keycloak initialized successfully');
      await handleTokenStorageAfterInit(keycloak);

      return true;
    } catch (error) {
      console.error('Keycloak initialization error:', error);
      return false;
    }
  };
}

/**
 * Initialize Keycloak with API role fetching
 */
export function initializeKeycloakWithRoleFetch(
  keycloak: KeycloakService,
  httpClient: HttpClient
): () => Promise<boolean> {
  return async (): Promise<boolean> => {
    try {
      console.log(`Initializing Keycloak with role fetch for environment: ${environment.envName}`);

      const initialized = await keycloak.init({
        config: {
          url: environment.keycloakHost,
          realm: environment.keycloakRealm,
          clientId: environment.keycloakClientId
        },
        initOptions: KeycloakConstants.DEFAULT_INIT_OPTIONS,
        loadUserProfileAtStartUp: true,
        enableBearerInterceptor: true,
        bearerPrefix: KeycloakConstants.BEARER_PREFIX,
        bearerExcludedUrls: [...KeycloakConstants.ACCEPTABLE_PATHS],
        shouldAddToken: (request) => shouldAddTokenToRequest(request)
      });

      if (!initialized) {
        throw new Error('Keycloak initialization failed');
      }

      console.log('Keycloak initialized successfully');
      await handleTokenStorageWithRoleFetch(keycloak, httpClient);

      return true;
    } catch (error) {
      console.error('Keycloak initialization error:', error);
      return false;
    }
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function shouldAddTokenToRequest(request: { method: string; url: string }): boolean {
  const { method, url } = request;

  const isGetRequest = method.toUpperCase() === HttpMethod.GET;
  const isExcludedPath = KeycloakConstants.ACCEPTABLE_PATHS.some(path => url.includes(path));

  return !(isGetRequest && isExcludedPath);
}

async function handleTokenStorageAfterInit(keycloak: KeycloakService): Promise<void> {
  const tokenResponse = getTokens(keycloak);

  if (!tokenResponse.token) {
    console.warn('No access token available');
    return;
  }

  StorageUtil.setItem(StorageKeys.ACCESS_TOKEN, tokenResponse.token);

  if (tokenResponse.refreshToken) {
    StorageUtil.setItem(StorageKeys.REFRESH_TOKEN, tokenResponse.refreshToken);
  }

  if (tokenResponse.decodedToken) {
    const roles = RoleExtractor.extractAllRoles(tokenResponse.decodedToken);
    StorageUtil.setRoles(roles);
  }
}

async function handleTokenStorageWithRoleFetch(
  keycloak: KeycloakService,
  httpClient: HttpClient
): Promise<void> {
  const tokenResponse = getTokens(keycloak);

  if (!tokenResponse.token) {
    console.warn('No access token available');
    return;
  }

  StorageUtil.setItem(StorageKeys.ACCESS_TOKEN, tokenResponse.token);

  if (tokenResponse.refreshToken) {
    StorageUtil.setItem(StorageKeys.REFRESH_TOKEN, tokenResponse.refreshToken);
  }

  await fetchAndStoreRoles(httpClient, tokenResponse.decodedToken);
}

function getTokens(keycloak: KeycloakService): ITokenResponse {
  const keycloakInstance = keycloak.getKeycloakInstance();
  const token = keycloakInstance.token;
  const refreshToken = keycloakInstance.refreshToken;
  const decodedToken = token ? JwtUtil.decode(token) : null;

  return { token, refreshToken, decodedToken };
}

async function fetchAndStoreRoles(
  httpClient: HttpClient,
  decodedToken: IDecodedToken | null
): Promise<void> {
  try {
    const roles = await lastValueFrom(
      httpClient.get<IRole[]>(`${environment.baseApiUrl}${ApiEndpoints.ROLES}`).pipe(
        take(1),
        catchError(error => {
          console.error('Failed to fetch roles:', error);
          return of([]);
        })
      )
    );

    if (!roles || roles.length === 0) {
      console.warn('No roles received from API');
      return;
    }

    const roleNames = roles.map(role => role.name);
    const tokenRoles = decodedToken ? RoleExtractor.extractClientRoles(decodedToken) : [];
    const allRoles = [...new Set([...roleNames, ...tokenRoles])];

    StorageUtil.setRoles(allRoles);
  } catch (error) {
    console.error('Error in fetchAndStoreRoles:', error);
  }
}