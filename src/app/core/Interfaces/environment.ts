export interface IEnvironmentUrls {
  baseApiUrl: string;
  keycloakHost: string;
  bpmProcessEngineUrl: string;
  bpmReportsEngineUrl: string;
  brokerURL?: string;
}

export interface IEnvironmentConfig extends IEnvironmentUrls {
  production: boolean;
  keycloakRealms?: string;
  envName?:string;
}



export interface IEnvironmentConfig {
  production: boolean;
  brokerURL: string;
  baseApiUrl: string;
  keycloakHost: string;
  bpmProcessEngineUrl: string;
  bpmReportsEngineUrl: string;
  keycloakRealm: string;
  keycloakClientId: string;
}

export interface IKeycloakConfig {
  protocol: string;
  host: string;
  realm: string;
  clientId: string;
}

export interface IBpmConfig {
  protocol: string;
  host: string;
}


export interface IKeycloakInitOptions {
  checkLoginIframe: boolean;
  checkLoginIframeInterval: number;
  onLoad?: 'login-required' | 'check-sso';
  silentCheckSsoRedirectUri?: string;
  pkceMethod?: 'S256';
}