export interface User {
  id: string;
  username: string;
  email: string;
  role: 'Admin' | 'Seller' | 'Buyer';
  createdAt: Date;
  updatedAt: Date;
}