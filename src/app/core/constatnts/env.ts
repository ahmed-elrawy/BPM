
export class KeycloakConstants {
  static readonly SECURED_ENDPOINTS_PREFIX = 'secured/';
  static readonly BEARER_PREFIX = 'Bearer';
  static readonly TOKEN_REFRESH_INTERVAL = 60000; // 60 seconds
  static readonly ACCEPTABLE_PATHS: ReadonlyArray<string> = ['/assets', '/clients/public'];

  static readonly DEFAULT_INIT_OPTIONS = {
    checkLoginIframe: false,
    checkLoginIframeInterval: 25,
    onLoad: 'check-sso' as const,
    pkceMethod: 'S256' as const
  };
}

export class ApiEndpoints {
  static readonly ROLES = '/api/secured/v1/keycloak/roles';
  static readonly USER_PROFILE = '/api/secured/v1/user/profile';
  static readonly PERMISSIONS = '/api/secured/v1/permissions';
}