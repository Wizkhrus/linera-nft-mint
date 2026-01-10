'use client';

import { useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function MintComponent() {
  const { user, setShowAuthFlow } = useDynamicContext();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');

  const handleConnect = () => {
    setShowAuthFlow(true);
  };

  const handleMint = async () => {
    if (!user?.address) {
      setMessage('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setMessage('Minting NFT...');

    try {
      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: user.address }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Minting failed');
      }

      setMessage(`NFT minted successfully!`);
      setTxHash(data.transactionHash);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    // Dynamic handles disconnect via context
    setMessage('');
    setTxHash('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Linera NFT Mint</h1>
        <p className="text-gray-600 mb-8">Free NFT minting on the Linera blockchain</p>

        <div className="space-y-4">
          {!user ? (
            <button
              onClick={handleConnect}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Connect Wallet
            </button>
          ) : (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Connected Wallet:</p>
                <p className="font-mono text-sm break-all text-indigo-600">
                  {user.address}
                </p>
              </div>

              <button
                onClick={handleMint}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {loading ? 'Minting...' : 'Mint Free NFT'}
              </button>

              {message && (
                <div className={`p-4 rounded-lg ${
                  message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {message}
                </div>
              )}

              {txHash && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Transaction Hash:</p>
                  <p className="font-mono text-sm break-all text-blue-600">{txHash}</p>
                </div>
              )}

              <button
                onClick={handleDisconnect}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Disconnect
              </button>
            </>
          )}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">How it works:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
            <li>Connect your Ethereum wallet using Dynamic</li>
            <li>Click "Mint Free NFT" to create an NFT on Linera</li>
            <li>The NFT will be minted to your connected wallet address</li>
            <li>View your transaction hash to verify on the Linera explorer</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
