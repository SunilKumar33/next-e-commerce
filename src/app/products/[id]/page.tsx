import Image from "next/image";
import { Product } from "../../../../types/product";
import { getProduct } from "../../../../lib/products";
import { FaStar } from "react-icons/fa";
import { AddToCartButton, AddToWishlistButton } from "./_actions";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product: Product | null = await getProduct(id);

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
              <FaStar className="text-yellow-400" />
              <span className="ml-2 text-gray-600">
                {product.rating?.toFixed(1) || "N/A"}
              </span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-gray-600">{product.category}</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="text-3xl font-bold mb-6">
              ${product.price?.toFixed(2)}
            </div>

            <div className="flex space-x-4">
              <AddToCartButton product={product} />
              <AddToWishlistButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
