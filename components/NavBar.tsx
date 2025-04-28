"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCartStore } from "../lib/store";
import { LocationSelector } from "./LocationSelector";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import Image from "next/image";
import { formatCategoryName } from "../lib/products";
import TechStoreSvg from "../public/images/icon.svg";

interface NavbarProps {
  categories: string[];
}

export function Navbar({ categories }: NavbarProps) {
  const { items, wishlist } = useCartStore();
  const { data: session } = useSession();
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
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

        <div className="py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={TechStoreSvg}
              alt="TechStore Logo"
              width={40}
              height={40}
              className="w-10"
            />
            <span className="text-xl font-bold text-gray-800">TechStore</span>
          </Link>

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

          <div className="flex items-center space-x-6">
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                onClick={() => setShowCategories(!showCategories)}
              >
                <span>Categories</span>
                <FaChevronDown
                  className={`transition-transform duration-200 ${
                    showCategories ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showCategories && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    href="/categories"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowCategories(false)}
                  >
                    All Categories
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${category}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 capitalize"
                      onClick={() => setShowCategories(false)}
                    >
                      {formatCategoryName(category)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/wishlist"
              className="text-gray-600 hover:text-gray-800 flex items-center space-x-1"
            >
              <div className="p-2 hover:text-blue-600 transition-colors relative">
                <FaHeart className="w-6 h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
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

        <div className="flex items-center space-x-8">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="text-gray-600 hover:text-gray-800 capitalize"
            >
              {formatCategoryName(category)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
