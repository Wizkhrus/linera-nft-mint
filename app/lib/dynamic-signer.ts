dynamic-signer.ts'use client';

import type { Signer } from '@linera/client';
import type { Wallet as DynamicWallet } from '@dynamic-labs/sdk-react-core';
import { isEthereumWallet } from '@dynamic-labs/ethereum';

export class DynamicSigner implements Signer {
  private dynamicWallet: DynamicWallet;

  constructor(dynamicWallet: DynamicWallet) {
    this.dynamicWallet = dynamicWallet;
  }

  async address(): Promise<string> {
    return this.dynamicWallet.address || '';
  }

  async containsKey(owner: string): Promise<boolean> {
    const walletAddress = this.dynamicWallet.address;
    return owner.toLowerCase() === walletAddress?.toLowerCase();
  }

  async sign(owner: string, value: Uint8Array): Promise<string> {
    if (!isEthereumWallet(this.dynamicWallet)) {
      throw new Error('Wallet is not an Ethereum wallet');
    }

    try {
      const walletClient = await this.dynamicWallet.getWalletClient();
      const msgHex = '0x' + Buffer.from(value).toString('hex');
      const address = this.dynamicWallet.address || '';

      const signature = await walletClient.request({
        method: 'personal_sign',
        params: [msgHex, address],
      });

      if (!signature) throw new Error('Failed to sign message');
      return signature;
    } catch (error: any) {
      console.error('Failed to sign message:', error);
      throw error;
    }
  }
}
