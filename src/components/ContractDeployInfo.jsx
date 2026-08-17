import React from 'react';
import { Cpu, Copy, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ContractDeployInfo({ contractAddress }) {
  const displayAddress = contractAddress || 'C...YOUR_DEPLOYED_TESTNET_CONTRACT_ADDRESS_PLACEHOLDER';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayAddress);
    alert('Contract address copied to clipboard!');
  };

  return (
    <div className="glass-panel" style={{ padding: '20px 24px', borderRadius: '20px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={styles.iconBox}>
            <Cpu size={20} color="#7c3aed" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h4 style={{ fontSize: '0.98rem', color: '#f8fafc', margin: 0 }}>Deployed Soroban Contract</h4>
              <span className="badge badge-testnet">STELLAR TESTNET</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
              Real-time Auction Smart Contract (WASMs)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <code style={styles.addressCode}>
            {displayAddress.length > 28 ? `${displayAddress.substring(0, 16)}...${displayAddress.substring(displayAddress.length - 8)}` : displayAddress}
          </code>
          <button style={styles.iconBtn} onClick={copyToClipboard} title="Copy Address">
            <Copy size={16} color="#94a3b8" />
          </button>
          <a
            href={`https://stellar.expert/explorer/testnet/contract/${displayAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconBtn}
            title="View on Stellar Explorer"
          >
            <ExternalLink size={16} color="#06b6d4" />
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  iconBox: {
    width: '38px',
    height: '38px',
    borderRadius: '12px',
    background: 'rgba(124, 58, 237, 0.15)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressCode: {
    fontFamily: 'monospace',
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '0.82rem',
    color: '#38bdf8',
  },
  iconBtn: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '7px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94a3b8',
    textDecoration: 'none',
  }
};
