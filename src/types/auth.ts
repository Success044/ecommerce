export interface AuthUser {
  username: string;
}

export type LoginResult =
  | { user: AuthUser; error: null }
  | { user: null; error: string };
