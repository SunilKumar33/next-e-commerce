"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "../../../../types/product";
import { getProductsByCategory } from "../../../../lib/products";
import Link from "next/link";
import Image from "next/image";
import { formatCategoryName } from "../../../../lib/products";
import { Loader } from "../../../../components/Loader";

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (typeof category === "string") {
        const data = await getProductsByCategory(category);
        setProducts(data);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8 capitalize">
        {formatCategoryName(category as string)}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm text-gray-600">
                    {product.rating}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
