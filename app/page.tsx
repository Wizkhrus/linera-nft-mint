'use client';

import { useState } from 'react';
import MintComponent from './components/MintComponent';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Linera NFT Mint
          </h1>
          <p className="text-xl text-gray-300">
            Free NFT minting on the Linera blockchain
          </p>
        </div>
        <MintComponent />
      </div>
    </main>
  );
}
