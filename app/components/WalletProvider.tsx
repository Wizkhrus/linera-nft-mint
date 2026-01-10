'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkWallet = () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum
          .request({ method: 'eth_accounts' })
          .then((accounts: unknown) => {
            if (Array.isArray(accounts) && accounts.length > 0) {
              setAddress(String(accounts[0]));
              setIsConnected(true);
            }
          })
          .catch(() => {
            setIsConnected(false);
          });
      }
    };

    checkWallet();
  }, []);

  const connect = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (Array.isArray(accounts) && accounts.length > 0) {
          setAddress(String(accounts[0]));
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider value={{ address, isConnected, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
