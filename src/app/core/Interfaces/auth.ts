import { AuthDenialReason } from "../enums/auth";

export interface IAuthResult {
  allowed: boolean;
  redirectUrl?: string;
  reason?: AuthDenialReason;
}