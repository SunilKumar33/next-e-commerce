"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function CheckoutSuccess() {
  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. We&apos;ll send you an email with your order details.
      </p>
      <Link
        href="/products"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
