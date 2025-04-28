import { Product } from "../types/product";
import { StoreProduct } from "../types/api";

const API_URL = "https://fakestoreapi.com";

function transformProduct(apiProduct: StoreProduct): Product {
  return {
    id: apiProduct.id.toString(),
    name: apiProduct.title,
    description: apiProduct.description,
    price: apiProduct.price,
    image: apiProduct.image,
    category: apiProduct.category,
    rating: apiProduct.rating.rate,
    inStock: true,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data.map(transformProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    const data = await response.json();
    return transformProduct(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    if (!response.ok) throw new Error("Failed to fetch products by category");
    const data = await response.json();
    return data.map(transformProduct);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export function formatCategoryName(category: string): string {
  return category
    .replace(/%20/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    const categories = await response.json();
    return categories.sort();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
