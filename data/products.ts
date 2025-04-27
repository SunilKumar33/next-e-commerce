import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600',
    category: 'Electronics',
    rating: 4.5,
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600',
    category: 'Electronics',
    rating: 4.2,
    inStock: true,
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    description: 'Water-resistant laptop backpack with multiple compartments',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600',
    category: 'Accessories',
    rating: 4.8,
    inStock: true,
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical gaming keyboard with custom switches',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600',
    category: 'Electronics',
    rating: 4.7,
    inStock: false,
  },
];
