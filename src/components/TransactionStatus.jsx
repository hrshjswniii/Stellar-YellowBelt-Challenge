import React from 'react';
import { Loader2, CheckCircle2, XCircle, ExternalLink, Hash, Cpu, AlertTriangle } from 'lucide-react';

export default function TransactionStatus({ txState }) {
  if (!txState || txState.status === 'idle') return null;

  const isPending = txState.status === 'pending';
  const isSuccess = txState.status === 'success';
  const isError = txState.status === 'error';

  return (
    <div
      className="glass-panel animate-fade-in"
      style={{
        padding: '20px 24px',
        borderRadius: '20px',
        marginTop: '24px',
        borderColor: isSuccess
          ? 'rgba(16, 185, 129, 0.4)'
          : isError
          ? 'rgba(239, 68, 68, 0.4)'
          : 'rgba(6, 182, 212, 0.4)',
        background: isSuccess
          ? 'rgba(16, 185, 129, 0.05)'
          : isError
          ? 'rgba(239, 68, 68, 0.05)'
          : 'rgba(6, 182, 212, 0.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isPending && <Loader2 size={24} color="#06b6d4" className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />}
          {isSuccess && <CheckCircle2 size={24} color="#10b981" />}
          {isError && <XCircle size={24} color="#ef4444" />}

          <div>
            <h4 style={{ fontSize: '1rem', color: '#f8fafc', margin: 0 }}>
              {isPending && 'Submitting Transaction to Stellar Testnet RPC...'}
              {isSuccess && 'Contract Transaction Confirmed'}
              {isError && 'Transaction Failed - Contract Error Handled'}
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
              {txState.message || 'Soroban contract call invocation status'}
            </p>
          </div>
        </div>

        <span
          className="badge"
          style={{
            background: isSuccess
              ? 'rgba(16, 185, 129, 0.15)'
              : isError
              ? 'rgba(239, 68, 68, 0.15)'
              : 'rgba(6, 182, 212, 0.15)',
            color: isSuccess ? '#10b981' : isError ? '#ef4444' : '#06b6d4',
            border: 'none',
          }}
        >
          {txState.status.toUpperCase()}
        </span>
      </div>

      {/* Transaction Details & Explorer Link */}
      {txState.hash && (
        <div style={styles.detailsBox}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1' }}>
            <Hash size={14} color="#94a3b8" />
            <span>Tx Hash: </span>
            <code style={styles.codeHash}>{txState.hash}</code>
          </div>

          <a
            href={`https://stellar.expert/explorer/testnet/tx/${txState.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.explorerLink}
          >
            <span>View on Stellar Explorer</span>
            <ExternalLink size={14} />
          </a>
        </div>
      )}

      {/* Handled Contract Error Explanation */}
      {isError && txState.errorCode && (
        <div style={styles.errorBox}>
          <AlertTriangle size={16} color="#f87171" />
          <span>Handled Soroban Error Code {txState.errorCode}: {txState.errorReason}</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  detailsBox: {
    marginTop: '14px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '10px',
  },
  codeHash: {
    fontFamily: 'monospace',
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '2px 8px',
    borderRadius: '6px',
    color: '#38bdf8',
  },
  explorerLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: '#06b6d4',
    fontSize: '0.82rem',
    fontWeight: 600,
    textDecoration: 'none',
  },
  errorBox: {
    marginTop: '12px',
    padding: '10px 14px',
    borderRadius: '10px',
    background: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.25)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.82rem',
    color: '#fca5a5',
  }
};
