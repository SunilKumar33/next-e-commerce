"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../lib/store";
import { Product } from "../types/product";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist } = useCartStore();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover"
          />
        </Link>
        <button
          onClick={() => addToWishlist(product)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
        >
          <FaHeart className="text-red-500" />
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
              className={`${i < product.rating ? 'text-yellow-400' : 'text-gray-300'} w-4 h-4`}
            />
          ))}
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full
              hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
