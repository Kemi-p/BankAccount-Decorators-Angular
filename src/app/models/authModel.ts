export type Role = 'client' | 'banker';

export interface AuthUser {
  id: number;
  name: string;
  role: Role;
}