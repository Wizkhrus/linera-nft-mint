'use client';

import { useState } from 'react';

export default function MintComponent() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const connectWallet = async () => {
    try {
      setError('');
      // Dynamic SDK or wallet connect logic
      // This is placeholder - integrate with actual Linera wallet
      setConnected(true);
      setAddress('0x...example');
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    }
  };

  const mintNFT = async () => {
    if (!connected) {
      setError('Please connect wallet first');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Call Linera smart contract mint function
      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      
      const data = await response.json();
      if (data.success) {
        setTxHash(data.txHash);
      } else {
        setError(data.error || 'Mint failed');
      }
    } catch (err: any) {
      setError(err.message || 'Mint error occurred');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setAddress('');
    setTxHash('');
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-700 rounded-lg p-8 shadow-xl">
        {!connected ? (
          <button
            onClick={connectWallet}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="mb-6 p-4 bg-slate-600 rounded text-white">
              <p className="text-sm text-gray-300">Connected Address</p>
              <p className="font-mono text-lg break-all">{address}</p>
            </div>
            
            {!txHash ? (
              <button
                onClick={mintNFT}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {loading ? 'Minting...' : 'Mint Free NFT'}
              </button>
            ) : (
              <div className="p-4 bg-green-900 rounded text-green-100 mb-4">
                <p className="font-semibold">✓ NFT Minted Successfully!</p>
                <p className="text-sm font-mono mt-2">TX: {txHash}</p>
              </div>
            )}
            
            <button
              onClick={disconnectWallet}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Disconnect
            </button>
          </>
        )}
        
        {error && (
          <div className="mt-4 p-4 bg-red-900 rounded text-red-100">
            <p className="text-sm">Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
