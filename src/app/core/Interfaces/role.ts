export interface IRole {
  id: string;
  name: string;
  description?: string;
  composite?: boolean;
}
export type RoleList = ReadonlyArray<string>;
