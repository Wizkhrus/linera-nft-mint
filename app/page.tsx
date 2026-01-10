export default function Home() {
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
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '40px',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>Welcome</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
          <button style={{
            padding: '15px 20px',
            fontSize: '16px',
            background: '#00d4ff',
            border: 'none',
            borderRadius: '10px',
            color: '#000',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}>🎨 Mint NFT</button>
          
          <button style={{
            padding: '15px 20px',
            fontSize: '16px',
            background: '#00ff88',
            border: 'none',
            borderRadius: '10px',
            color: '#000',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>📊 Market</button>
          
          <button style={{
            padding: '15px 20px',
            fontSize: '16px',
            background: '#ff6b6b',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>🎯 Predict</button>
          
          <button style={{
            padding: '15px 20px',
            fontSize: '16px',
            background: '#ffa500',
            border: 'none',
            borderRadius: '10px',
            color: '#000',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>🎮 Create</button>
        </div>
        
        <p style={{ fontSize: '14px', opacity: 0.8 }}>Coming soon: Real-time trading, predictions, and custom NFT creation</p>
      </div>
    </div>
  );
}
