import { IDecodedToken } from "../Interfaces/decoded-token";
import { Nullable } from "../types";

export class JwtUtil {
  static decode(token: string): Nullable<IDecodedToken> {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) {
        throw new Error('Invalid token format');
      }

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(char => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload) as IDecodedToken;
    } catch (error) {
      console.error('Invalid JWT Token:', error);
      return null;
    }
  }

  static isExpired(token: IDecodedToken): boolean {
    if (!token.exp) return true;
    return Date.now() >= token.exp * 1000;
  }

  static getExpirationDate(token: IDecodedToken): Nullable<Date> {
    return token.exp ? new Date(token.exp * 1000) : null;
  }
}
