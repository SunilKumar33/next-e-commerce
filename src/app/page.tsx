"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../../lib/products";
import { Product } from "../../types/product";
import { ProductCard } from "../../components/ProductCard";
import { Loader } from "../../components/Loader";

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setDisplayedProducts(data.slice(0, ITEMS_PER_PAGE));
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleShowMore = () => {
    const currentLength = displayedProducts.length;
    const nextProducts = products.slice(
      currentLength,
      currentLength + ITEMS_PER_PAGE
    );
    setDisplayedProducts([...displayedProducts, ...nextProducts]);
  };

  const handleShowLess = () => {
    setDisplayedProducts(products.slice(0, ITEMS_PER_PAGE));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        {displayedProducts.length < products.length && (
          <button
            onClick={handleShowMore}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>Show More</span>
            <span className="text-sm">
              ({products.length - displayedProducts.length} more)
            </span>
          </button>
        )}
        {displayedProducts.length > ITEMS_PER_PAGE && (
          <button
            onClick={handleShowLess}
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
          >
            <span>Show Less</span>
          </button>
        )}
      </div>
    </div>
  );
}
