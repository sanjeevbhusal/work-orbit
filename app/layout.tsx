import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: `%s | WorkOrbit`,
    default: 'WorkOrbit',
  },
  description: "WorkOrbit helps you manage your entire organization's work",
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'h-screen')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
