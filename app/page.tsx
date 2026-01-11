'use client';
import { useState } from 'react';
import { useWallet } from './components/WalletProvider';

const DinosaurNFTMinter = () => {
  const [dinos] = useState([
    { id: 1, name: 'T-Rex Tyrant', rarity: 'Legendary', price: '10 TOKENS' },
    { id: 2, name: 'Velociraptor Striker', rarity: 'Epic', price: '5 TOKENS' },
    { id: 3, name: 'Triceratops Guardian', rarity: 'Rare', price: '3 TOKENS' },
  ]);
  const [selectedDino, setSelectedDino] = useState<typeof dinos[0] | null>(null);
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    setIsMinting(true);
    setTimeout(() => {
      alert(`🦖 Successfully minted ${selectedDino?.name}! NFT sent to your wallet.`);
      setIsMinting(false);
      setSelectedDino(null);
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#fff', marginBottom: '10px', textShadow: '0 8px 32px rgba(0, 255, 136, 0.3)' }}>
          🦖 DINOSAUR NFT COLLECTION
        </h1>
        <p style={{ fontSize: '18px', color: '#00ff88', letterSpacing: '2px' }}>AUTHENTIC PREHISTORIC TOKENS</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Dinosaur Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          {dinos.map((dino) => (
            <div
              key={dino.id}
              onClick={() => setSelectedDino(dino)}
              style={{
                background: selectedDino?.id === dino.id 
                  ? 'linear-gradient(135deg, #00ff88 0%, #00cc6f 100%)'
                  : 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 204, 111, 0.05) 100%)',
                border: selectedDino?.id === dino.id ? '3px solid #00ff88' : '2px solid rgba(0, 255, 136, 0.3)',
                borderRadius: '20px',
                padding: '30px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: selectedDino?.id === dino.id ? 'scale(1.05)' : 'scale(1)',
                backdropFilter: 'blur(20px)',
                boxShadow: selectedDino?.id === dino.id 
                  ? '0 20px 60px rgba(0, 255, 136, 0.4)'
                  : '0 10px 40px rgba(0, 0, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (selectedDino?.id !== dino.id) {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.6)';
                  e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 255, 136, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedDino?.id !== dino.id) {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
                }
              }}
            >
              <div style={{ fontSize: '80px', marginBottom: '15px', filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.3))' }}>
                {dino.id === 1 ? '🦖' : dino.id === 2 ? '🦕' : '🦏'}
              </div>
              <h3 style={{ color: '#fff', fontSize: '22px', marginBottom: '10px', fontWeight: 'bold' }}>{dino.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ color: '#00ff88', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{dino.rarity}</span>
                <span style={{ color: '#ffaa00', fontSize: '16px', fontWeight: 'bold' }}>{dino.price}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>Click to select & mint</div>
            </div>
          ))}
        </div>

        {/* Mint Section */}
        {selectedDino && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(15, 52, 96, 0.3) 100%)',
            border: '2px solid rgba(0, 255, 136, 0.4)',
            borderRadius: '25px',
            padding: '50px',
            backdropFilter: 'blur(30px)',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 255, 136, 0.2)',
          }}>
            <h2 style={{ color: '#fff', fontSize: '32px', marginBottom: '20px', fontWeight: 'bold' }}>READY TO MINT YOUR {selectedDino.name.toUpperCase()}?</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px', marginBottom: '30px' }}>Cost: <span style={{ color: '#ffaa00', fontWeight: 'bold' }}>{selectedDino.price}</span></p>
            
            <button
              onClick={handleMint}
              disabled={isMinting}
              style={{
                background: isMinting ? 'rgba(100, 100, 100, 0.5)' : 'linear-gradient(135deg, #00ff88 0%, #00cc6f 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '15px',
                padding: '20px 60px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: isMinting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isMinting ? 'none' : '0 10px 40px rgba(0, 255, 136, 0.4)',
                transform: isMinting ? 'scale(1)' : 'scale(1)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
              onMouseEnter={(e) => {
                if (!isMinting) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 255, 136, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMinting) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 255, 136, 0.4)';
                }
              }}
            >
              {isMinting ? '⏳ MINTING...' : '🚀 MINT NOW'}
            </button>

            <button
              onClick={() => setSelectedDino(null)}
              style={{
                background: 'transparent',
                color: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                padding: '12px 30px',
                fontSize: '14px',
                cursor: 'pointer',
                marginLeft: '15px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('dinos');
  const { address, isConnected, connect } = useWallet();

  return (
    <div style={{
      minHeight: '100vh',
      background: activeTab === 'dinos' 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        : 'linear-gradient(135deg, #0f3460 0%, #16213e 50%, #1a1a2e 100%)',
      color: '#fff',
      fontFamily: '"SF Pro Display", -apple-system, system-ui, sans-serif',
    }}>
      {/* Navigation Header */}
      {activeTab !== 'dinos' && (
        <div style={{
          padding: '20px 40px',
          borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>⚡ Linera NFT Hub</h1>
          <button
            onClick={() => setActiveTab('dinos')}
            style={{
              background: 'rgba(0, 255, 136, 0.2)',
              border: '1px solid rgba(0, 255, 136, 0.4)',
              color: '#00ff88',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ← Back to Dinosaurs
          </button>
        </div>
      )}

      {/* Main Content */}
      {activeTab === 'dinos' ? (
        <DinosaurNFTMinter />
      ) : (
        <div style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', marginBottom: '30px', textAlign: 'center' }}>Coming Soon</h2>
          <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>More features coming to Linera NFT Hub</p>
        </div>
      )}
    </div>
  );
}
