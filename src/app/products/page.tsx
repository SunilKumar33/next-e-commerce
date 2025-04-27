import { ProductCard } from "../../../components/ProductCard";
import { Product } from "../../../types/product";

async function fetchProducts(): Promise<Product[]> {
  // Mock API call
  return [
    {
      id: "1",
      name: "Product 1",
      description: "A fantastic product with amazing features",
      price: 29.99,
      image: "/products/1.jpg",
      category: "electronics",
      rating: 4.5,
      inStock: true
    },
    {
      id: "2",
      name: "Product 2",
      description: "Another great product with unique features",
      price: 49.99,
      image: "/products/2.jpg",
      category: "electronics",
      rating: 4.2,
      inStock: true
    },
  ];
}

export default async function Products() {
  const products: Product[] = await fetchProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
