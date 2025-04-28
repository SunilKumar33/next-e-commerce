import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  items: CartItem[];
  wishlist: Product[];
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<StoreState>()(
  persist(
    (set) => ({
      clearCart: () => set({ items: [], wishlist: [], total: 0 }),
      items: [],
      wishlist: [],
      total: 0,
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );
          if (existingItem) {
            return {
              ...state,
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              total: state.total + product.price,
            };
          }
          return {
            ...state,
            items: [...state.items, { ...product, quantity: 1 }],
            total: state.total + product.price,
          };
        }),
      removeFromCart: (id) =>
        set((state) => {
          const item = state.items.find((item) => item.id === id);
          return {
            ...state,
            items: state.items.filter((item) => item.id !== id),
            total: state.total - (item ? item.price * item.quantity : 0),
          };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          const item = state.items.find((item) => item.id === productId);
          if (!item) return state;
          const quantityDiff = quantity - item.quantity;
          return {
            ...state,
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
            total: state.total + item.price * quantityDiff,
          };
        }),
      addToWishlist: (product) =>
        set((state) => {
          const isInWishlist = state.wishlist.some(
            (item) => item.id === product.id
          );
          if (isInWishlist) {
            return {
              wishlist: state.wishlist.filter((item) => item.id !== product.id),
            };
          }
          return {
            wishlist: [...state.wishlist, product],
          };
        }),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),
      isInWishlist: (id: string) => {
        const state = useCartStore.getState();
        return state.wishlist.some((item) => item.id === id);
      },
    }),
    { name: "ecommerce-store" }
  )
);
