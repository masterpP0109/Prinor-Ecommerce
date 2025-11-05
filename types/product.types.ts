export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand?: string;
  stock: number;
  rating?: number;
  reviews?: number;
  tags?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DigitalProduct extends Product {
  type: 'digital';
  downloadUrl: string;
  fileSize?: string;
  fileFormat?: string;
  licenseType?: string;
  version?: string;
}

export interface ServiceProduct extends Product {
  type: 'service';
  serviceType: 'web_design' | 'marketing' | 'repair' | 'tutoring' | 'consultation' | 'other';
  duration?: string;
  deliveryTime?: string;
  includes?: string[];
  requirements?: string[];
}

export type ProductType = Product | DigitalProduct | ServiceProduct;