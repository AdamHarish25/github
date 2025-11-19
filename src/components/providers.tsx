"use client";

import { FirebaseClientProvider } from "@/firebase";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/cart-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <CartProvider>{children}</CartProvider>
      <Toaster />
    </FirebaseClientProvider>
  );
}
