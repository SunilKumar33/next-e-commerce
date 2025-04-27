"use client";

import { useCartStore } from "../../../lib/store";
import { WishlistItem } from "../../../types";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useCartStore();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
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
