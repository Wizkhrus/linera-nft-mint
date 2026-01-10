WalletProvider.tsx'use client';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import React from 'react';

const evmNetworks = [
  {
    blockchainId: 'EVM_MAINNET',
    chainId: 1,
    chainName: 'Ethereum',
    rpcServer: 'https://eth.llamarpc.com',
    nativeTokenSymbol: 'ETH',
  },
];

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || '',
        walletConnectors: [EthereumWalletConnectors],
        networkBaseUrl: 'https://portal.linera.net',
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
