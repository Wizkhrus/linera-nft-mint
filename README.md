# Linera NFT Hub - Real-Time NFT Ecosystem

🚀 **Real-Time NFT Trading, Prediction Markets, and Interactive Creator on Linera Microchains**

## 🎯 Features

### 1. **Real-Time NFT Market** 💰
- Live auction system with real-time price updates
- Place bids on NFTs powered by Linera microchains
- Instant settlement and transaction finality
- Live price feed showing market movements every 2 seconds
- Browse available NFTs with detailed information

### 2. **Prediction Market** 🎯
- Bet on cryptocurrency and NFT predictions
- Real-time odds updates
- Calculate potential winnings instantly
- Multiple prediction categories (Crypto, Tech, Markets, NFT)
- Live volume tracking

### 3. **Interactive NFT Creator** 🎨
- Design custom NFTs with real-time preview
- Choose from 5 colors and 5 shapes
- Customize NFT name and metadata
- Mint NFTs instantly to Linera testnet
- Real-time minting feedback

### 4. **Basic NFT Minting** ✨
- One-click free NFT minting
- Wallet integration
- Transaction tracking with Linera explorer links

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│        Frontend (Next.js + React)           │
│  - Modern Tailwind CSS UI                   │
│  - Real-time state management               │
│  - Responsive design                        │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│     API Layer (Next.js API Routes)          │
│  - /api/mint - NFT minting                  │
│  - Real-time data processing                │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│   Linera Blockchain & Microchains           │
│  - Instant transaction finality              │
│  - Real-time state updates                   │
│  - Microchain-based NFT ownership            │
└─────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS 3.3, PostCSS
- **Components**: Custom React components, Lucide React icons
- **Blockchain**: Linera SDK (testnet integration)
- **Deployment**: Vercel
- **State Management**: React hooks (useState, useEffect, useContext)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Linera wallet (for testnet)

### Development

```bash
# Clone repository
git clone https://github.com/Wizkhrus/linera-nft-mint.git
cd linera-nft-mint

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🚀 Deployment on Vercel

The application is automatically deployed to Vercel on each push to main:

**Live URL**: https://linera-nft-mint.vercel.app

1. Connect your GitHub repo to Vercel
2. Vercel will automatically build and deploy on push
3. Environment variables are configured in Vercel dashboard
4. Each deployment gets a unique preview URL

## 🔗 Linera Integration

### Testnet Configuration
The application connects to Linera Testnet Conway:
- **Network**: Linera Testnet Conway
- **Chain ID**: Configurable via environment variables
- **RPC Endpoint**: Community RPC nodes

### Smart Contracts
- NFT contract: Handles minting and ownership
- Market contract: Manages auction bids and settlements
- Prediction contract: Tracks bets and payouts

## 📊 API Endpoints

### POST /api/mint
Mints an NFT to the user's wallet

**Request**:
```json
{
  "name": "My Linera NFT",
  "to": "0x...",
  "uri": "ipfs://...",
  "color": "#FF6B6B"
}
```

**Response**:
```json
{
  "success": true,
  "transactionHash": "0x...",
  "explorerLink": "https://explorer.linera.io/tx/0x...",
  "owner": "0x..."
}
```

## 🎮 Usage Guide

### Mint NFT
1. Connect your Linera wallet
2. Go to **Mint** tab
3. Click "Mint Free NFT"
4. Confirm in your wallet
5. Track transaction on explorer

### Trade in Market
1. Go to **Market** tab
2. Browse available NFTs
3. Click "Place Bid" on desired NFT
4. Enter bid amount
5. Confirm transaction

### Make Predictions
1. Go to **Predict** tab
2. Choose prediction (YES or NO)
3. Enter bet amount
4. View potential winnings
5. Confirm bet

### Create Custom NFT
1. Go to **Create** tab
2. Select color and shape
3. Name your NFT
4. Preview in real-time
5. Mint to blockchain

## 📈 Real-Time Features

- **Live Price Updates**: Market prices refresh every 2 seconds
- **Live Odds**: Prediction market odds update in real-time
- **Instant Feedback**: UI responds immediately to user actions
- **WebSocket Integration**: Real-time data streaming
- **Responsive Design**: Works on mobile, tablet, desktop

## 🔐 Security

- Only unsigned transactions (user signs in wallet)
- No private keys stored on server
- CORS enabled for legitimate requests
- Rate limiting on API endpoints
- Environment variables for sensitive data

## 📝 License

MIT License - Free to use and modify

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

- GitHub Issues: [Report bugs](https://github.com/Wizkhrus/linera-nft-mint/issues)
- Discord: [Linera Community](https://discord.gg/linera)
- Twitter: [@linera_io](https://twitter.com/linera_io)

## 🎓 Learn More

- [Linera Documentation](https://linera.dev)
- [Linera GitHub](https://github.com/linera-io/linera-protocol)
- [Buildathon Info](https://app.akindo.io/wave-hacks/X4ZV12Z6GSMEkmOkX)

---

**Built with ⚡ for the Linera Buildathon Wave 5**


---

**⚡ Status**: Deployed with 4-tab UI interface (Mint, Market, Predict, Create)
**Version**: 2.0
**Last Updated**: Jan 11, 2026
