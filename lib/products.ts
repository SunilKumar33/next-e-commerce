import { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  // Mock data (replace with database in production)
  return [
    {
      id: "1",
      name: "Product 1",
      price: 29.99,
      image: "/images/product1.jpg",
      description: "Description for Product 1",
    },
    {
      id: "2",
      name: "Product 2",
      price: 49.99,
      image: "/images/product2.jpg",
      description: "Description for Product 2",
    },
  ];
}

export async function getProduct(id: string): Promise<Product> {
  const products = await getProducts();
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  return product;
}
