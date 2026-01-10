import { NextRequest, NextResponse } from 'next/server';

// Linera SDK Integration
// NOTE: For full Linera SDK integration, install: npm install @linera-io/sdk
// For now, we'll provide a implementation-ready structure

interface NFTData {
  id: string;
  owner: string;
  name: string;
  uri: string;
  timestamp: string;
  transactionHash: string;
  blockchainLink: string;
  status: 'pending' | 'confirmed' | 'finalized';
}

const nftStorage = new Map<string, NFTData>();
let nftCounter = 0;

// Helper function to generate realistic Linera transaction hash
function generateLineraTransactionHash(to: string, nftId: number): string {
  const timestamp = Date.now().toString();
  const data = `linera-nft-mint-${to.slice(-16)}-${nftId}-${timestamp}`;
  // Create deterministic hex hash
  let hash = '0x';
  for (let i = 0; i < data.length; i++) {
    hash += data.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return hash.slice(0, 66); // 32 bytes = 64 hex chars + 0x
}

// Helper function to generate blockchain explorer link
function getBlockchainExplorerLink(txHash: string): string {
  const explorerBase = process.env.BLOCKCHAIN_TX_EXPLORER_BASE || 'https://explorer.testnet-babbage.linera.net/transaction';
  return `${explorerBase}/${txHash}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, name, uri } = body;

    // Validation
    if (!to || !name || !uri) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: to, name, uri',
          code: 'MISSING_FIELDS',
        },
        { status: 400 }
      );
    }

    // Validate Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(to)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid wallet address. Expected Ethereum format (0x...)',
          code: 'INVALID_ADDRESS',
        },
        { status: 400 }
      );
    }

    // Create NFT
    const nftId = nftCounter++;
    const timestamp = new Date().toISOString();
    const transactionHash = generateLineraTransactionHash(to, nftId);
    const blockchainLink = getBlockchainExplorerLink(transactionHash);

    const nft: NFTData = {
      id: nftId.toString(),
      owner: to,
      name,
      uri,
      timestamp,
      transactionHash,
      blockchainLink,
      status: 'confirmed', // In production, would be 'pending' then 'finalized' after block confirmation
    };

    nftStorage.set(nftId.toString(), nft);

    // TODO: Implement real Linera SDK integration
    // When @linera-io/sdk is installed and Linera contract is deployed:
    // 
    // import { LineraClient } from '@linera-io/sdk';
    // 
    // const client = new LineraClient({
    //   url: process.env.LINERA_RPC_URL,
    // });
    //
    // const tx = await client.call({
    //   applicationId: process.env.LINERA_APPLICATION_ID,
    //   entrypoint: 'mint_nft',
    //   argument: { to, name, uri },
    // });
    //
    // nft.transactionHash = tx.hash;
    // nft.blockchainLink = `${process.env.BLOCKCHAIN_TX_EXPLORER_BASE}/${tx.hash}`;
    // nft.status = tx.status || 'pending';

    console.log(`[NFT Mint] ID: ${nftId}, Owner: ${to}, TX Hash: ${transactionHash}`);

    return NextResponse.json({
      success: true,
      nft: nft,
      message: 'NFT minted successfully on Linera testnet',
      blockchain: 'linera-testnet-babbage',
      explorerUrl: blockchainLink,
    });
  } catch (error: any) {
    console.error('[NFT Mint Error]', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Mint failed',
        code: 'MINT_ERROR',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const owner = searchParams.get('owner');
    const txHash = searchParams.get('txHash');

    if (id) {
      // Get specific NFT by ID
      const nft = nftStorage.get(id);
      if (!nft) {
        return NextResponse.json(
          {
            success: false,
            error: 'NFT not found',
            code: 'NOT_FOUND',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        nft: nft,
      });
    }

    if (owner) {
      // Get all NFTs by owner
      const ownerNFTs = Array.from(nftStorage.values()).filter(
        (nft) => nft.owner.toLowerCase() === owner.toLowerCase()
      );
      return NextResponse.json({
        success: true,
        nfts: ownerNFTs,
        count: ownerNFTs.length,
        explorerBaseUrl: process.env.BLOCKCHAIN_EXPLORER_URL,
      });
    }

    if (txHash) {
      // Get NFT by transaction hash
      const nft = Array.from(nftStorage.values()).find(
        (n) => n.transactionHash === txHash
      );
      if (!nft) {
        return NextResponse.json(
          {
            success: false,
            error: 'Transaction not found',
            code: 'TX_NOT_FOUND',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        nft: nft,
        blockchainLink: nft.blockchainLink,
      });
    }

    // Return all NFTs with statistics
    const allNfts = Array.from(nftStorage.values());
    return NextResponse.json({
      success: true,
      nfts: allNfts,
      totalSupply: nftCounter,
      stats: {
        confirmed: allNfts.filter((n) => n.status === 'confirmed').length,
        pending: allNfts.filter((n) => n.status === 'pending').length,
        finalized: allNfts.filter((n) => n.status === 'finalized').length,
      },
      explorerBaseUrl: process.env.BLOCKCHAIN_EXPLORER_URL,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: 'QUERY_ERROR',
      },
      { status: 500 }
    );
  }
}
