"use client";

import { Suspense } from "react";
import CheckoutSuccessInner from "./CheckoutSuccessInner";

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessInner />
    </Suspense>
  );
}
