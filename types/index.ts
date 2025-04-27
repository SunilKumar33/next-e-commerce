/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  quantity?: number;
}

export interface CartItem extends Product {}

export interface WishlistItem extends Product {}
