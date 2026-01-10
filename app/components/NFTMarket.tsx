'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, ShoppingCart, Clock } from 'lucide-react';

interface NFT {
  id: string;
  name: string;
  image: string;
  currentBid: number;
  creator: string;
  endTime: string;
  bidders: number;
}

const mockNFTs: NFT[] = [
  {
    id: '1',
    name: 'Linera Genesis',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    currentBid: 2.5,
    creator: '0x7a4F...93E2',
    endTime: '2h 34m',
    bidders: 12
  },
  {
    id: '2',
    name: 'Microchain Dream',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    currentBid: 1.8,
    creator: '0x2b9c...45A1',
    endTime: '4h 12m',
    bidders: 8
  },
  {
    id: '3',
    name: 'Real-Time Rush',
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    currentBid: 3.2,
    creator: '0x9f1e...82B3',
    endTime: '1h 45m',
    bidders: 15
  }
];

export default function NFTMarket({ isConnected }: { isConnected: boolean }) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [liveUpdates, setLiveUpdates] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const prices = mockNFTs.map(nft => `${nft.name}: ${(nft.currentBid + Math.random() * 0.5).toFixed(2)} USDC`);
      setLiveUpdates(prices);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">NFT Marketplace</h2>
          <p className="text-slate-400">Real-time auction powered by Linera microchains</p>
        </div>
        <div className="flex gap-2">
          <TrendingUp className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      {/* Live Price Feed */}
      <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
        <p className="text-sm text-cyan-400 mb-3 font-semibold">⚡ Live Price Updates</p>
        <div className="space-y-2">
          {liveUpdates.slice(0, 3).map((update, i) => (
            <p key={i} className="text-sm text-slate-300 font-mono">{update}</p>
          ))}
        </div>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockNFTs.map((nft) => (
          <div
            key={nft.id}
            onClick={() => setSelectedNFT(nft)}
            className="group cursor-pointer bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-lg overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all transform hover:scale-105"
          >
            {/* NFT Image */}
            <div
              className="w-full h-64 bg-gradient-to-br group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all"
              style={{ background: nft.image }}
            />

            {/* NFT Info */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2">{nft.name}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Current Bid</span>
                  <span className="text-cyan-400 font-bold">{nft.currentBid} USDC</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Bidders</span>
                  <span className="text-purple-400">{nft.bidders}</span>
                </div>
                <div className="flex items-center gap-2 text-orange-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{nft.endTime} left</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all font-medium">
                Place Bid
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected NFT Details */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedNFT(null)}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">{selectedNFT.name}</h3>
            <div className="h-48 rounded-lg mb-6" style={{ background: selectedNFT.image }} />
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Current Bid</span>
                <span className="text-cyan-400 font-bold text-lg">{selectedNFT.currentBid} USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Creator</span>
                <span className="text-slate-200 font-mono text-sm">{selectedNFT.creator}</span>
              </div>
            </div>
            <input
              type="number"
              placeholder="Your bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white mb-4 placeholder-slate-500"
            />
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all font-bold" disabled={!isConnected}>
              {isConnected ? 'Place Bid' : 'Connect Wallet First'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
