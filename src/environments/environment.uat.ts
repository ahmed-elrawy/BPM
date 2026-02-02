import { IEnvironmentConfig } from "../app/core/Interfaces/environment";

export const environment: IEnvironmentConfig = {
  production: true,
  envName: 'uat',
  brokerURL: '',
  baseApiUrl: 'https://bpmappdev.ghco.uk:18081',
  keycloakHost: 'https://kcdev.ghco.uk:11444',
  bpmProcessEngineUrl: 'https://ghbpmdev.ghco.uk:10443',
  bpmReportsEngineUrl: 'https://ghbpmdev.ghco.uk:10443',
  keycloakRealm: 'GUH',
  keycloakClientId: 'kie'
};