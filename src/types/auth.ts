export interface AuthUser {
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export type LoginResult =
  | { user: AuthUser; error: null }
  | { user: null; error: string };
