import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PupMatch — Find Your Perfect Dog Breed',
  description: 'Discover 200+ dog breeds, scan any dog to identify its breed with AI, compare breeds side-by-side, and find the perfect match for your lifestyle.',
  keywords: ['dog breeds', 'breed identifier', 'dog scanner', 'puppy match', 'dog breed comparison'],
  openGraph: {
    title: 'PupMatch — Find Your Perfect Dog Breed',
    description: 'Discover 200+ breeds, scan any dog with AI, and find the perfect match for your lifestyle.',
    url: 'https://pupmatch.vercel.app',
    siteName: 'PupMatch',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PupMatch — Find Your Perfect Dog Breed',
    description: 'Discover 200+ breeds, scan any dog with AI, and find the perfect match for your lifestyle.',
  },
  metadataBase: new URL('https://pupmatch.vercel.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
