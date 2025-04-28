"use client";

import { useSession } from "next-auth/react";
import { useCartStore } from "../../../lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ShippingAddress, PaymentDetails } from "../../../types/order";
import {
  createOrder,
  validatePaymentDetails,
  validateShippingAddress,
} from "../../../lib/orders";
import { formatCurrency } from "../../../lib/currency";
import toast from "react-hot-toast";
import { FaLock, FaArrowLeft, FaCreditCard, FaTruck } from "react-icons/fa";
import { LocationSelector } from "../../../components/LocationSelector";

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

export default function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    email: session?.user?.email || "",
    fullName: session?.user?.name || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "shipping") {
      const shippingAddress: ShippingAddress = {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone,
      };
      const shippingError = validateShippingAddress(shippingAddress);
      if (shippingError) {
        toast.error(shippingError);
        return;
      }
      setStep("payment");
      return;
    }
    try {
      setLoading(true);
      const paymentDetails: PaymentDetails = {
        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        cardHolderName: formData.cardHolderName,
      };
      const paymentError = validatePaymentDetails(paymentDetails);
      if (paymentError) {
        toast.error(paymentError);
        setLoading(false);
        return;
      }
      const shippingAddress: ShippingAddress = {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone,
      };
      const orderItems = items.map((item) => ({
        product: item,
        quantity: item.quantity,
      }));
      const order = await createOrder(
        orderItems,
        shippingAddress,
        paymentDetails,
        total
      );
      toast.success("Order placed successfully!");
      clearCart();
      router.push(`/checkout/success?orderId=${order.id}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl text-gray-600 font-bold mb-6">
          Your cart is empty
        </h1>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {!session && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaLock className="text-blue-500" />
            <div>
              <p className="font-medium text-blue-900">
                Checking out as a guest
              </p>
              <p className="text-sm text-blue-700">
                Sign in for faster checkout and order history
              </p>
            </div>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign in
          </Link>
        </div>
      )}
      <Link
        href="/cart"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group"
      >
        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Cart
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            <div className="flex justify-center mb-8">
              <div className="flex items-center w-full max-w-md">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step === "shipping"
                        ? "bg-blue-600 text-white"
                        : "bg-green-500 text-white"
                    } mb-2`}
                  >
                    <FaTruck className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">Shipping</span>
                </div>
                <div
                  className={`h-1 flex-1 ${
                    step === "shipping" ? "bg-gray-300" : "bg-green-500"
                  }`}
                />
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step === "shipping"
                        ? "bg-gray-300 text-gray-600"
                        : "bg-blue-600 text-white"
                    } mb-2`}
                  >
                    <FaCreditCard className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">Payment</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === "shipping" ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    Shipping Information
                  </h2>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Location
                    </label>
                    <LocationSelector />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="p-2 border rounded w-full"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="p-2 border rounded w-full"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="p-2 border rounded w-full"
                      required
                    />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="p-2 border rounded w-full"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="p-2 border rounded w-full"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="p-2 border rounded w-full"
                      required
                    />
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="ZIP Code"
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="Card Number"
                      className="p-2 border rounded w-full"
                      required
                      maxLength={19}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="p-2 border rounded w-full"
                        required
                        maxLength={5}
                      />
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="CVV"
                        className="p-2 border rounded w-full"
                        required
                        maxLength={3}
                      />
                    </div>
                    <input
                      type="text"
                      name="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={handleInputChange}
                      placeholder="Card Holder Name"
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                </>
              )}
              <div className="flex justify-between mt-6">
                {step === "payment" && (
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                  >
                    Back to Shipping
                  </button>
                )}
                <button
                  type="submit"
                  className={`px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center space-x-2 ${
                    step === "shipping" ? "ml-auto" : "w-full md:w-auto"
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <span>
                        {step === "shipping"
                          ? "Continue to Payment"
                          : "Place Order"}
                      </span>
                      <FaLock className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="lg:row-span-2">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <span className="text-gray-500">{items.length} items</span>
            </div>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-right ml-4">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">Including GST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
