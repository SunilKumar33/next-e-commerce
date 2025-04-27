"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCartStore } from "../lib/store";
import { LocationSelector } from "./LocationSelector";
import { FaShoppingCart, FaHeart, FaUserCircle, FaSearch } from "react-icons/fa";
import Image from "next/image";

export function Navbar() {
  const { items } = useCartStore();
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with location and account */}
        <div className="py-2 border-b flex justify-between items-center text-sm">
          <LocationSelector />
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-2">
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-gray-700">{session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="text-gray-600 hover:text-gray-800 flex items-center space-x-1"
              >
                <FaUserCircle className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Main navigation */}
        <div className="py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="E-commerce"
              width={40}
              height={40}
              className="w-10"
            />
            <span className="text-xl font-bold text-gray-800">TechStore</span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-full border focus:outline-none focus:border-blue-500"
              />
              <FaSearch className="absolute right-4 top-3 text-gray-400" />
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex items-center space-x-6">
            <Link
              href="/wishlist"
              className="text-gray-600 hover:text-gray-800 flex items-center space-x-1"
            >
              <div className="relative">
                <FaHeart className="w-6 h-6" />
              </div>
              <span className="hidden md:inline">Wishlist</span>
            </Link>

            <Link
              href="/cart"
              className="text-gray-600 hover:text-gray-800 flex items-center space-x-1"
            >
              <div className="relative">
                <FaShoppingCart className="w-6 h-6" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Cart</span>
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="py-2 border-t flex items-center space-x-8 text-sm">
          <Link href="/category/electronics" className="text-gray-600 hover:text-gray-800">
            Electronics
          </Link>
          <Link href="/category/accessories" className="text-gray-600 hover:text-gray-800">
            Accessories
          </Link>
          <Link href="/category/gadgets" className="text-gray-600 hover:text-gray-800">
            Gadgets
          </Link>
          <Link href="/category/wearables" className="text-gray-600 hover:text-gray-800">
            Wearables
          </Link>
        </div>
      </div>
    </nav>
  );
}
