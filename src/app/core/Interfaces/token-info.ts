import { IDecodedToken } from "./decoded-token";

export interface ITokenInfo {
  token: string;
  refreshToken?: string;
  expiresAt?: Date;
  isExpired: boolean;
  decodedToken?: IDecodedToken;
}
