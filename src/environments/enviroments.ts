// import { HttpClient } from '@angular/common/http';
// import { KeycloakService } from 'keycloak-angular';
// import { take, tap, catchError } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { Environment } from '../core/enums/environment';
// import { ReadonlyRecord } from '../core/types';
// import { IEnvironmentConfig } from '../core/Interfaces/environment';
// import { HttpMethod } from '../core/enums/http-method';
// import { StorageUtil } from '../core/utils/storage';
// import { StorageKeys } from '../core/enums/storage-keys';
// import { RoleExtractor } from '../core/utils/role-extractor';
// import { ITokenResponse } from '../core/Interfaces/token-response';
// import { JwtUtil } from '../core/utils/jwt';
// import { IDecodedToken } from '../core/Interfaces/decoded-token';
// import { Nullable } from 'primeng/ts-helpers';
// import { IRole } from '../core/Interfaces/role';

import { IEnvironmentConfig } from "../app/core/Interfaces/environment";

// export interface IKeycloakConfig {
//   protocol: string;
//   host: string;
//   realm: string;
//   clientId: string;
// }

// export interface IKeycloakInitOptions {
//   checkLoginIframe: boolean;
//   checkLoginIframeInterval: number;
//   onLoad?: 'login-required' | 'check-sso';
//   silentCheckSsoRedirectUri?: string;
//   pkceMethod?: 'S256';
// }

// // ============================================================================
// // CONSTANTS
// // ============================================================================

// export class KeycloakConstants {
//   static readonly SECURED_ENDPOINTS_PREFIX = 'secured/';
//   static readonly BEARER_PREFIX = 'Bearer';
//   static readonly TOKEN_REFRESH_INTERVAL = 60000; // 60 seconds
//   static readonly ACCEPTABLE_PATHS: ReadonlyArray<string> = ['/assets', '/clients/public'];

//   static readonly DEFAULT_INIT_OPTIONS: IKeycloakInitOptions = {
//     checkLoginIframe: false,
//     checkLoginIframeInterval: 25,
//     onLoad: 'check-sso',
//     pkceMethod: 'S256',
//   };
// }

// export class ApiEndpoints {
//   static readonly ROLES = '/api/secured/v1/keycloak/roles';
//   static readonly USER_PROFILE = '/api/secured/v1/user/profile';
//   static readonly PERMISSIONS = '/api/secured/v1/permissions';
// }

// // ============================================================================
// // KEYCLOAK CONFIGURATIONS
// // ============================================================================

// export const KEYCLOAK_CONFIGS: ReadonlyRecord<Environment, IKeycloakConfig> = {
//   [Environment.DEVELOPMENT]: {
//     protocol: 'https://',
//     host: 'kcdev.ghco.uk:11444',
//     realm: 'GUH',
//     clientId: 'kie',
//   },
//   [Environment.PRODUCTION]: {
//     protocol: 'https://',
//     host: 'uidemopriv.ghco.uk:28445',
//     realm: 'GUH',
//     clientId: 'kie',
//   },
//   [Environment.STAGING]: {
//     protocol: 'https://',
//     host: 'kcdev.ghco.uk:11444',
//     realm: 'GUH',
//     clientId: 'kie',
//   },
// };

// const BPM_CONFIGS: ReadonlyRecord<
//   Environment,
//   { protocol: string; apisHost: string; processEngine: string; reportsEngine: string }
// > = {
//   [Environment.DEVELOPMENT]: {
//     protocol: 'https://',
//     apisHost: 'bpmappdev.ghco.uk:18081',
//     processEngine: 'ghbpmdev.ghco.uk:10443',
//     reportsEngine: 'ghbpmdev.ghco.uk:10443',
//   },
//   [Environment.PRODUCTION]: {
//     protocol: 'https://',
//     apisHost: 'uidemopriv.ghco.uk:28082',
//     processEngine: 'bpmdemopriv.ghco.uk:28446',
//     reportsEngine: 'bpmdemopriv.ghco.uk:28446',
//   },
//   [Environment.STAGING]: {
//     protocol: 'https://',
//     apisHost: 'bpmappdev.ghco.uk:18081',
//     processEngine: 'ghbpmdev.ghco.uk:10443',
//     reportsEngine: 'ghbpmdev.ghco.uk:10443',
//   },
// };

// function createEnvironment(env: Environment): IEnvironmentConfig {
//   const keycloakConfig = KEYCLOAK_CONFIGS[env];
//   const bpmConfig = BPM_CONFIGS[env];

//   return {
//     production: env === Environment.PRODUCTION,
//     brokerURL: '',
//     baseApiUrl: `${bpmConfig.protocol}${bpmConfig.apisHost}`,
//     keycloakHost: `${keycloakConfig.protocol}${keycloakConfig.host}`,
//     bpmProcessEngineUrl: `${bpmConfig.protocol}${bpmConfig.processEngine}`,
//     bpmReportsEngineUrl: `${bpmConfig.protocol}${bpmConfig.reportsEngine}`,
//     keycloakRealms: keycloakConfig.realm,
//   };
// }

// // Set current environment
// const CURRENT_ENV = Environment.DEVELOPMENT;
// export const environment: IEnvironmentConfig = createEnvironment(CURRENT_ENV);

// // ============================================================================
// // KEYCLOAK INITIALIZATION
// // ============================================================================

// export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
//   return async (): Promise<boolean> => {
//     try {
//       const keycloakConfig = KEYCLOAK_CONFIGS[CURRENT_ENV];

