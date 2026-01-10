import { NextRequest, NextResponse } from 'next/server';

// In-memory NFT store (в production использовать БД)
const nfts = new Map();
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
    const nft = {
      id: nftId,
      owner: to,
      name,
      uri,
      timestamp: new Date().toISOString(),
      transactionHash: `0x${Math.random().toString(16).slice(2)}`,
    };

    nfts.set(nftId, nft);

    return NextResponse.json({
      success: true,
      nft: nft,
      message: 'NFT minted successfully',
    });
  } catch (error: any) {
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

    if (!id) {
      // Return all NFTs
      const allNfts = Array.from(nfts.values());
      return NextResponse.json({
        success: true,
        nfts: allNfts,
        totalSupply: nftCounter,
      });
    }

    // Get specific NFT
    const nft = nfts.get(parseInt(id));
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
