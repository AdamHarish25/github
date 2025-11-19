'use client';

import {
  Flame,
  Hand,
  Search,
  ShoppingCart,
  User as UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useUser } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const promoBanner = PlaceHolderImages.find((img) => img.id === 'promo-banner');

  return (
    <div className="bg-secondary min-h-screen">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 p-4 border-b">
        <div className="container mx-auto flex items-center gap-4">
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
            Best sellers this week <Flame className="h-6 w-6 text-orange-500" />
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {tenants.map((tenant) => (
              <Card
                key={tenant.id}
                className="overflow-hidden text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
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
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">All Tenants</h2>
          <div className="grid grid-cols-3 gap-4">
            {allTenants.map((tenant, index) => (
              <Card
                key={`${tenant.id}-${index}`}
                className="overflow-hidden text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
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
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}