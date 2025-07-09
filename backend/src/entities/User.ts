export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}