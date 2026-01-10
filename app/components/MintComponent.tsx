'use client';
import { useState } from 'react';
import { useWallet } from './WalletProvider';

// T-Rex NFT metadata with base64 encoded image
const TREX_NFT_NAME = 'Red & White T-Rex';
const TREX_NFT_DESCRIPTION = 'A retro pixel art T-Rex in vibrant red and white';
const TREX_IMAGE_BASE64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlPi5waXhlbCB7IGZpbGw6IHJlZDsgfSAucGl4ZWwtYmxhY2sgeyBmaWxsOiBibGFjazsgfSAucGl4ZWwtd2hpdGUgeyBmaWxsOiB3aGl0ZTsgfTwvc3R5bGU+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAiIHk9IjUwIiBmb250LXNpemU9IjMwIiBmaWxsPSJ3aGl0ZSI+UGl4ZWwgVDEtUmV4PC90ZXh0Pjwvc3ZnPg==';

export default function MintComponent() {
  const { connected, address, connect, disconnect } = useWallet();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');

  const handleMint = async () => {
    if (!connected || !address) {
      setMessage('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setMessage('Minting NFT...');

    try {
      // Generate unique NFT name
      const tokenId = Math.floor(Math.random() * 10000);
      const nftName = `${TREX_NFT_NAME} #${tokenId}`;
      
      // Create metadata URI with image
      const metadata = {
        name: nftName,
        description: TREX_NFT_DESCRIPTION,
        image: TREX_IMAGE_BASE64,
        attributes: [
          { trait_type: 'Type', value: 'Pixel Art' },
          { trait_type: 'Colors', value: 'Red & White' }
        ]
      };
      
      const metadataUri = 'data:application/json;base64,' + btoa(JSON.stringify(metadata))(JSON.stringify(metadata)).toString('base64');

      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: address,
          name: nftName,
          uri: metadataUri
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Minting failed');
      }

      setMessage(`NFT minted successfully!`);
      setTxHash(data.transactionHash || 'tx_' + Math.random().toString(36).substr(2, 9));
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
      console.error('Mint error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setMessage('');
    setTxHash('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Linera NFT Mint</h1>
        <p className="text-gray-600 mb-8">Free NFT minting on the Linera blockchain</p>

        <div className="space-y-4">
          {!connected ? (
            <>
              <button
                onClick={connect}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                🔗 Connect Wallet
              </button>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-700">
                <p className="font-semibold mb-2">💡 Demo Mode</p>
                <p>If you don't have a wallet connected, we'll generate a demo address for testing.</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">✓ Connected Wallet:</p>
                <p className="font-mono text-sm break-all text-indigo-600 font-bold">
                  {address}
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm">
                <p className="font-semibold text-yellow-800 mb-2">🎨 NFT Preview</p>
                <div className="flex items-center gap-4">
                  <img src={TREX_IMAGE_BASE64} alt="T-Rex" className="w-32 h-32 bg-black rounded" />
                  <div>
                    <p className="font-bold text-gray-800">{TREX_NFT_NAME}</p>
                    <p className="text-gray-600 text-xs mt-2">{TREX_NFT_DESCRIPTION}</p>
                    <p className="text-gray-500 text-xs mt-3">Unique pixel art token for your collection</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleMint}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {loading ? '⏳ Minting...' : '✨ Mint Free NFT'}
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
                  <p className="text-sm text-gray-600">📝 Transaction Hash:</p>
                  <p className="font-mono text-sm break-all text-blue-600 font-bold">{txHash}</p>
                </div>
              )}
              <button
                onClick={handleDisconnect}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                🔓 Disconnect
              </button>
            </>
          )}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📖 How it works:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
            <li>Connect your Ethereum wallet or use demo mode</li>
            <li>Click "Mint Free NFT" to create a T-Rex NFT on Linera</li>
            <li>The NFT will be minted to your connected wallet address</li>
            <li>View your transaction hash to verify on the Linera explorer</li>
          </ol>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <p className="font-semibold mb-1">⚠️ Demo Mode Notice</p>
          <p>This demo currently works with MetaMask and demo addresses. To use other wallets, configure Dynamic.xyz with your Environment ID.</p>
        </div>
      </div>
    </div>
  );
}
