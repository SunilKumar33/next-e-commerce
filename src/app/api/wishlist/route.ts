import { NextResponse } from "next/server";
import { WishlistItem } from "../../../../types";

export async function GET() {
  // Mock wishlist data
  const wishlist: WishlistItem[] = [];
  return NextResponse.json(wishlist);
}

export async function POST(request: Request) {
  const body: WishlistItem = await request.json();
  // Mock saving wishlist item
  return NextResponse.json({ message: "Item added to wishlist", data: body });
}
