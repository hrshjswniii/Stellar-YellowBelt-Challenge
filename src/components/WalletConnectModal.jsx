import React from 'react';
import { WALLET_PROVIDERS, connectWalletProvider } from '../services/stellar';
import { X, Wallet, ShieldCheck, ExternalLink, ChevronRight } from 'lucide-react';

export default function WalletConnectModal({ isOpen, onClose, onSelectWallet }) {
  if (!isOpen) return null;

  const handleSelect = async (providerId) => {
    try {
      const wallet = await connectWalletProvider(providerId);
      onSelectWallet(wallet);
      onClose();
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} className="glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={styles.iconBadge}>
              <Wallet size={20} color="#7c3aed" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', margin: 0 }}>Connect Wallet</h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>
                Select a Stellar / Soroban compatible wallet
              </p>
            </div>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {WALLET_PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                style={styles.providerCard}
                onClick={() => handleSelect(provider.id)}
                className="btn-outline"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '1.6rem' }}>{provider.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.98rem' }}>
                      {provider.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                      {provider.description}
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} color="#64748b" />
              </button>
            ))}
          </div>

          <div style={styles.footerInfo}>
            <ShieldCheck size={16} color="#10b981" />
            <span>Connected to Stellar Testnet (Soroban Smart Contract)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(5, 8, 16, 0.82)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    width: '100%',
    maxWidth: '460px',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.12)',
  },
  header: {
    padding: '20px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255, 255, 255, 0.02)',
  },
  iconBadge: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'rgba(124, 58, 237, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(124, 58, 237, 0.3)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  providerCard: {
    width: '100%',
    padding: '14px 18px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    cursor: 'pointer',
  },
  footerInfo: {
    marginTop: '20px',
    padding: '12px',
    borderRadius: '10px',
    background: 'rgba(16, 185, 129, 0.08)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.8rem',
    color: '#6ee7b7',
  }
};
