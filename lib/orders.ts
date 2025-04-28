import {
  Order,
  OrderItem,
  ShippingAddress,
  PaymentDetails,
} from "../types/order";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function createOrder(
  items: OrderItem[],
  shippingAddress: ShippingAddress,
  paymentDetails: PaymentDetails,
  total: number
): Promise<Order> {
  await delay(1500);
  // Create a new order
  const order: Order = {
    id: `ORD-${Math.random().toString(36).substr(2, 9)}`.toUpperCase(),
    items,
    shippingAddress,
    paymentDetails,
    total,
    status: "processing",
    createdAt: new Date(),
  };
  await delay(1000);
  order.status = "completed";
  return order;
}

export function validatePaymentDetails(
  paymentDetails: PaymentDetails
): string | null {
  if (paymentDetails.cardNumber.replace(/\s/g, "").length !== 16) {
    return "Invalid card number";
  }
  if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)) {
    return "Invalid expiry date format (MM/YY)";
  }
  if (!/^\d{3}$/.test(paymentDetails.cvv)) {
    return "Invalid CVV";
  }
  if (!paymentDetails.cardHolderName.trim()) {
    return "Card holder name is required";
  }
  return null;
}

export function validateShippingAddress(
  address: ShippingAddress
): string | null {
  if (!address.fullName.trim()) {
    return "Full name is required";
  }
  if (!address.address.trim()) {
    return "Address is required";
  }
  if (!address.city.trim()) {
    return "City is required";
  }
  if (!address.state.trim()) {
    return "State is required";
  }
  if (!address.zipCode.trim()) {
    return "ZIP code is required";
  }
  if (!address.phone.trim()) {
    return "Phone number is required";
  }
  return null;
}
