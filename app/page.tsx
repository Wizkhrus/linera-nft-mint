'use client';

import { useState, useEffect } from 'react';
import MintComponent from './components/MintComponent';
import NFTMarket from './components/NFTMarket';
import PredictionMarket from './components/PredictionMarket';
import NFTCreator from './components/NFTCreator';
import { Tabs, TabsContent, TabsList, TabTrigger } from './components/ui/tabs';

export default function Home() {
  const [activeTab, setActiveTab] = useState('mint');
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with modern gradient */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/80 to-slate-900/0 backdrop-blur-md border-b border-slate-700/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Linera NFT Hub</h1>
                <p className="text-xs text-slate-400">Real-Time NFT Ecosystem</p>
              </div>
            </div>
            <button
              onClick={() => setWalletConnected(!walletConnected)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-medium transition-all transform hover:scale-105"
            >
              {walletConnected ? '✓ Connected' : '◎ Connect Wallet'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-12 container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Real-Time NFT Trading & Creation
          </h2>
          <p className="text-lg text-slate-300 mb-8">Experience instant microchain-powered NFT interactions</p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <Tabs defaultValue="mint" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-slate-800/50 backdrop-blur border border-slate-700/50 p-1">
              <TabsTrigger value="mint" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                🎨 Mint
              </TabsTrigger>
              <TabsTrigger value="market" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                📊 Market
              </TabsTrigger>
              <TabsTrigger value="predict" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                🎯 Predict
              </TabsTrigger>
              <TabsTrigger value="create" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                🎮 Create
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mint" className="mt-8">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
                <MintComponent isConnected={walletConnected} />
              </div>
            </TabsContent>

            <TabsContent value="market" className="mt-8">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
                <NFTMarket isConnected={walletConnected} />
              </div>
            </TabsContent>

            <TabsContent value="predict" className="mt-8">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
                <PredictionMarket isConnected={walletConnected} />
              </div>
            </TabsContent>

            <TabsContent value="create" className="mt-8">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
                <NFTCreator isConnected={walletConnected} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: 'Total Volume', value: '2.4K USDC', icon: '📈' },
            { label: 'NFTs Minted', value: '1,234', icon: '🎨' },
            { label: 'Active Traders', value: '458', icon: '👥' },
            { label: 'Real-Time Speed', value: '<100ms', icon: '⚡' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
              <p className="text-slate-400 text-sm mb-2">{stat.icon} {stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
