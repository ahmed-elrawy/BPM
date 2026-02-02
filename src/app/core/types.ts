import { UrlTree } from "@angular/router";
import { IDecodedToken } from "./Interfaces/decoded-token";

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<Record<K, V>>;

export type RoleList = ReadonlyArray<string>;
export type TokenPayload = Partial<IDecodedToken>;
export type AuthGuardResult = boolean | UrlTree;
