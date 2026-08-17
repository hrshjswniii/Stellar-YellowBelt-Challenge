import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import WalletConnectModal from './components/WalletConnectModal.jsx';
import ContractDeployInfo from './components/ContractDeployInfo.jsx';
import AuctionCard from './components/AuctionCard.jsx';
import EventStream from './components/EventStream.jsx';
import TransactionStatus from './components/TransactionStatus.jsx';
import { submitBidTransaction, CONTRACT_ID } from './services/sorobanClient.js';
import { Sparkles, Code2, AlertCircle, Layers } from 'lucide-react';

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auction State
  const [auction, setAuction] = useState({
    itemTitle: 'Soroban Genesis NFT #001 (Stellar RiseIn)',
    itemDescription: 'Exclusive Stellar RiseIn Yellow Belt Level 2 NFT asset backed by Soroban Smart Contract events and testnet verification.',
    highestBid: 150,
    highestBidder: 'GCB3...FREIGHTER_TESTNET',
    minIncrement: 10,
    bidCount: 5,
    isEnded: false,
  });

  // Event Log Stream
  const [events, setEvents] = useState([
    {
      id: 1,
      type: 'bid',
      title: 'Bid Placed: 150 XLM',
      details: 'Bidder: GCB3...FREIGHTER_TESTNET',
      timestamp: '11:14:02 PM',
      topic: 'soroban::event::bid',
    },
    {
      id: 2,
      type: 'bid',
      title: 'Bid Placed: 120 XLM',
      details: 'Bidder: GDK...STELLAR_WEB',
      timestamp: '11:10:45 PM',
      topic: 'soroban::event::bid',
    },
    {
      id: 3,
      type: 'init',
      title: 'Contract Initialized',
      details: 'Seller: GAUCTION...ADMIN | Starting: 100 XLM',
      timestamp: '11:00:00 PM',
      topic: 'soroban::event::init',
    }
  ]);

  // Transaction Status State
  const [txState, setTxState] = useState({
    status: 'idle', // 'idle' | 'pending' | 'success' | 'error'
    hash: null,
    message: '',
    errorCode: null,
    errorReason: null,
  });

  const handlePlaceBid = async (bidAmount) => {
    setIsSubmitting(true);
    setTxState({
      status: 'pending',
      hash: null,
      message: `Executing place_bid(${bidAmount} XLM) on Soroban contract...`,
    });

    try {
      const res = await submitBidTransaction(wallet, bidAmount, auction);

      // Update Auction State
      setAuction((prev) => ({
        ...prev,
        highestBid: bidAmount,
        highestBidder: wallet.address,
        bidCount: prev.bidCount + 1,
      }));

      // Add to Event Stream
      const newEvent = {
        id: Date.now(),
        type: 'bid',
        title: `Live Bid Placed: ${bidAmount} XLM`,
        details: `Bidder: ${wallet.address.substring(0, 10)}... | Ledger #${res.ledger}`,
        timestamp: res.timestamp,
        topic: 'soroban::event::bid',
      };
      setEvents((prev) => [newEvent, ...prev]);

      // Update Tx Status
      setTxState({
        status: 'success',
        hash: res.hash,
        message: `Success! Bid of ${bidAmount} XLM confirmed on Stellar Testnet ledger #${res.ledger}.`,
      });
    } catch (err) {
      console.error('Bid transaction error:', err);
      setTxState({
        status: 'error',
        hash: err.hash || null,
        message: err.message || 'Contract transaction reverted.',
        errorCode: err.code || 500,
        errorReason: err.name || 'ContractError',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndAuction = () => {
    setAuction((prev) => ({ ...prev, isEnded: true }));
    setEvents((prev) => [
      {
        id: Date.now(),
        type: 'init',
        title: 'Auction Finalized',
        details: `Winning Bid: ${auction.highestBid} XLM | Winner: ${auction.highestBidder}`,
        timestamp: new Date().toLocaleTimeString(),
        topic: 'soroban::event::ended',
      },
      ...prev,
    ]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        wallet={wallet}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        onDisconnectWallet={() => setWallet(null)}
      />

      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '32px 24px' }}>
        {/* Deployed Contract Address Banner */}
        <ContractDeployInfo contractAddress={CONTRACT_ID} />

        {/* Main 2-Column Grid */}
        <div style={styles.grid}>
          <div>
            <AuctionCard
              auction={auction}
              wallet={wallet}
              onPlaceBid={handlePlaceBid}
              onEndAuction={handleEndAuction}
              isSubmitting={isSubmitting}
            />

            {/* Transaction Lifecycle Status Banner */}
            <TransactionStatus txState={txState} />
          </div>

          <div>
            <EventStream events={events} />
          </div>
        </div>

        {/* Error Types & Features Checklist Card */}
        <div className="glass-panel" style={{ marginTop: '32px', padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Layers size={20} color="#06b6d4" />
            <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', margin: 0 }}>
              Soroban Contract Handled Errors & Level 2 Compliance
            </h3>
          </div>
          <div style={styles.checklistGrid}>
            <div style={styles.checkItem}>
              <span style={styles.checkBadge}>ErrorCode 1</span>
              <div>
                <strong style={{ color: '#f8fafc', fontSize: '0.88rem' }}>AuctionEnded</strong>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0 }}>Prevents bids after duration or manual finalization</p>
              </div>
            </div>
            <div style={styles.checkItem}>
              <span style={styles.checkBadge}>ErrorCode 2</span>
              <div>
                <strong style={{ color: '#f8fafc', fontSize: '0.88rem' }}>BidTooLow</strong>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0 }}>Requires bid &gt;= highest_bid + min_increment</p>
              </div>
            </div>
            <div style={styles.checkItem}>
              <span style={styles.checkBadge}>ErrorCode 3</span>
              <div>
                <strong style={{ color: '#f8fafc', fontSize: '0.88rem' }}>AuctionNotEnded</strong>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0 }}>Blocks early finalization before end time</p>
              </div>
            </div>
            <div style={styles.checkItem}>
              <span style={styles.checkBadge}>ErrorCode 4</span>
              <div>
                <strong style={{ color: '#f8fafc', fontSize: '0.88rem' }}>InvalidAmount</strong>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0 }}>Rejects 0 or negative bid amounts</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Multi-Wallet Modal */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onSelectWallet={(w) => setWallet(w)}
      />
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '24px',
    alignItems: 'start',
  },
  checklistGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },
  checkItem: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '12px',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },
  checkBadge: {
    background: 'rgba(124, 58, 237, 0.2)',
    color: '#a78bfa',
    padding: '2px 6px',
    borderRadius: '6px',
    fontSize: '0.7rem',
    fontWeight: 700,
    fontFamily: 'monospace',
    flexShrink: 0,
  }
};
