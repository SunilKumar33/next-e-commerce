"use client";

import Link from "next/link";
import { useCartStore } from "../../../lib/store";
import { WishlistItem } from "../../../types";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useCartStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h1 className="text-2xl text-gray-600 font-bold mb-6">
            Your wishlist is empty
          </h1>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item: WishlistItem) => (
            <div
              key={item.id}
              className="flex justify-between bg-white p-4 rounded shadow"
            >
              <div>
                <h2>{item.name}</h2>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="bg-red-600 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
