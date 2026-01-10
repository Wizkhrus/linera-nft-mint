'use client';

import { useState } from 'react';
import MintComponent from './components/MintComponent';

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('mint');

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
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

      {/* Content */}
      <div className="pt-24 pb-12 container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Real-Time NFT Trading & Creation
          </h2>
          <p className="text-lg text-slate-300 mb-8">Experience instant microchain-powered NFT interactions</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex justify-center gap-4">
          {[
            { id: 'mint', label: '🎨 Mint', icon: '🎨' },
            { id: 'market', label: '📊 Market', icon: '📊' },
            { id: 'predict', label: '🎯 Predict', icon: '🎯' },
            { id: 'create', label: '🎮 Create', icon: '🎮' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mint Tab Content */}
        {activeTab === 'mint' && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <MintComponent isConnected={walletConnected} />
          </div>
        )}

        {/* Market Tab Content */}
        {activeTab === 'market' && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-center py-12">
              <h3 className="text-3xl font-bold text-white mb-4">📊 NFT Market</h3>
              <p className="text-slate-300">Real-time NFT trading with live price updates</p>
              <div className="mt-8 grid grid-cols-1 gap-4">
                {['Linera Genesis', 'T-Rex NFT', 'Blue Diamond'].map((nft, idx) => (
                  <div key={idx} className="bg-slate-700/50 p-4 rounded-lg">
                    <p className="font-semibold text-white">{nft}</p>
                    <p className="text-cyan-400">Current Bid: 2.5 USDC</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Predict Tab Content */}
        {activeTab === 'predict' && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-center py-12">
              <h3 className="text-3xl font-bold text-white mb-4">🎯 Prediction Market</h3>
              <p className="text-slate-300">Bet on NFT price movements</p>
              <div className="mt-8 space-y-4">
                {['Will NFT floor price go up?', 'Will trading volume increase?'].map((pred, idx) => (
                  <div key={idx} className="bg-slate-700/50 p-4 rounded-lg">
                    <p className="font-semibold text-white mb-2">{pred}</p>
                    <div className="flex gap-2 justify-center">
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded">YES</button>
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded">NO</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Create Tab Content */}
        {activeTab === 'create' && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-center py-12">
              <h3 className="text-3xl font-bold text-white mb-4">🎮 NFT Creator</h3>
              <p className="text-slate-300">Design custom NFTs with real-time preview</p>
              <div className="mt-8">
                <div className="bg-slate-600/50 p-12 rounded-lg mb-4">
                  <p className="text-slate-400">NFT Preview Area</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm">Choose Color:</label>
                    <input type="color" className="w-full h-10 rounded cursor-pointer" />
                  </div>
                  <div>
                    <label className="text-white text-sm">NFT Name:</label>
                    <input type="text" placeholder="My NFT" className="w-full px-3 py-2 rounded bg-slate-700 text-white border border-slate-600" />
                  </div>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-400 hover:to-blue-500">
                    Create NFT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: 'Total Volume', value: '2.4K USDC', icon: '📈' },
            { label: 'NFTs Minted', value: '1,234', icon: '🎨' },
            { label: 'Active Traders', value: '458', icon: '👥' },
            { label: 'Real-Time Speed', value: '<100ms', icon: '⚡' },
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
