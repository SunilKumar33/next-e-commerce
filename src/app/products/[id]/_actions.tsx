"use client";

import { useCartStore } from "../../../../lib/store";
import { Product } from "../../../../types/product";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCartStore();
  return (
    <button
      onClick={() => {
        addToCart(product);
        toast.success("Added to cart");
      }}
      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
    >
      <FaShoppingCart />
      <span>Add to Cart</span>
    </button>
  );
}

export function AddToWishlistButton({ product }: { product: Product }) {
  const { addToWishlist, wishlist } = useCartStore();
  const isInWishlist = wishlist.some((item) => item.id === product.id);
  return (
    <button
      onClick={() => {
        addToWishlist(product);
        toast.success(
          isInWishlist ? "Removed from wishlist" : "Added to wishlist"
        );
      }}
      className="px-6 py-3 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
    >
      <FaHeart />
    </button>
  );
}
