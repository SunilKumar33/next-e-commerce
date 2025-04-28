"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-green-500 mb-6">
          <FaCheckCircle className="w-16 h-16 mx-auto" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-500 mb-2">Order ID</p>
          <p className="font-mono font-medium">{orderId}</p>
        </div>

        <p className="text-sm text-gray-600 mb-8">
          We&apos;ll send you a confirmation email with your order details
          shortly.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
