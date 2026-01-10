import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Linera NFT Mint',
  description: 'Free NFT minting on Linera blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
