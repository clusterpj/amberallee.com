export type UserRole = 'admin' | 'customer';

export interface UserMetadata {
  role: UserRole;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}
