import Image from "next/image";
import { Product } from "../../../../types";

async function fetchProduct(id: string): Promise<Product> {
  // Mock API call
  return {
    id,
    name: `Product ${id}`,
    price: 29.99,
    image: `/products/${id}.jpg`,
    description: "This is a sample product description.",
  };
}

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product: Product = await fetchProduct(params.id);

  return (
    <div className="bg-white p-4 rounded shadow">
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        className="w-full h-96 object-cover"
      />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
    </div>
  );
}
