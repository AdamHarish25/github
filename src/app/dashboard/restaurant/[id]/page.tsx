
'use client';

import {
  ArrowLeft,
  Flame,
  Search,
  ShoppingCart,
  User as UserIcon,
  ChefHat,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const tenants = [
  {
    id: '1',
    name: 'Rustic Grill',
    logo: PlaceHolderImages.find((img) => img.id === 'rustic-grill-logo')
      ?.imageUrl,
    hero: PlaceHolderImages.find(
      (img) => img.id === 'rustic-grill-hero'
    )?.imageUrl,
    heroHint: 'steak meal',
  },
  // Other tenants can be added here
];

const menuItems = [
  {
    id: '1',
    name: 'Paket Chicken Grill',
    description: 'Nasi / Kentang + Ayam Grill + Veggies + Mushroom / Cheese Sauce',
    price: '25.000',
    image: PlaceHolderImages.find((img) => img.id === 'chicken-grill-meal')
      ?.imageUrl,
    imageHint: 'chicken grill meal',
  },
  {
    id: '2',
    name: 'Paket Chicken Katsu',
    description: 'Nasi / Kentang + Chicken Katsu + Veggies + Mushroom / Cheese Sauce',
    price: '25.000',
    image: PlaceHolderImages.find((img) => img.id === 'chicken-katsu-meal')
    ?.imageUrl,
    imageHint: 'chicken katsu',
  },
  {
    id: '3',
    name: 'Paket Combo Double Chicken',
    description: 'Nasi / Kentang + Chichken Teriyaki + Chicken Crispy + Mushroom / Cheese Sauce',
    price: '25.000',
    image: PlaceHolderImages.find((img) => img.id === 'combo-chicken-meal')
      ?.imageUrl,
    imageHint: 'teriyaki chicken',
  },
];

export default function RestaurantDetailPage() {
  const params = useParams();
  const { id } = params;

  const tenant = tenants.find((t) => t.id === id);

  if (!tenant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="bg-background min-h-screen pb-32">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-20 p-4 border-b">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/dashboard" passHref>
             <Button variant="ghost" size="icon">
                <ArrowLeft />
             </Button>
          </Link>
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 bg-muted border-none focus-visible:ring-primary"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0"
            >
              1
            </Badge>
          </Button>
          <Button variant="ghost" size="icon">
            <UserIcon className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto">
        <div className="relative h-48 md:h-64 -mx-4 mt-4">
          {tenant.hero && (
            <Image
              src={tenant.hero}
              alt={`${tenant.name} hero image`}
              fill
              className="object-cover"
              data-ai-hint={tenant.heroHint}
            />
          )}
          <div className="absolute -bottom-12 right-4">
            <Card className="rounded-xl overflow-hidden shadow-lg w-28 h-28">
              <CardContent className="p-2 flex flex-col items-center justify-center">
                {tenant.logo && (
                   <Image
                    src={tenant.logo}
                    alt={`${tenant.name} logo`}
                    width={80}
                    height={80}
                    className="object-contain"
                    data-ai-hint="restaurant logo"
                  />
                )}
                <p className="font-medium text-xs mt-1 text-center">{tenant.name}</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16 px-4">
          <h1 className="text-2xl font-bold">{tenant.name}</h1>
        </div>

        <section className="mt-8 px-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            Best Sellers <Flame className="h-6 w-6 text-orange-500" />
          </h2>
          <div className="space-y-4">
            {menuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                    <p className="font-semibold mt-2">{item.price}</p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                        data-ai-hint={item.imageHint}
                      />
                    )}
                    <Button variant="outline" size="sm" className="w-full">
                      Tambah
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-4 left-4 right-4 z-20 drop-shadow-lg">
          <div className="bg-primary text-primary-foreground p-3 shadow-lg rounded-2xl flex justify-between items-center container mx-auto">
            <div className="flex items-center gap-3">
              <div className="bg-background/20 p-2 rounded-full">
                <ChefHat className="text-primary-foreground" />
              </div>
              <div className="text-sm">
                <p>1 item | Diantar dari {tenant.name}</p>
                <p className="font-bold">Rp 25.000</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="relative bg-background/20 hover:bg-background/30 rounded-xl h-12 w-12">
              <ShoppingCart />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">1</Badge>
            </Button>
          </div>
      </footer>
    </div>
  );
}
