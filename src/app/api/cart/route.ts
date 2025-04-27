import { NextResponse } from "next/server";
import { CartItem } from "../../../../types";

export async function GET() {
  // Mock cart data
  const cart: CartItem[] = [];
  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const body: CartItem = await request.json();
  // Mock saving cart item
  return NextResponse.json({ message: "Item added to cart", data: body });
}
