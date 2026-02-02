export interface IDecodedToken {
  exp?: number;
  iat?: number;
  jti?: string;
  iss?: string;
  sub?: string;
  typ?: string;
  azp?: string;
  session_state?: string;
  realm_access?: {
    roles: string[];
  };
  resource_access?: {
    [clientId: string]: {
      roles: string[];
    };
  };
  scope?: string;
  email_verified?: boolean;
  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
}
