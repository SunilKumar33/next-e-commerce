"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../../../../types/product";
import { getProduct } from "../../../../lib/products";
import { useCartStore } from "../../../../lib/store";
import { FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, addToWishlist } = useCartStore();

  useEffect(() => {
    const fetchProductData = async () => {
      const data = await getProduct(params.id);
      setProduct(data);
      setLoading(false);
    };

    fetchProductData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative aspect-square">
            <div className="relative w-full h-full p-8">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <FaStar className="text-yellow-400" />
                <span className="ml-1 text-gray-600">
                  {product.rating?.toFixed(1) || "N/A"}
                </span>
              </div>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-gray-600 capitalize">
                {product.category}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="text-3xl font-bold mb-6">
              ${product.price?.toFixed(2)}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="px-6 py-3 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
