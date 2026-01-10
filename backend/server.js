const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database for tracking NFTs (в production используй БД)
const nfts = new Map();
let nftCounter = 0;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Linera NFT Backend is running' });
});

// Mint NFT endpoint
app.post('/api/mint', async (req, res) => {
  try {
    const { to, name, uri } = req.body;

    // Validation
    if (!to || !name || !uri) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, name, uri'
      });
    }

    // Create NFT
    const nftId = nftCounter++;
    const nft = {
      id: nftId,
      owner: to,
      name,
      uri,
      timestamp: new Date().toISOString(),
      transactionHash: `0x${Math.random().toString(16).slice(2)}` // Mock TX hash
    };

    nfts.set(nftId, nft);

    // В реальной системе здесь был бы вызов к Linera контракту
    // const response = await callLineroContract('MintNft', { to, name, uri });

    res.json({
      success: true,
      nft: nft,
      message: 'NFT minted successfully'
    });
  } catch (error) {
    console.error('Mint error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get NFT by ID
app.get('/api/nft/:id', (req, res) => {
  try {
    const { id } = req.params;
    const nft = nfts.get(parseInt(id));

    if (!nft) {
      return res.status(404).json({
        success: false,
        error: 'NFT not found'
      });
    }

    res.json({
      success: true,
      nft: nft
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get total supply
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    totalSupply: nftCounter,
    totalMinted: nfts.size
  });
});

// Get all NFTs
app.get('/api/nfts', (req, res) => {
  const allNfts = Array.from(nfts.values());
  res.json({
    success: true,
    nfts: allNfts,
    count: allNfts.length
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Linera NFT Backend running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`  POST   /api/mint         - Mint new NFT`);
  console.log(`  GET    /api/nft/:id      - Get NFT by ID`);
  console.log(`  GET    /api/nfts         - Get all NFTs`);
  console.log(`  GET    /api/stats        - Get statistics`);
  console.log(`  GET    /health           - Health check\n`);
});

module.exports = app;
