"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCategories,
  getProductsByCategory,
  formatCategoryName,
} from "../../../lib/products";
import { Product } from "../../../types/product";
import Image from "next/image";

interface CategoryPreview {
  name: string;
  products: Product[];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryPreview[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategoriesWithPreviews = async () => {
      const categoryNames = await getCategories();
      const categoryData = await Promise.all(
        categoryNames.map(async (name) => {
          const products = await getProductsByCategory(name);
          return {
            name,
            products: products.slice(0, 4),
          };
        })
      );
      setCategories(categoryData);
      setLoading(false);
    };
    fetchCategoriesWithPreviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-12">Shop by Category</h1>
      <div className="space-y-12">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {formatCategoryName(category.name)}
              </h2>
              <Link
                href={`/categories/${category.name}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-blue-600 font-bold mt-2">
                      ${product.price?.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
