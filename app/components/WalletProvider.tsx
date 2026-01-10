'use client';

import React from 'react';

interface WalletContextType {
  connected: boolean;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = React.createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = React.useState(false);
  const [address, setAddress] = React.useState<string | null>(null);

  const connect = async () => {
    try {
      // Check if Dynamic SDK is available
      const dynamicEnvId = process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID;
      
      if (!dynamicEnvId) {
        // Fallback: Use demo mode or request MetaMask
        if (typeof window !== 'undefined' && (window as any).ethereum) {
          const accounts = await (window as any).ethereum.request({
            method: 'eth_requestAccounts',
          });
          setAddress(accounts[0]);
          setConnected(true);
        } else {
          // Demo mode
          setAddress('0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''));
          setConnected(true);
        }
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const disconnect = () => {
    setConnected(false);
    setAddress(null);
  };

  return (
    <WalletContext.Provider value={{ connected, address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = React.useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}
