"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../lib/store";
import { Product } from "../types/product";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { formatCurrency } from "../lib/currency";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, wishlist } = useCartStore();
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square">
        <Link href={`/products/${product.id}`}>
          <div className="relative w-full h-full p-4">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <button
          onClick={() => {
            addToWishlist(product);
            toast.success(
              isInWishlist ? "Removed from wishlist" : "Added to wishlist"
            );
          }}
          className={`absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 z-10 transition-colors ${
            isInWishlist ? "bg-red-50" : ""
          }`}
        >
          <FaHeart
            className={`transition-colors ${
              isInWishlist ? "text-red-500" : "text-gray-400"
            }`}
          />
        </button>
        {product.inStock ? (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-sm rounded">
            In Stock
          </span>
        ) : (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
            Out of Stock
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={`${
                i < product.rating ? "text-yellow-400" : "text-gray-300"
              } w-4 h-4`}
            />
          ))}
        </div>
        <div className="flex items-center mt-1">
          <FaStar className="text-yellow-400" />
          <span className="text-sm text-gray-600 ml-1">
            {product.rating?.toFixed(1) || "N/A"}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={() => {
              addToCart(product);
              toast.success("Added to cart");
            }}
            disabled={!product.inStock}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <FaShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
