
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'anéis' | 'brincos' | 'colares' | 'pulseiras';
  material: string;
  sellerId?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isVendor: boolean;
}
