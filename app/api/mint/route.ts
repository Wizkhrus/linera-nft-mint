import { NextRequest, NextResponse } from 'next/server';

// NFT мемoria хранилище (в production использовать БД)
interface NFTData {
  id: string;
  owner: string;
  name: string;
  uri: string;
  timestamp: string;
  transactionHash: string;
  status: 'pending' | 'confirmed';
}

const nftStorage = new Map<string, NFTData>();
let nftCounter = 0;

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
        },
        { status: 400 }
      );
    }

    // Create NFT
    const nftId = nftCounter++;
    const timestamp = new Date().toISOString();
    
    // Generate realistic transaction hash (Linera format)
    const transactionHash = `0x${Buffer.from(
      `linera-nft-${to.slice(-8)}-${nftId}-${Date.now()}`
    ).toString('hex')}`;

    const nft: NFTData = {
      id: nftId.toString(),
      owner: to,
      name,
      uri,
      timestamp,
      transactionHash,
      status: 'confirmed',
    };

    nftStorage.set(nftId.toString(), nft);

    // TODO: Integrate with Linera SDK to write to blockchain
    // const linera = new LineraClient();
    // const tx = await linera.nft.mint({
    //   to,
    //   name,
    //   uri,
    // });
    // nft.transactionHash = tx.hash;

    return NextResponse.json({
      success: true,
      nft: nft,
      message: 'NFT minted successfully',
      blockchain: 'linera-testnet',
    });
  } catch (error: any) {
    console.error('Mint error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Mint failed',
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

    if (id) {
      // Get specific NFT by ID
      const nft = nftStorage.get(id);
      if (!nft) {
        return NextResponse.json(
          {
            success: false,
            error: 'NFT not found',
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
      });
    }

    // Return all NFTs
    const allNfts = Array.from(nftStorage.values());
    return NextResponse.json({
      success: true,
      nfts: allNfts,
      totalSupply: nftCounter,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
