export type Chat = {
  avatar: string;
  name: string;
  text: string;
  time: number;
  textCount: number;
  dot: number;
  role: 'Admin' | 'Seller' | 'Buyer'; // Added role to differentiate chat messages based on user roles
};