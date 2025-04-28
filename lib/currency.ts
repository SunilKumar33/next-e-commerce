const USD_TO_INR_RATE = 83.12;

export function formatCurrency(
  amount: number,
  currency: "USD" | "INR" = "INR"
): string {
  if (currency === "INR") {
    const inrAmount = amount * USD_TO_INR_RATE;
    return `₹${inrAmount.toFixed(2)}`;
  }
  return `$${amount.toFixed(2)}`;
}