//       const initialized = await keycloak.init({
//         config: {
//           url: `${keycloakConfig.protocol}${keycloakConfig.host}`,
//           realm: keycloakConfig.realm,
//           clientId: keycloakConfig.clientId,
//         },
//         initOptions: KeycloakConstants.DEFAULT_INIT_OPTIONS,
//         loadUserProfileAtStartUp: true,
//         enableBearerInterceptor: true,
//         bearerPrefix: KeycloakConstants.BEARER_PREFIX,
//         bearerExcludedUrls: [...KeycloakConstants.ACCEPTABLE_PATHS],
//         shouldAddToken: (request) => shouldAddTokenToRequest(request),
//       });

//       if (!initialized) {
//         throw new Error('Keycloak initialization failed');
//       }

//       // Store tokens after successful initialization
//       await handleTokenStorageAfterInit(keycloak);

//       return true;
//     } catch (error) {
//       console.error('Keycloak initialization error:', error);
//       return false;
//     }
//   };
// }

// function shouldAddTokenToRequest(request: { method: string; url: string }): boolean {
//   const { method, url } = request;

//   const isGetRequest = method.toUpperCase() === HttpMethod.GET;
//   const isAcceptablePathMatch = KeycloakConstants.ACCEPTABLE_PATHS.some((path) =>
//     url.includes(path)
//   );

//   return !(isGetRequest && isAcceptablePathMatch);
// }

// async function handleTokenStorageAfterInit(keycloak: KeycloakService): Promise<void> {
//   const tokenResponse = getTokens(keycloak);

//   if (!tokenResponse.token) {
//     console.warn('No access token available');
//     return;
//   }

//   StorageUtil.setItem(StorageKeys.ACCESS_TOKEN, tokenResponse.token);

//   if (tokenResponse.refreshToken) {
//     StorageUtil.setItem(StorageKeys.REFRESH_TOKEN, tokenResponse.refreshToken);
//   }

//   // Store roles from token
//   if (tokenResponse.decodedToken) {
//     const roles = RoleExtractor.extractAllRoles(tokenResponse.decodedToken);
//     StorageUtil.setRoles(roles);
//   }
// }

// // Legacy function with HttpClient - kept for backward compatibility
// export function initializeKeycloakWithHttp(
//   keycloak: KeycloakService,
//   httpClient: HttpClient
// ): () => Promise<boolean> {
//   return async (): Promise<boolean> => {
//     try {
//       const keycloakConfig = KEYCLOAK_CONFIGS[CURRENT_ENV];

//       const initialized = await keycloak.init({
//         config: {
//           url: `${keycloakConfig.protocol}${keycloakConfig.host}`,
//           realm: keycloakConfig.realm,
//           clientId: keycloakConfig.clientId,
//         },
//         initOptions: KeycloakConstants.DEFAULT_INIT_OPTIONS,
//         loadUserProfileAtStartUp: true,
//         enableBearerInterceptor: true,
//         bearerPrefix: KeycloakConstants.BEARER_PREFIX,
//         bearerExcludedUrls: [...KeycloakConstants.ACCEPTABLE_PATHS],
//         shouldAddToken: (request) => shouldAddTokenToRequest(request),
//       });

//       if (!initialized) {
//         throw new Error('Keycloak initialization failed');
//       }

//       await handleTokenStorage(keycloak, httpClient);

//       return true;
//     } catch (error) {
//       console.error('Keycloak initialization error:', error);
//       return false;
//     }
//   };
// }

// async function handleTokenStorage(
//   keycloak: KeycloakService,
//   httpClient: HttpClient
// ): Promise<void> {
//   const tokenResponse = getTokens(keycloak);

//   if (!tokenResponse.token) {
//     console.warn('No access token available');
//     return;
//   }

//   StorageUtil.setItem(StorageKeys.ACCESS_TOKEN, tokenResponse.token);

//   if (tokenResponse.refreshToken) {
//     StorageUtil.setItem(StorageKeys.REFRESH_TOKEN, tokenResponse.refreshToken);
//   }

//   await fetchAndStoreRoles(httpClient, tokenResponse.decodedToken);
// }

// function getTokens(keycloak: KeycloakService): ITokenResponse {
//   const keycloakInstance = keycloak.getKeycloakInstance();
//   const token = keycloakInstance.token;
//   const refreshToken = keycloakInstance.refreshToken;
//   const decodedToken = token ? JwtUtil.decode(token) : null;

//   return { token, refreshToken, decodedToken };
// }

// async function fetchAndStoreRoles(
//   httpClient: HttpClient,
//   decodedToken: Nullable<IDecodedToken>
// ): Promise<void> {
//   try {
//     const roles = await httpClient
//       .get<IRole[]>(`${environment.baseApiUrl}${ApiEndpoints.ROLES}`)
//       .pipe(
//         take(1),
//         catchError((error) => {
//           console.error('Failed to fetch roles:', error);
//           return of([]);
//         })
//       )
//       .toPromise();

//     if (!roles || roles.length === 0) {
//       console.warn('No roles received from API');
//       return;
//     }

//     const roleNames = roles.map((role) => role.name);
//     const tokenRoles = decodedToken ? RoleExtractor.extractClientRoles(decodedToken) : [];
//     const allRoles = [...new Set([...roleNames, ...tokenRoles])];

//     StorageUtil.setRoles(allRoles);
//   } catch (error) {
//     console.error('Error in fetchAndStoreRoles:', error);
//   }
// }

export const environment: IEnvironmentConfig = {
  production: false,
  envName: 'development',
  brokerURL: '',
  baseApiUrl: 'https://bpmappdev.ghco.uk:18081',
  keycloakHost: 'https://kcdev.ghco.uk:11444',
  bpmProcessEngineUrl: 'https://ghbpmdev.ghco.uk:10443',
  bpmReportsEngineUrl: 'https://ghbpmdev.ghco.uk:10443',
  keycloakRealm: 'GUH',
  keycloakClientId: 'kie'
};
