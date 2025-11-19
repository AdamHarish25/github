import { Atom } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-full flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2.5 text-primary">
            {/* <Atom size={36} strokeWidth={2.5} />
            <h1 className="text-4xl font-medium font-headline text-foreground tracking-tight">Kivo</h1> */}

            <Image width={150} height={150} src={'/logo.png'} alt="app logo">

            </Image>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
