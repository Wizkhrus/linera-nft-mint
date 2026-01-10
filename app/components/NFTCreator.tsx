'use client';

import { useState, useEffect } from 'react';
import { Zap, Palette } from 'lucide-react';

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const shapes = ['Circle', 'Square', 'Triangle', 'Star', 'Heart'];

export default function NFTCreator({ isConnected }: { isConnected: boolean }) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedShape, setSelectedShape] = useState(shapes[0]);
  const [nftName, setNftName] = useState('My Linera NFT');
  const [previewMode, setPreviewMode] = useState(true);
  const [mintingStatus, setMintingStatus] = useState<'idle' | 'minting' | 'success'>('idle');

  const handleMint = async () => {
    if (!isConnected) return;
    setMintingStatus('minting');
    setTimeout(() => setMintingStatus('success'), 2000);
    setTimeout(() => setMintingStatus('idle'), 4000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">NFT Creator</h2>
          <p className="text-slate-400">Design and mint your unique Linera NFTs in real-time</p>
        </div>
        <Palette className="w-8 h-8 text-purple-400" />
      </div>

      {/* Creator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-4">NFT Preview</p>
            <div className="relative h-96 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-slate-700 flex items-center justify-center">
              {/* Dynamic Shape */}
              <svg width="200" height="200" viewBox="0 0 200 200" className="filter drop-shadow-lg">
                {selectedShape === 'Circle' && <circle cx="100" cy="100" r="80" fill={selectedColor} />}
                {selectedShape === 'Square' && <rect x="20" y="20" width="160" height="160" fill={selectedColor} />}
                {selectedShape === 'Triangle' && <polygon points="100,20 180,160 20,160" fill={selectedColor} />}
                {selectedShape === 'Star' && <polygon points="100,20 130,90 200,100 150,150 160,220 100,180 40,220 50,150 0,100 70,90" fill={selectedColor} />}
                {selectedShape === 'Heart' && (
                  <path d="M100,170 Q30,110 30,70 Q30,40 55,40 Q80,40 100,60 Q120,40 145,40 Q170,40 170,70 Q170,110 100,170 Z" fill={selectedColor} />
                )}
              </svg>
            </div>
            <p className="text-white font-bold mt-4">{nftName}</p>
            <p className="text-slate-400 text-sm">Your unique Linera microchain NFT</p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">NFT Name</label>
            <input
              type="text"
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500"
              placeholder="Enter NFT name"
            />
          </div>

          {/* Color Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">Background Color</label>
            <div className="grid grid-cols-5 gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-12 rounded-lg border-2 transition-all ${
                    selectedColor === color
                      ? 'border-white shadow-lg'
                      : 'border-slate-600 hover:border-slate-400'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Shape Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">Shape</label>
            <div className="grid grid-cols-2 gap-2">
              {shapes.map((shape) => (
                <button
                  key={shape}
                  onClick={() => setSelectedShape(shape)}
                  className={`py-2 px-3 rounded-lg border transition-all text-sm font-medium ${
                    selectedShape === shape
                      ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                      : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Metadata</h3>
            <div className="space-y-2 text-xs text-slate-400">
              <p>• Shape: <span className="text-cyan-400">{selectedShape}</span></p>
              <p>• Color: <span className="text-cyan-400">{selectedColor}</span></p>
              <p>• Chain: <span className="text-cyan-400">Linera Testnet</span></p>
              <p>• Status: <span className="text-green-400">Ready to Mint</span></p>
            </div>
          </div>

          {/* Mint Button */}
          <button
            onClick={handleMint}
            disabled={!isConnected || mintingStatus !== 'idle'}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold transition-all"
          >
            {mintingStatus === 'idle' && (
              <>
                <Zap className="w-5 h-5" />
                {isConnected ? 'Mint NFT' : 'Connect Wallet First'}
              </>
            )}
            {mintingStatus === 'minting' && <span className="animate-spin">⟳</span>}
            {mintingStatus === 'success' && '✓ Minted Successfully!'}
          </button>

          {/* Info */}
          <p className="text-xs text-slate-400 text-center">
            Your NFT will be minted instantly on Linera microchains
          </p>
        </div>
      </div>
    </div>
  );
}
