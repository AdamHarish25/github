
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  const { cart, cartTotal, formatPrice, clearCart } = useCart();

  useEffect(() => {
    // Clear the cart when the component mounts
    const timer = setTimeout(() => {
      clearCart();
    }, 500); // give a small delay to ensure cart is displayed before clearing

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
            <svg
                width="120"
                height="120"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto text-primary"
                >
                <path
                    d="M2.57141 19.4286L6.85713 15.1429L11.1428 19.4286L6.85713 23.7143L2.57141 19.4286Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
                <path
                    d="M45.4285 28.5714L41.1428 32.8571L36.8571 28.5714L41.1428 24.2857L45.4285 28.5714Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
                <path
                    d="M15.1428 6.85712L19.4285 2.57141L23.7142 6.85712L19.4285 11.1428L15.1428 6.85712Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
                <path
                    d="M24.0002 45.4285C27.3019 45.4285 30.4357 44.5771 33.0563 43.0116C35.6769 41.4461 37.6718 39.2433 38.8285 36.6571C41.7142 37.9999 43.9999 40.2856 45.4285 42.8571"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M2.57141 33.1429C4.00001 30.5714 6.28572 28.2857 9.14287 27C10.2995 29.5862 12.2944 31.789 14.915 33.3545C17.5356 34.9201 20.6694 35.7714 24.0002 35.7714"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M33.1429 45.4285C30.5714 43.9999 28.2857 41.7142 27 38.8571C29.5862 37.7004 31.789 35.7055 33.3545 33.0849C34.9201 30.4643 35.7714 27.3305 35.7714 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M42.8571 9.14287C40.2856 10.5714 37.9999 12.8571 36.6571 15.7143C37.9999 18.5714 40.2856 20.8571 42.8571 22.2857"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M24 12.2286C20.6983 12.2286 17.5645 13.0799 14.9439 14.6455C12.3233 16.211 10.3284 18.4138 9.17176 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M17.4286 25.1429L22.2857 30L34.2857 18"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">Payment Success</h1>
        <p className="text-muted-foreground mt-2 mb-8">
          We are preparing your order and it will be delivered to <br /> your table shortly. Thank you!
        </p>

        {cart.length > 0 && (
            <Card className="text-left bg-accent/50 border-none shadow-none">
            <CardHeader>
                <CardTitle className="text-center text-primary font-semibold">Your order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                    <p className="text-muted-foreground">{item.name} {item.quantity}x</p>
                    <p className="font-medium text-foreground">{formatPrice(item.price)}</p>
                </div>
                ))}
                <Separator className="my-4 bg-border/50"/>
                <div className="flex justify-between items-center font-semibold text-base">
                <p className="text-muted-foreground">Total Amount</p>
                <p className="text-foreground">{formatPrice(cartTotal)}</p>
                </div>
            </CardContent>
            </Card>
        )}

        <Link href="/dashboard" passHref className='mt-8 block'>
            <Button size="lg" className="w-full rounded-lg">
                Back to home
            </Button>
        </Link>
      </div>
    </div>
  );
}
