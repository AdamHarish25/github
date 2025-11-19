
'use client';

import {
  ArrowLeft,
  ChevronDown,
  Cookie,
  CupSoda,
  Drumstick,
  Minus,
  Plus,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';

const orderedItems = [
  {
    id: '1',
    name: 'Paket Chicken Grill',
    price: 25000,
    quantity: 1,
    image: PlaceHolderImages.find((img) => img.id === 'chicken-grill-meal')
      ?.imageUrl,
    imageHint: 'grilled chicken',
  },
  {
    id: '2',
    name: 'Paket Chicken Katsu',
    price: 25000,
    quantity: 1,
    image: PlaceHolderImages.find((img) => img.id === 'chicken-katsu-meal')
      ?.imageUrl,
    imageHint: 'chicken katsu',
  },
  {
    id: '3',
    name: 'Paket Combo Double Chicken',
    price: 19000,
    quantity: 1,
    image: PlaceHolderImages.find((img) => img.id === 'combo-chicken-meal')
      ?.imageUrl,
    imageHint: 'teriyaki chicken',
  },
];

const paymentMethods = [
  { id: 'qris', name: 'QR Payments', logo: '/qris.svg' },
  { id: 'bca', name: 'BCA Virtual Account', logo: '/bca.svg' },
  { id: 'blu', name: 'Blu Virtual Account', logo: '/blu.svg' },
  { id: 'gopay', name: 'Gopay Wallet', logo: '/gopay.svg' },
];

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState(orderedItems);
  const [selectedPayment, setSelectedPayment] = useState('qris');

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 p-4 border-b">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/dashboard/restaurant/1" passHref>
            <Button variant="ghost" size="icon">
              <ArrowLeft />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Checkout</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 pb-32">
        <section className="text-center my-8 relative">
          <Cookie className="h-10 w-10 text-primary/50 absolute top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2" />
          <Drumstick className="h-12 w-12 text-primary/50 absolute top-1/2 left-1/4 transform -translate-x-full -translate-y-full" />
          <CupSoda className="h-10 w-10 text-primary/50 absolute top-1/2 right-1/4 transform translate-x-full -translate-y-full" />
          <p className="text-muted-foreground">Total Payments</p>
          <p className="text-5xl font-bold tracking-tighter">
            {formatPrice(totalPrice)}
          </p>
        </section>

        <section className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover h-16 w-16"
                      data-ai-hint={item.imageHint}
                    />
                  )}
                  <div className="flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <p className="font-bold text-sm">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-center w-4">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Payment Methods</h2>
          <RadioGroup
            value={selectedPayment}
            onValueChange={setSelectedPayment}
          >
            <Card>
              <CardContent className="p-4 space-y-4">
                {paymentMethods.map((method) => (
                  <Label
                    key={method.id}
                    htmlFor={method.id}
                    className="flex items-center gap-4 p-4 border rounded-lg has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer"
                  >
                    <div className="relative w-20 h-6">
                      <Image
                        src={method.logo}
                        alt={`${method.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="flex-grow font-medium">
                      {method.name}
                    </span>
                    <RadioGroupItem value={method.id} id={method.id} />
                  </Label>
                ))}
              </CardContent>
            </Card>
          </RadioGroup>
          <div className="text-center mt-2">
            <Button variant="ghost" size="sm">
              Show more <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </section>
        
        <Separator className="my-8" />

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Redeemable Vouchers</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Enter referral code"
              className="flex-grow"
            />
            <Button variant="outline">Redeem</Button>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-10 bg-background border-t">
        <div className="container mx-auto p-4 flex justify-between items-center">
            <div>
                 <p className="text-muted-foreground text-sm">Total Price</p>
                 <p className="font-bold text-xl">{formatPrice(totalPrice)}</p>
            </div>
          <Button size="lg" className="w-1/2 rounded-full">
            Pay now
          </Button>
        </div>
      </footer>
    </div>
  );
}
