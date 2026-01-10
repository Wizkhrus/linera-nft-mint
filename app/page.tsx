'use client';

import { useState } from 'react';

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('mint');
  const [nftName, setNftName] = useState('My NFT');
  const [selectedColor, setSelectedColor] = useState('#ff0000');

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
        {/* Hero */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Real-Time NFT Trading & Creation
          </h2>
          <p className="text-lg text-slate-300 mb-8">Instant microchain-powered NFT interactions</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center gap-4 flex-wrap">
          {['mint', 'market', 'predict', 'create'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:text-white'
              }`}
            >
              {tab === 'mint' && '🎨 Mint'}
              {tab === 'market' && '📊 Market'}
              {tab === 'predict' && '🎯 Predict'}
              {tab === 'create' && '🎮 Create'}
            </button>
          ))}
        </div>

        {/* Mint Tab */}
        {activeTab === 'mint' && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">🎨 Free NFT Minting</h3>
            <div className="space-y-4">
              <div className="bg-slate-600/50 p-8 rounded-lg text-center mb-4">
                <p className="text-white text-lg font-bold">T-Rex NFT</p>
                <p className="text-cyan-400 text-sm mt-2">Ready to Mint!</p>
              </div>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-bold text-lg transition-all transform hover:scale-105">
                {walletConnected ? 'Mint Free NFT' : 'Connect Wallet First'}
              </button>
              <p className="text-slate-400 text-sm text-center">
                Free NFT minting on Linera blockchain • Instant delivery
              </p>
            </div>
          </div>
        )}

        {/* Market Tab */}
        {activeTab === 'market' && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">📊 NFT Market</h3>
            <div className="space-y-3">
              {['Linera Genesis', 'T-Rex NFT', 'Blue Diamond', 'Cyber Punk'].map((nft, idx) => (
                <div key={idx} className="bg-slate-700/50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">{nft}</p>
                    <p className="text-cyan-400 text-sm">Price: {2.5 + idx * 0.5} USDC</p>
                  </div>
                  <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium transition-all">
                    Bid
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Predict Tab */}
        {activeTab === 'predict' && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">🎯 Prediction Market</h3>
            <div className="space-y-4">
              {['Will NFT floor price go up?', 'Will trading volume increase?'].map((pred, idx) => (
                <div key={idx} className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="font-semibold text-white mb-3">{pred}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded font-medium transition-all">
                      YES (2.5x)
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-medium transition-all">
                      NO (1.8x)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Tab */}
        {activeTab === 'create' && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">🎮 Create Custom NFT</h3>
            <div className="space-y-4">
              <div className="bg-slate-600/50 p-12 rounded-lg text-center" style={{ backgroundColor: selectedColor, opacity: 0.3 }}>
                <p className="text-slate-300 font-bold text-lg">{nftName}</p>
              </div>
              <div>
                <label className="text-white text-sm block mb-2">Choose Color:</label>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer border border-slate-600"
                />
              </div>
              <div>
                <label className="text-white text-sm block mb-2">NFT Name:</label>
                <input
                  type="text"
                  value={nftName}
                  onChange={(e) => setNftName(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-cyan-400 outline-none"
                  placeholder="My NFT"
                />
              </div>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-bold transition-all transform hover:scale-105">
                {walletConnected ? 'Create & Mint NFT' : 'Connect Wallet First'}
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
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
