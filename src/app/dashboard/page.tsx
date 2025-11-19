'use client';

import {
  Flame,
  Hand,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  User as UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useUser } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCart } from '@/context/cart-context';

const locations = [
  'Bekasi',
  'Alam Sutera',
  'Kemanggisan',
  'Malang',
  'Semarang',
  'Bandung',
];

const tenants = [
  {
    id: '1',
    name: 'Rustic Grill',
    image: PlaceHolderImages.find((img) => img.id === 'rustic-grill-logo')
      ?.imageUrl,
    imageHint: 'grill logo',
  },
  {
    id: '2',
    name: 'Mama Bento',
    image: PlaceHolderImages.find((img) => img.id === 'mama-bento-logo')
      ?.imageUrl,
    imageHint: 'bento logo',
  },
  {
    id: '3',
    name: 'Warung Nusantara',
    image: PlaceHolderImages.find((img) => img.id === 'warung-nusantara-logo')
      ?.imageUrl,
    imageHint: 'restaurant logo',
  },
];

const allTenants = [
  ...tenants,
  ...tenants.slice().reverse(),
  ...tenants,
];

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { cart, updateCartQuantity, cartCount, cartTotal, formatPrice } =
    useCart();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const promoBanner = PlaceHolderImages.find((img) => img.id === 'promo-banner');

  return (
    <div className="bg-secondary min-h-screen">
      <Sheet>
        <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 p-4 border-b">
          <div className="container mx-auto flex items-center gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-10 bg-muted border-none focus-visible:ring-primary"
              />
            </div>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <Button variant="ghost" size="icon">
              <UserIcon className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <main className="container mx-auto p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-medium flex items-center gap-2">
              Hi There <Hand className="h-6 w-6 text-yellow-500" />
            </h1>
            <p className="text-muted-foreground">
              What would you like to eat today?
            </p>
          </div>

          {promoBanner && (
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={promoBanner.imageUrl}
                alt="Promo Banner"
                width={600}
                height={200}
                className="w-full object-cover"
                data-ai-hint={promoBanner.imageHint}
              />
            </div>
          )}

          <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-3">
              {locations.map((location, index) => (
                <Button
                  key={location}
                  variant={index === 0 ? 'default' : 'outline'}
                  className="rounded-full"
                >
                  {location}
                </Button>
              ))}
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              Best sellers this week{' '}
              <Flame className="h-6 w-6 text-orange-500" />
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {tenants.map((tenant) => (
                <Link
                  href={`/dashboard/restaurant/${tenant.id}`}
                  key={tenant.id}
                  passHref
                >
                  <Card className="overflow-hidden text-center hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      {tenant.image && (
                        <Image
                          src={tenant.image}
                          alt={tenant.name}
                          width={80}
                          height={80}
                          className="rounded-full mb-2 object-cover"
                          data-ai-hint={tenant.imageHint}
                        />
                      )}
                      <p className="font-medium text-sm">{tenant.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">All Tenants</h2>
            <div className="grid grid-cols-3 gap-4">
              {allTenants.map((tenant, index) => (
                <Link
                  href={`/dashboard/restaurant/${tenant.id}`}
                  key={`${tenant.id}-${index}`}
                  passHref
                >
                  <Card className="overflow-hidden text-center hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      {tenant.image && (
                        <Image
                          src={tenant.image}
                          alt={tenant.name}
                          width={80}
                          height={80}
                          className="rounded-full mb-2 object-cover"
                          data-ai-hint={tenant.imageHint}
                        />
                      )}
                      <p className="font-medium text-sm">{tenant.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </main>
        <SheetContent className="flex flex-col">
          <SheetHeader className="px-6">
            <SheetTitle>Your Order</SheetTitle>
          </SheetHeader>
          {cart.length > 0 ? (
            <>
              <div className="flex-grow overflow-y-auto px-6 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
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
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="font-bold text-sm">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-center w-4 text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="font-semibold text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <SheetFooter className="px-6 py-4 mt-auto bg-background border-t">
                <div className="w-full space-y-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Price</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <SheetClose asChild>
                    <Link
                      href="/dashboard/checkout"
                      passHref
                      className="w-full"
                    >
                      <Button size="lg" className="w-full">
                        Checkout
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetFooter>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-grow text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <p className="font-semibold text-lg">Your cart is empty</p>
              <p className="text-muted-foreground text-sm">
                Add some items from the menu to get started.
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
