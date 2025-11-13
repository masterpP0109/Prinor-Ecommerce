export type BRAND = {
  logo: string;
  name: string;
  visitors: number;
  revenues: string;
  sales: number;
  conversion: number;
  roleAccess: 'Admin' | 'Seller' | 'Buyer'; // Specifies which roles can access this brand data
};