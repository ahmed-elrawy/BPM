import { IEnvironmentConfig } from "../app/core/Interfaces/environment";

export const environment: IEnvironmentConfig = {
  production: true,
  envName: 'production',
  brokerURL: '',
  baseApiUrl: 'http://65.20.101.109:8081',
  keycloakHost: 'https://65.20.106.54:8443',
  bpmProcessEngineUrl: 'https://10.29.96.3',
  bpmReportsEngineUrl: 'https://10.29.96.3',
  keycloakRealm: 'GUH',
  keycloakClientId: 'kie'
};