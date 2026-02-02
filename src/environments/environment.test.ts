import { IEnvironmentConfig } from "../app/core/Interfaces/environment";

export const environment: IEnvironmentConfig = {
  production: false,
  envName: 'test',
  brokerURL: '',
  baseApiUrl: 'https://bpmapptst.ghco.uk:28081',
  keycloakHost: 'https://kctst.ghco.uk:21444',
  bpmProcessEngineUrl: 'https://ghbpmtst.ghco.uk:20443',
  bpmReportsEngineUrl: 'https://ghbpmtst.ghco.uk:20443',
  keycloakRealm: 'GUH',
  keycloakClientId: 'kie'
};
