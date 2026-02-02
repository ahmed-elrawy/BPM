import { IDecodedToken } from "./decoded-token";

export interface ITokenResponse {
  token: string | undefined;
  refreshToken: string | undefined;
  decodedToken: IDecodedToken | null;
}
