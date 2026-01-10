'use client';
import { useState } from 'react';
import { useWallet } from './components/WalletProvider';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { address, isConnected, connect } = useWallet();

  const handleMint = () => {
    if (!isConnected) {
      connect();
      return;
    }
    setActiveTab('mint');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'mint':
        return (
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>🎨 Mint NFT</h2>
            <p style={{ marginBottom: '20px' }}>Connected Wallet: {address?.substring(0, 10)}...</p>
            <input
              type="text"
              placeholder="NFT Name"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: 'none'
              }}
            />
            <textarea
              placeholder="NFT Description"
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: 'none',
                minHeight: '80px'
              }}
            />
            <button
              onClick={() => alert('NFT minting on Linera blockchain coming soon!')}
              style={{
                width: '100%',
                padding: '12px',
                background: '#00d4ff',
                border: 'none',
                borderRadius: '5px',
                color: '#000',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Mint NFT
            </button>
          </div>
        );
      case 'market':
        return (
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>📊 Market</h2>
            <p>NFT Marketplace coming soon!</p>
            <p style={{ marginTop: '20px', opacity: 0.8 }}>Browse and trade NFTs on Linera blockchain</p>
          </div>
        );
      case 'predict':
        return (
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>🎯 Predict</h2>
            <p>Prediction Markets coming soon!</p>
            <p style={{ marginTop: '20px', opacity: 0.8 }}>Predict NFT trends and earn rewards</p>
          </div>
        );
      case 'create':
        return (
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>🎮 Create</h2>
            <p>Custom NFT Creation coming soon!</p>
            <p style={{ marginTop: '20px', opacity: 0.8 }}>Create your own NFT collections</p>
          </div>
        );
      default:
        return (
          <div>
            <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>Welcome</h2>
            {isConnected ? (
              <p style={{ marginBottom: '20px', color: '#00ff88' }}>✓ Wallet Connected: {address?.substring(0, 10)}...</p>
            ) : (
              <p style={{ marginBottom: '20px', color: '#ffaa00' }}>⚠ Please connect your wallet to continue</p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
              <button
                onClick={handleMint}
                style={{
                  padding: '15px 20px',
                  fontSize: '16px',
                  background: '#00d4ff',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#000',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                🎨 Mint NFT
              </button>
              <button
                onClick={() => setActiveTab('market')}
                style={{
                  padding: '15px 20px',
                  fontSize: '16px',
                  background: '#00ff88',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#000',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                📊 Market
              </button>
              <button
                onClick={() => setActiveTab('predict')}
                style={{
                  padding: '15px 20px',
                  fontSize: '16px',
                  background: '#ff6b6b',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                🎯 Predict
              </button>
              <button
                onClick={() => setActiveTab('create')}
                style={{
                  padding: '15px 20px',
                  fontSize: '16px',
                  background: '#ffa500',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#000',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                🎮 Create
              </button>
            </div>
            <p style={{ fontSize: '14px', opacity: 0.8 }}>Coming soon: Real-time trading, predictions, and custom NFT creation</p>
          </div>
        );
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>⚡ Linera NFT Hub</h1>
      <p style={{ fontSize: '24px', marginBottom: '40px' }}>Real-Time NFT Ecosystem</p>

      {isConnected && activeTab !== 'home' && (
        <button
          onClick={() => setActiveTab('home')}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ← Back to Home
        </button>
      )}

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '40px',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%'
      }}>
        {renderContent()}
      </div>
    </div>
  );
}
