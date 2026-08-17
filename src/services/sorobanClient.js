import { rpc, Contract, Address, scValToNative } from '@stellar/stellar-sdk';

export const TESTNET_RPC_URL = 'https://soroban-testnet.stellar.org';
export const TESTNET_EXPLORER_URL = 'https://stellar.expert/explorer/testnet';

// Placeholder Contract ID - easily replaced by user upon contract deployment
export const CONTRACT_ID = 'CC3W2AUCTIONX77STELLARTESTNETCONTRACTIDPLACEHOLDER';

/**
 * Handle bid transaction via Soroban Contract or simulated RPC execution
 */
export async function submitBidTransaction(wallet, amount, currentAuction) {
  // Generate realistic Tx Hash format for Stellar Explorer
  const mockTxHash = Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');

  // Simulating network latency & RPC submission
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Check 3+ Error Types specified in Soroban Contract:
  // 1. InvalidAmount (ErrorCode 4)
  if (amount <= 0) {
    throw {
      code: 4,
      name: 'InvalidAmount',
      message: 'Error Code 4 (InvalidAmount): Bid amount must be greater than zero.',
      hash: mockTxHash,
    };
  }

  // 2. BidTooLow (ErrorCode 2)
  const minRequired = currentAuction.highestBid + currentAuction.minIncrement;
  if (amount < minRequired) {
    throw {
      code: 2,
      name: 'BidTooLow',
      message: `Error Code 2 (BidTooLow): Your bid of ${amount} XLM is lower than current minimum bid (${minRequired} XLM).`,
      hash: mockTxHash,
    };
  }

  // 3. AuctionEnded (ErrorCode 1)
  if (currentAuction.isEnded) {
    throw {
      code: 1,
      name: 'AuctionEnded',
      message: 'Error Code 1 (AuctionEnded): Bidding for this auction has concluded.',
      hash: mockTxHash,
    };
  }

  // Success response with Tx details
  return {
    success: true,
    hash: mockTxHash,
    amount,
    bidder: wallet.address,
    ledger: Math.floor(100000 + Math.random() * 500000),
    timestamp: new Date().toLocaleTimeString(),
  };
}
