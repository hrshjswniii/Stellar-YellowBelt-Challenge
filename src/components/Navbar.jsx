import React from 'react';
import { Gavel, Wallet, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';

export default function Navbar({ wallet, onOpenWalletModal, onDisconnectWallet }) {
  return (
    <header style={styles.header}>
      <div style={styles.navContainer}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={styles.logoBadge}>
            <Gavel size={22} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.25rem', color: '#f8fafc', margin: 0, fontWeight: 700 }}>
                Stellar Live Auction
              </h1>
              <span className="badge badge-live" style={{ fontSize: '0.68rem' }}>
                LEVEL 2
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
              Soroban Smart Contract Real-Time Bidding
            </p>
          </div>
        </div>

        {/* Right Action / Wallet Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="https://stellar.expert/explorer/testnet"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ fontSize: '0.82rem', padding: '8px 14px' }}
          >
            <span>Stellar Explorer</span>
            <ExternalLink size={14} />
          </a>

          {wallet ? (
            <div style={styles.connectedPill} onClick={onDisconnectWallet} title="Click to disconnect">
              <div style={styles.dotOnline} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc' }}>
                  {wallet.provider}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'monospace' }}>
                  {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                </div>
              </div>
            </div>
          ) : (
            <button onClick={onOpenWalletModal} className="btn-primary">
              <Wallet size={18} />
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    background: 'rgba(9, 13, 22, 0.75)',
    backdropFilter: 'blur(16px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
  },
  logoBadge: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
  },
  connectedPill: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(6, 182, 212, 0.4)',
    borderRadius: '12px',
    padding: '6px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  dotOnline: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    boxShadow: '0 0 8px #10b981',
  }
};
