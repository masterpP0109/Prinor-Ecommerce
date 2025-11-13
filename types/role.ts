export type Role = 'Admin' | 'Seller' | 'Buyer';

export interface UserRole {
  id: string;
  role: Role;
  permissions: string[];
}