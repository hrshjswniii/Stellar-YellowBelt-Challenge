import React, { useState, useEffect } from 'react';
import { Gavel, Clock, TrendingUp, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AuctionCard({
  auction,
  wallet,
  onPlaceBid,
  onEndAuction,
  isSubmitting
}) {
  const [bidInput, setBidInput] = useState('');
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });
  const [validationError, setValidationError] = useState('');

  // Live timer calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minRequiredBid = auction.highestBid + auction.minIncrement;

  const handleBidSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    const numericBid = parseFloat(bidInput);
    if (!wallet) {
      setValidationError('Please connect a Stellar wallet first!');
      return;
    }

    if (isNaN(numericBid) || numericBid <= 0) {
      setValidationError('Error Code 4: Invalid Amount. Bid must be greater than 0.');
      return;
    }

    if (numericBid < minRequiredBid) {
      setValidationError(
        `Error Code 2: Bid Too Low. Minimum allowed bid is ${minRequiredBid} XLM (Current Highest: ${auction.highestBid} + Min Increment: ${auction.minIncrement} XLM).`
      );
      return;
    }

    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      setValidationError('Error Code 1: Auction Ended. Bidding is closed.');
      return;
    }

    onPlaceBid(numericBid);
    setBidInput('');
  };

  const isAuctionOver = timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="glass-panel" style={{ padding: '28px', borderRadius: '24px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span className={`badge ${isAuctionOver ? 'badge-testnet' : 'badge-live'}`}>
          <span className="pulsing-dot" />
          {isAuctionOver ? 'AUCTION FINALISED' : 'LIVE SOROBAN AUCTION'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#94a3b8' }}>
          <Clock size={16} color="#06b6d4" />
          <span>Ends in: </span>
          <strong style={{ color: '#f8fafc', fontFamily: 'Space Grotesk' }}>
            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </strong>
        </div>
      </div>

      {/* Item Title & Details */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.6rem', color: '#f8fafc', marginBottom: '8px' }}>
          {auction.itemTitle}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.5' }}>
          {auction.itemDescription}
        </p>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Highest Bid</span>
          <div style={styles.statValue}>
            {auction.highestBid} <span style={{ fontSize: '0.9rem', color: '#7c3aed' }}>XLM</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            Min Next: {minRequiredBid} XLM
          </span>
        </div>

        <div style={styles.statBox}>
          <span style={styles.statLabel}>Highest Bidder</span>
          <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#06b6d4', wordBreak: 'break-all' }}>
            {auction.highestBidder ? `${auction.highestBidder.substring(0, 8)}...` : 'None yet'}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
            {auction.bidCount} total bids placed
          </span>
        </div>
      </div>

      {/* Bid Input Form */}
      <form onSubmit={handleBidSubmit} style={{ marginTop: '24px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 500 }}>
            Enter Bid Amount (XLM)
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="number"
              step="1"
              className="glass-input"
              placeholder={`Min ${minRequiredBid} XLM`}
              value={bidInput}
              onChange={(e) => setBidInput(e.target.value)}
              disabled={isSubmitting || isAuctionOver}
            />
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || isAuctionOver}
              style={{ minWidth: '130px' }}
            >
              <Gavel size={18} />
              {isSubmitting ? 'Bidding...' : 'Place Bid'}
            </button>
          </div>
        </div>

        {/* Local Validation Error Notice */}
        {validationError && (
          <div style={styles.errorNotice} className="animate-fade-in">
            <ShieldAlert size={18} color="#ef4444" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.82rem', color: '#fca5a5' }}>{validationError}</span>
          </div>
        )}
      </form>

      {/* Admin Action: End Auction */}
      {isAuctionOver && !auction.isEnded && (
        <button
          onClick={onEndAuction}
          className="btn-outline"
          style={{ width: '100%', marginTop: '16px', justifyContent: 'center', borderColor: '#f59e0b', color: '#f59e0b' }}
        >
          Finalize & Transfer Highest Bid
        </button>
      )}
    </div>
  );
}

const styles = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '20px',
  },
  statBox: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  statLabel: {
    fontSize: '0.78rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '6px',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#f8fafc',
    fontFamily: 'Space Grotesk',
  },
  errorNotice: {
    marginTop: '12px',
    padding: '12px 14px',
    borderRadius: '12px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }
};
