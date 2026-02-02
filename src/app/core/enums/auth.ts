export enum AuthDenialReason {
  NOT_AUTHENTICATED = 'not-authenticated',
  INSUFFICIENT_ROLES = 'insufficient-roles',
  INSUFFICIENT_PERMISSIONS = 'insufficient-permissions',
  TOKEN_EXPIRED = 'token-expired'
}

export enum DefaultRoutes {
  DASHBOARD = '/task-dashboard',
  LOGIN = '/login',
  UNAUTHORIZED = '/unauthorized',
  HOME = '/'
}